'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const frontMatter = require('gulp-front-matter')
const prettify = require('gulp-prettify')
const layout = require('gulp-layout')
const md = require('gulp-markdown')

const path = require('../path.json')

// インデックス作成（index.md -> index.html）
const build_home_html = () => {
  return gulp.src(path.src.home, {allowEmpty:true})
    .pipe(plumber())
    .pipe(frontMatter())
    .pipe(md())
    .pipe(layout(function(file) {
      const posts = require(`../${path.src.json}posts.json`)
      const tags = require(`../${path.src.json}tags.json`)
      return Object.assign(file.frontMatter, {path: path}, posts, tags)
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.reload({
      stream: true
    }))
}

module.exports = build_home_html
