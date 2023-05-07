import fs from "fs/promises";
import fg from "fast-glob";
import matter from "gray-matter";
import { TAGS } from "../site.config.mjs";

const getDuplicatedTagIndex = (tags, key, value, currentTagIndex) => {
  return tags.findIndex(
    (tag, index) => tag[key] === value && index !== currentTagIndex
  );
};

const validateTags = (tags) => {
  tags.forEach((tag, index) => {
    Object.entries({
      title: "",
      slug: "",
      ...tag,
    }).forEach(([key, value]) => {
      if (key === "title" || key === "slug") {
        if (typeof value !== "string") {
          throw new TypeError(
            `\`tags[${index}].${key}\`は文字列にしてください。`
          );
        }

        const isEmpty = !value;
        if (isEmpty) {
          throw new TypeError(
            `\`tags[${index}]\`に\`${key}\`を入力してください。`
          );
        }

        const duplicatedTagIndex = getDuplicatedTagIndex(
          tags,
          key,
          value,
          index
        );
        if (duplicatedTagIndex !== -1) {
          throw new TypeError(
            `\`tags[${index}].${key}\`が\`tags[${duplicatedTagIndex}].${key}\`と重複しています。`
          );
        }

        return;
      }

      if (key === "content") {
        if (typeof value !== "string") {
          throw new TypeError(
            `\`tags[${index}].${key}\`は文字列にしてください。`
          );
        }

        return;
      }

      throw new TypeError(
        `\`tags[${index}]\`の\`${key}\`は妥当なプロパティではありません。`
      );
    });
  });

  console.info("🎉 タグに問題はありませんでした。");
};

const readReferences = async () => {
  return Promise.all(
    (await fg("src/references/*.md")).map(async (filepath) => {
      const content = await fs.readFile(filepath, "utf8");
      return {
        ...matter(content),
        filepath,
      };
    })
  );
};

const getDuplicatedReferenceIndex = (
  references,
  key,
  value,
  currentReferenceFilepath
) => {
  return references.findIndex(
    (reference) =>
      reference.data[key] === value &&
      reference.filepath !== currentReferenceFilepath
  );
};

const validateReferences = (references, tags) => {
  references.forEach((reference) => {
    Object.entries({
      title: "",
      tags: "",
      link: "",
      ...reference.data,
    }).forEach(([key, value]) => {
      if (key === "title" || key === "link") {
        if (typeof value !== "string") {
          throw new TypeError(
            `\`${reference.filepath}\`の\`${key}\`は文字列にしてください。`
          );
        }

        const isEmpty = !value;
        if (isEmpty) {
          throw new TypeError(
            `\`${reference.filepath}\`に\`${key}\`を入力してください。`
          );
        }

        const duplicatedReferenceIndex = getDuplicatedReferenceIndex(
          references,
          key,
          value,
          reference.filepath
        );
        if (duplicatedReferenceIndex !== -1) {
          throw new TypeError(
            `\`${reference.filepath}\`の\`${key}\`が\`${references[duplicatedReferenceIndex].filepath}と重複しています。`
          );
        }

        return;
      }

      if (key === "tags") {
        if (!Array.isArray(value)) {
          throw new TypeError(
            `\`${reference.filepath}\`の\`${key}\`は配列にしてください。`
          );
        }

        const isEmpty = !value.length;
        if (isEmpty) {
          throw new TypeError(
            `\`${reference.filepath}\`に\`${key}\`を入力してください。`
          );
        }

        value.forEach((tagTitle) => {
          const exists = tags.some((tag) => tag.title === tagTitle);
          if (!exists) {
            throw new TypeError(
              `\`${reference.filepath}\`の\`${tagTitle}\`というタグは存在しません。`
            );
          }
        });

        return;
      }

      if (key === "content") {
        return;
      }

      if (key === "year") {
        if (typeof value !== "number") {
          throw new TypeError(
            `\`${reference.filepath}\`の\`${key}\`は数値にしてください。`
          );
        }
        if (/\d{4}/.test(value)) {
          throw new TypeError(
            `\`${reference.filepath}\`の\`${key}\`は4桁にしてください。`
          );
        }
        return;
      }

      if (key === "ignore") {
        if (!value) {
          throw new TypeError(
            `\`${reference.filepath}\`に\`${key}\`を設定する場合、値は\`true\`にしてください。\`false\`にしたい場合は\`${key}\`は取り除いてください。`
          );
        }
        return;
      }

      throw new Error(
        `\`${reference.filepath}\`の\`${key}\`は妥当なプロパティではありません。`
      );
    });
  });

  console.info("🎉 md ファイルに問題はありませんでした。");
};

const main = async () => {
  validateTags(TAGS);

  const references = await readReferences();
  validateReferences(references, TAGS);
};

main().catch((error) => {
  process.exitCode = 1;
  console.trace(error);
});
