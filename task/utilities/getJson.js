const fs = require('fs')
const path = require('../../path.json')

/**
 * @description src/json/<name>.json を同期取得して返すユーティリティ
 * @param name
 */
const getJson = (name) => {
  return JSON.parse(fs.readFileSync(`${path.src.json}${name}.json`))
}

module.exports = getJson