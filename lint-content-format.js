const fs = require('fs').promises
const yaml = require('js-yaml')
const fg = require('fast-glob')
const matter = require('gray-matter')

const readTags = async () => {
  const content = await fs.readFile('src/_data/tags.yml', 'utf8')
  return yaml.load(content)
}

const getDuplicatedTagIndex = (tags, key, value, currentTagIndex) => {
  return tags.findIndex(
    (tag, index) => tag[key] === value && index !== currentTagIndex,
  )
}

const validateTags = (tags) => {
  tags.forEach((tag, index) => {
    Object.entries({
      title: '',
      slug: '',
      ...tag,
    }).forEach(([key, value]) => {
      if (key === 'title' || key === 'slug') {
        if (typeof value !== 'string') {
          throw new TypeError(
            `\`tags[${index}].${key}\`は文字列にしてください。`,
          )
        }

        const isEmpty = !value
        if (isEmpty) {
          throw new TypeError(
            `\`tags[${index}]\`に\`${key}\`を入力してください。`,
          )
        }

        const duplicatedTagIndex = getDuplicatedTagIndex(
          tags,
          key,
          value,
          index,
        )
        if (duplicatedTagIndex !== -1) {
          throw new TypeError(
            `\`tags[${index}].${key}\`が\`tags[${duplicatedTagIndex}].${key}\`と重複しています。`,
          )
        }

        return
      }

      if (key === 'content') {
        if (typeof value !== 'string') {
          throw new TypeError(
            `\`tags[${index}].${key}\`は文字列にしてください。`,
          )
        }

        return
      }

      throw new TypeError(
        `\`tags[${index}]\`の\`${key}\`は妥当なプロパティではありません。`,
      )
    })
  })
}

const readReferences = async () => {
  return Promise.all(
    (await fg('src/references/*.md')).map(async (filepath) => {
      const content = await fs.readFile(filepath, 'utf8')
      return {
        ...matter(content),
        filepath,
      }
    }),
  )
}

const getDuplicatedReferenceIndex = (
  references,
  key,
  value,
  currentReferenceFilepath,
) => {
  return references.findIndex(
    (reference) =>
      reference.data[key] === value &&
      reference.filepath !== currentReferenceFilepath,
  )
}

const validateReferences = (references, tags) => {
  references.forEach((reference) => {
    Object.entries({
      title: '',
      tags: '',
      link: '',
      ...reference.data,
    }).forEach(([key, value]) => {
      if (key === 'title' || key === 'link') {
        if (typeof value !== 'string') {
          throw new TypeError(
            `\`${reference.filepath}\`の\`${key}\`は文字列にしてください。`,
          )
        }

        const isEmpty = !value
        if (isEmpty) {
          throw new TypeError(
            `\`${reference.filepath}\`に\`${key}\`を入力してください。`,
          )
        }

        const duplicatedReferenceIndex = getDuplicatedReferenceIndex(
          references,
          key,
          value,
          reference.filepath,
        )
        if (duplicatedReferenceIndex !== -1) {
          throw new TypeError(
            `\`${reference.filepath}\`の\`${key}\`が\`${references[duplicatedReferenceIndex].filepath}と重複しています。`,
          )
        }

        return
      }

      if (key === 'tags') {
        if (!Array.isArray(value)) {
          throw new TypeError(
            `\`${reference.filepath}\`の\`${key}\`は配列にしてください。`,
          )
        }

        const isEmpty = !value.length
        if (isEmpty) {
          throw new TypeError(
            `\`${reference.filepath}\`に\`${key}\`を入力してください。`,
          )
        }

        value.forEach((tagTitle) => {
          const exists = tags.some((tag) => tag.title === tagTitle)
          if (!exists) {
            throw new TypeError(
              `\`${reference.filepath}\`の\`${tagTitle}\`というタグは存在しません。`,
            )
          }
        })

        return
      }

      if (key === 'content') {
        return
      }

      throw new Error(
        `\`${reference.filepath}\`の\`${key}\`は妥当なプロパティではありません。`,
      )
    })
  })
}

const main = async () => {
  const tags = await readTags()
  validateTags(tags)

  const references = await readReferences()
  validateReferences(references, tags)
}

main().catch((error) => {
  process.exitCode = 1
  console.trace(error)
})
