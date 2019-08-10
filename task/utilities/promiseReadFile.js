const fsPromise = require('fs').promises

const PromiseReadFile = async path => {
  return await fsPromise.readFile(path, {encoding: 'utf-8'}).catch(err => console.log(err))
}

module.exports = PromiseReadFile