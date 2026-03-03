import fs from "node:fs/promises";
import matter from "gray-matter";
import path from "node:path";

export const matters = async (glob) =>
  Promise.all(
    (await Array.fromAsync(await fs.glob(glob))).map(async (filepath) => ({
      id: path.parse(filepath).name,
      ...matter(await fs.readFile(filepath, "utf8")),
    })),
  );
