import fs from "fs/promises";

(await fs.readFile("src/refs.csv", "utf8"))
  // 改行ごとにレコード化する
  .split(",\n")
  // ヘッダー行を除外する
  .filter((_, i) => i)
  .forEach((v) => {
    // アイテムをさらに配列
    const data = v.split(",");
    if (data.length === 1) return;
    const id = data[0];
    const title = `"${data[2]}"`;
    const link = `"${data[3]}"`;
    // カラムの4,5,6はタギング決め打ち。yaml記法用に加工しておく
    const tags = [data[4], data[5], data[6]]
      .filter((v) => v !== "")
      .map((v) => `  - "${v}"`);
    const desc = data[8];
    const yaml1 = `---
title: ${title}
tags:
${tags.join("\n")}
link: ${link}
`;

    // ignore: true なら追加する
    const yaml2 =
      data[1] === "TRUE" ? `${yaml1}ignore: true\n---\n` : `${yaml1}---\n`;

    // desc があれば追加する
    const body = desc ? yaml2 + "\n" + desc + "\n" : yaml2;

    fs.writeFile(`src/references/${id}.md`, body).catch((error) => {
      console.error(error);
      throw error;
    });
  });
