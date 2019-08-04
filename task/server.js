'use strict'

const browserSync = require('browser-sync')
const path = require('../path.json')

const server = done => {
  browserSync.init({
    ui: false,
    server: {
      baseDir: path.root
    },
    port: 3000
  }, done)
}

module.exports = server
