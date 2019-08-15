'use strict'

const fs = require('fs')
const gulp = require('gulp')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const frontMatter = require('gulp-front-matter')
const listStream = require('list-stream')
const jsonPretty = require('json-pretty')

const path = require('../path.json')
const order = require('../order.json').order

// tag（tag/*.md -> tags.json
const build_tags_json = () => {
  return gulp.src(path.src.tag)
    .pipe(plumber())
    .pipe(frontMatter())
    .pipe(listStream.obj((err, data) => {
      if (err) throw err
      if (!fs.existsSync(path.src.json)) fs.mkdirSync(path.src.json)
      fs.writeFileSync(`${path.src.json}tags.json`, jsonPretty({
        /**
         * frontMatter で取り出したYAMLブロックの配列の title キーが、order.json の値に合致したものの順で配列を返す
         * */
        tags: order.map(title => data.map(tag => tag.frontMatter).find(tag => tag.title === title))
      }))
    }))
    .pipe(browserSync.stream())
}

module.exports = build_tags_json
