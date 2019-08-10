'use strict'

const gulp = require('gulp')

const path = require('./path.json')
const server = require('./task/server')
const build_html_home = require('./task/html_home')
const build_html_tags = require('./task/html_tags')
const build_style = require('./task/style')
const build_image = require('./task/image')

// // 記事オブジェクト作成タスク ====================
const build_json_posts = require('./task/json_posts')
const build_json_tags = require('./task/json_tags')


// // HTML作成タスク ====================

// // ブログインデックス作成（index.md -> index.html）
// const html_pages = require('./task/html/pages')

// // RSS作成（feed.md -> feed）
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
      build_feed
    )
  )
  gulp.watch(path.src.style, gulp.parallel(build_style))
  gulp.watch(path.src.image, gulp.parallel(build_image))
  done()
}


// // Gulpタスク ====================
gulp.task('default', gulp.series(
  build_json_posts,
  build_json_tags,
  build_html_home,
  build_html_tags,
  build_feed,
  build_style,
  build_image,
  watch,
  server
), (err, data) => {
  if (err) throw err
  console.log(data)
})