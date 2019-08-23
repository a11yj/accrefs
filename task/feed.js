'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const frontMatter = require('gulp-front-matter')
const prettify = require('gulp-prettify')
const layout = require('gulp-layout')
const md = require('gulp-markdown')
const rename = require('gulp-rename')

const config = require('../config.json')
const path = require('../path.json')

const getJson = require('./utilities/getJson')

// RSS作成（feed.md -> feed.xml）
const build_feed_xml = () => {
  return gulp.src(path.src.feed, {allowEmpty:true})
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
    .pipe(rename({extname: '.xml'}))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.stream())
}

module.exports = build_feed_xml
