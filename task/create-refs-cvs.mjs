import fs from "fs/promises";
import fg from "fast-glob";
import matter from "gray-matter";
import path from "path";

const mds = await Promise.all(
  (
    await fg("src/references/*.md")
  ).map(async (filepath) => ({
    id: path.parse(filepath).name,
    ...matter(await fs.readFile(filepath, "utf8")),
  }))
);

const refs = mds.map(({ id, content, data: { ignore, title, tags, link } }) =>
  [
    id,
    ignore,
    title,
    link,
    [undefined, undefined, undefined].map((_, i) => tags[i]).join(","),
    `"${content.trim()}"`,
    "\n",
  ].join(",")
);

fs.writeFile(`refs.csv`, refs).catch((error) => {
  console.error(error);
  throw error;
});
