'use strict'

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
    .pipe(layout(function(file) {
      const posts = require(`../${path.src.json}posts.json`)
      const tags = require(`../${path.src.json}tags.json`)
      /**
       * ファイル名をタグの name に差し替える
       */
      file.basename = file.frontMatter.name
      return Object.assign(file.frontMatter, config, {path: path}, posts, tags)
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.reload({
      stream: true
    }))
}

module.exports = build_tags_html
