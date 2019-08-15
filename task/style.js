'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')
const autoprefixer = require('autoprefixer')
const glob = require('gulp-sass-glob')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const csswring = require('csswring')
const mqpacker = require('css-mqpacker')
const path = require('../path.json')

const build_style = () => {
  return gulp.src(path.src.style , {
    sourcemaps: true
  })
    .pipe(plumber())
    .pipe(glob())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(postcss([
      autoprefixer({
        grid: true,
        cascade: false
      }),
      mqpacker(),
      csswring()
    ]))
    .pipe(gulp.dest(path.dist.style, {
      sourcemaps: './'
    }))
    .pipe(browserSync.stream())
}

module.exports = build_style