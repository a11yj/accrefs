'use strict'

const fs = require('fs')
const gulp = require('gulp')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const frontMatter = require('gulp-front-matter')
const listStream = require('list-stream')
const jsonPretty = require('json-pretty')

const path = require('../path.json')

// post（post/*.md -> posts.json
const build_posts_json = () => {
  return gulp.src(path.src.post)
    .pipe(plumber())
    .pipe(frontMatter())
    .pipe(listStream.obj((err, data) => {
      if (err) throw err
      fs.writeFileSync(`${path.src.json}posts.json`, jsonPretty({posts: data.map(post => post.frontMatter)}))
    }))
    .pipe(browserSync.stream())
}

module.exports = build_posts_json
