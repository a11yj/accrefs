module.exports = (eleventyConfig) => {
  eleventyConfig.addCollection('references', (collection) => {
    return collection.getFilteredByGlob('src/references/*.md')
  })

  eleventyConfig.addPassthroughCopy('src/assets/style/style.css')

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}
