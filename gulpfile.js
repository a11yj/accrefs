const gulp = require('gulp')
const sass = require('gulp-sass')
const globImporter = require('node-sass-glob-importer')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cleanCSS = require('gulp-clean-css')

const styles = () => {
  return gulp
    .src(['src/assets/style/style.scss'], { sourcemaps: true })
    .pipe(sass({ importer: [globImporter()] }).on('error', sass.logError))
    .pipe(postcss([autoprefixer({ cascade: false })]))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('src/assets/style', { sourcemaps: '.' }))
}

const watch = (done) => {
  gulp.watch('src/assets/style/**.scss', styles)
  done()
}

const start = gulp.series(styles, watch)

exports.build = styles
exports.default = start
