const Sortable = require('@11ty/eleventy/src/Util/Sortable')
const yaml = require('js-yaml')

module.exports = (eleventyConfig) => {
  eleventyConfig.addCollection('references', (collection) => {
    return collection.getFilteredByGlob('src/references/*.md').sort((a, b) => {
      return Sortable.sortFunctionAlphabeticAscending(a.inputPath, b.inputPath)
    })
  })

  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png')

  eleventyConfig.addDataExtension('yml', (contents) => {
    return yaml.safeLoad(contents)
  })

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}
