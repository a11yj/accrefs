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

const getJson = require('./utilities/getJson')

// アーカイブ作成（archive.md -> archive.html）
const build_archive_html = () => {
  return gulp.src(path.src.archive, {allowEmpty:true})
    .pipe(plumber())
    .pipe(frontMatter())
    .pipe(md())
    .pipe(layout(data => {
      /**
       * posts.json と tags.json を data に差し込む
       */
      const getInjectedData = () => {
        const posts = getJson('posts')
        const tags = getJson('tags')
        return Object.assign(data.frontMatter, config, {path: path}, posts, tags)
      }

      return getInjectedData()
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.reload({
      stream: true
    }))
}

module.exports = build_archive_html
