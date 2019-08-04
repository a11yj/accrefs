'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const frontMatter = require('gulp-front-matter')
const prettify = require('gulp-prettify')
const layout = require('gulp-layout')
const md = require('gulp-markdown')
const rename = require('gulp-rename')

const path = require('../path.json')
const posts = require(`../${path.src.json}posts.json`)
const tags = require(`../${path.src.json}tags.json`)

// RSS作成（feed.md -> feed.xml）
const build_feed_xml = () => {
  return gulp.src(path.src.feed, {allowEmpty:true})
    .pipe(plumber())
    .pipe(frontMatter())
    .pipe(md())
    .pipe(layout(function(file) {
      const data = file.frontMatter
      return {
        data,
        ...path,
        ...posts,
        ...tags,
      }
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(rename({extname: '.xml'}))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.stream())
}

module.exports = build_feed_xml
