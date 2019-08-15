'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync')
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')
const changed = require('gulp-changed')
const path = require('../path.json')

const build_image = () => {
  return gulp.src(path.src.image)
    .pipe(changed(path.dist.image))
    .pipe(gulp.dest(path.dist.image))
    .pipe(imagemin(
      [
        mozjpeg({quality: 80}),
        pngquant()
      ],
      {
        verbose: true
      }
    ))
    .pipe(browserSync.stream())
}

module.exports = build_image
