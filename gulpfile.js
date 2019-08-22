'use strict'

const gulp = require('gulp')

const path = require('./path.json')
const server = require('./task/server')
const build_html_home = require('./task/html_home')
const build_html_tags = require('./task/html_tags')
const build_html_archive = require('./task/html_archive')
const build_style = require('./task/style')
const build_image = require('./task/image')
const build_json_posts = require('./task/json_posts')
const build_json_tags = require('./task/json_tags')
const build_feed = require('./task/feed')

// watch
const watch = done => {
  gulp.watch(
    [path.src.html, path.src.md],
    gulp.series(
      build_json_posts,
      build_json_tags,
      build_html_home,
      build_html_tags,
      build_html_archive,
      build_feed
    )
  )
  gulp.watch(path.src.style, gulp.parallel(build_style))
  gulp.watch(path.src.image, gulp.parallel(build_image))
  done()
}


// Gulpタスク ====================
gulp.task('default', gulp.series(
  watch,
  server
), (err, data) => {
  if (err) throw err
  console.log(data)
})

gulp.task('dev', gulp.series(
  build_html_home,
  build_html_tags,
  build_html_archive,
  build_feed,
  build_style,
  build_image,
  watch,
  server
), (err, data) => {
  if (err) throw err
  console.log(data)
})

gulp.task('build-json', gulp.series(
  build_json_posts,
  build_json_tags
), (err, data) => {
  if (err) throw err
  console.log(data)
})

gulp.task('build-accrefs', gulp.series(
  build_html_home,
  build_html_tags,
  build_html_archive,
  build_feed,
  build_style,
  build_image
), (err, data) => {
  if (err) throw err
  console.log(data)
})