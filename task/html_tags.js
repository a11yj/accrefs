'use strict'

const fs = require('fs')
const gulp = require('gulp')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const frontMatter = require('gulp-front-matter')
const prettify = require('gulp-prettify')
const layout = require('gulp-layout')
const md = require('gulp-markdown')

const config = require('../config.json')
const path = require('../path.json')

// カテゴリートップ作成（カテゴリー.md -> category_name.html）
const build_tags_html = () => {
  return gulp.src(path.src.tag, {allowEmpty:true})
    .pipe(plumber())
    .pipe(frontMatter())
    .pipe(md())
    .pipe(layout(file => {
      console.log(file.toString())
      /**
       * ファイル名をYAMLブロックのnameに差し替える
       */
      file.basename = file.frontMatter.name
      
      const injectJsons = async () => {
        const posts = await loadJson('posts')
        const tags = await loadJson('tags')
        return Object.assign(file.frontMatter, config, {path: path}, posts, tags)
      }

      const loadJson = async filename => {
        return fs.readFile(`../${path.src.json}${filename}.json`)
      }

      return injectJsons
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.reload({
      stream: true
    }))
}

module.exports = build_tags_html
