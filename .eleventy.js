module.exports = (eleventyConfig) => {
  eleventyConfig.addCollection('references', (collection) => {
    return collection.getFilteredByGlob('src/references/*.md')
  })

  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png')

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}
