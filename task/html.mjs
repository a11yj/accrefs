import fs from "fs/promises";
import pug from "pug";
import { TAGS } from "../site.config.mjs";

const makeDir = async (dir) =>
  await fs.mkdir(dir, { recursive: true }).catch(error);

const error = (error) => {
  console.log(error);
  throw error;
};

export const html = async (database) => {
  // 必要なディレクトリをあらかじめ作る
  await Promise.all([
    await makeDir("dist/references"),
    ...TAGS.map(async ({ slug }) => await makeDir(`dist/tags/${slug}`)),
  ]);

  const createHome = async () => {
    const filename = `dist/index`;
    // extends 文では dist/ 配下に pug string が出力された階層からテンプレートへの相対パスを指定する必要がある
    const pugCompiler = await pug.compile(`extends ../src/templates/home`, {
      filename,
    });
    await fs
      .writeFile(
        `${filename}.html`,
        pugCompiler({
          type: "home",
          ...database,
        })
      )
      .catch(error);
  };

  const createRefs = async () => {
    const filename = `dist/references/index`;
    const pugCompiler = await pug.compile(
      `extends ../../src/templates/references`,
      {
        filename,
      }
    );
    await fs
      .writeFile(
        `${filename}.html`,
        pugCompiler({
          type: "references",
          ...database,
        })
      )
      .catch(error);
  };

  const createTag = async () => {
    return TAGS.map(async (tag) => {
      // タグにマッチするリンクだけ抽出する
      const collection = database.references.filter((ref) =>
        ref.data.tags.includes(tag.title)
      );
      const filename = `dist/tags/${tag.slug}/index`;
      const pugCompiler = await pug.compile(
        `extends ../../../src/templates/tag`,
        {
          filename,
        }
      );
      return await fs
        .writeFile(
          `${filename}.html`,
          pugCompiler({
            type: "tag",
            tag,
            collection,
            ...database,
          })
        )
        .catch(error);
    });
  };

  const createFeed = async () => {
    const filename = `dist/feed`;
    const pugCompiler = await pug.compile(`extends ../src/templates/feed`, {
      filename,
      pretty: true,
    });
    await fs
      .writeFile(
        `${filename}.xml`,
        pugCompiler({
          ...database,
        })
      )
      .catch(error);
  };

  const create404 = async () => {
    const filename = `dist/404`;
    const pugCompiler = await pug.compile(`extends ../src/templates/404`, {
      filename,
    });
    await fs
      .writeFile(
        `${filename}.html`,
        pugCompiler({
          type: "404",
          ...database,
        })
      )
      .catch(error);
  };

  return Promise.all([
    await create404(),
    await createFeed(),
    await createHome(),
    await createRefs(),
    ...(await createTag()),
  ]);
};
