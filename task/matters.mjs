import fs from "fs/promises";
import fg from "fast-glob";
import matter from "gray-matter";
import path from "path";

export const matters = async () =>
  Promise.all(
    (await fg("src/references/*.md")).map(async (filepath) => ({
      id: path.parse(filepath).name,
      ...matter(await fs.readFile(filepath, "utf8")),
    }))
  );
