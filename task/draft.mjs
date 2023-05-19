import fs from "fs/promises";
import fg from "fast-glob";
import path from "path";

const last = (await fg("src/references/*.md"))
  .map((filepath) => Number(path.parse(filepath).name))
  .reduce((a, b) => Math.max(a, b));
const id = String(last + 1).padStart(5, "0");
const body = `---
title: "タイトル"
link: "https://example.com/hoge/fuga"
tags:
  - "タグ1"
  - "タグ2"
year: 2023
---

資料の解説
`;

fs.writeFile(`src/references/${id}.md`, body).catch((error) => {
  console.error(error);
  throw error;
});
