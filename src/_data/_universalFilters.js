// Because Universal filters are not available in Pug.
// https://www.11ty.io/docs/filters/#universal-filters
const urlFilter = require('@11ty/eleventy/src/Filters/Url')
const slugFilter = require('@11ty/eleventy/src/Filters/Slug')

module.exports = {
  url: urlFilter,
  slug: slugFilter,
}
