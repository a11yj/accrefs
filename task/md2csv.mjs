import fg from "fast-glob";
import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

const refs = [
  [
    "id",
    "ignore",
    "title",
    "link",
    "tag1",
    "tag2",
    "tag3",
    "year",
    "desc",
    "\n",
  ].join(","),
  ...(
    await Promise.all(
      (
        await fg("src/references/*.md")
      ).map(async (filepath) => ({
        id: path.parse(filepath).name,
        ...matter(await fs.readFile(filepath, "utf8")),
      }))
    )
  ).map(({ id, content, data: { ignore, title, tags, link } }) =>
    [
      id,
      ignore,
      title,
      link,
      [undefined, undefined, undefined].map((_, i) => tags[i]).join(","),
      year,
      `"${content.trim()}"`,
      "\n",
    ].join(",")
  ),
];

fs.writeFile(`src/refs.csv`, refs).catch((error) => {
  console.log(error);
  throw error;
});
