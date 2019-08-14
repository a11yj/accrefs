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
      // console.log(JSON.parse(JSON.stringify(data.map(value => value))))
      if (err) throw err
      if (!fs.existsSync(path.src.json)) fs.mkdirSync(path.src.json)
      fs.writeFileSync(
        `${path.src.json}posts.json`,
        jsonPretty({
          posts: data.map(post => ({
            // 本文を取り出して frontMatter と混ぜて返す
            body: new Buffer.from(Array.from(JSON.parse(JSON.stringify(post))._contents.data)).toString('utf8'),
            ...post.frontMatter
          }))
        })
      )
    }))
    .pipe(browserSync.stream())
}

module.exports = build_posts_json
