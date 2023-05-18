import fs from "fs/promises";

await fs.readFile("src/refs.csv", "utf8").then((csv) => {
  // 改行ごとにレコード化する
  return (
    csv
      .replace(",placeholder", ",")
      .split(",\n")
      // ヘッダー行を除外する
      .filter((_, i) => i)
      .forEach((v) => {
        // アイテムをさらに配列化する
        const data = v.split(",");
        const id = data[0];
        if (!id) return;
        const ignore = data[1];
        const title = `"${data[2]}"`;
        const link = `"${data[3]}"`;
        // カラムの4,5,6はタギング決め打ち。yaml記法用に加工しておく
        const tags = [data[4], data[5], data[6]]
          .filter((v) => v !== "")
          .map((v) => `  - "${v}"`);
        const year = data[7];
        const desc = data[8].replace(/"([^"]*)"/g, "$1");
        const yaml1 = `---
title: ${title}
tags:
${tags.join("\n")}
link: ${link}
`;

        // year があれば追加する
        const yaml2 = year ? `${yaml1}year: ${year}\n` : `${yaml1}\n`;

        // ignore: true なら追加する
        const yaml3 =
          ignore === "TRUE" ? `${yaml2}ignore: true\n---\n` : `${yaml2}---\n`;

        // desc があれば追加する
        const body = desc ? yaml3 + "\n" + desc + "\n" : yaml3;

        fs.writeFile(`src/references/${id}.md`, body).catch((error) => {
          console.error(error);
          throw error;
        });
      })
  );
});
