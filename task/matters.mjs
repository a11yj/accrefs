import fs from "fs/promises";
import fg from "fast-glob";
import matter from "gray-matter";
import path from "path";

export const matters = async (glob) =>
  Promise.all(
    (await fg(glob)).map(async (filepath) => ({
      id: path.parse(filepath).name,
      ...matter(await fs.readFile(filepath, "utf8")),
    }))
  );
