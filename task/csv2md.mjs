import fs from "fs/promises";

await fs.readFile("src/refs.csv", "utf8").then((csv) => {
  // 改行ごとにレコード化する
  return Promise.all(
    csv
      .replace(",placeholder", ",")
      .split(",\n")
      // ヘッダー行を除外する
      .filter((_, i) => i)
      .map(async (v) => {
        // アイテムをさらに配列化する
        const data = v.split(",");
        const id = data[0];
        if (!id) return;
        const ignore = data[1];
        const title = `"${data[2]}"`;
        const link = `"${data[3]}"`;
        // カラムの4,5,6はタギング決め打ち
        const tags = [data[4], data[5], data[6]].flatMap((v) =>
          v !== "" ? `"${v}"` : []
        );
        const year = data[7];
        const desc = data[8].replace(/"([^"]*)"/g, "$1");
        const yaml_separater = `---`;
        const yaml_title = `title: ${title}`;
        const yaml_link = `link: ${link}`;
        const yaml_tags = `tags:\n  - ${tags.join("\n  - ")}`;
        const yaml_year = `year: ${year}`;
        const yaml_ignore = `ignore: ${ignore}`;

        const body = [
          yaml_separater,
          yaml_title,
          yaml_link,
          yaml_tags,
          year ? yaml_year : [],
          ignore ? yaml_ignore : [],
          yaml_separater,
          desc ? `\n${desc}\n` : [],
        ]
          .flat()
          .join("\n");

        await fs.writeFile(`src/references/${id}.md`, body).catch((error) => {
          console.error(error);
          throw error;
        });
      })
  );
});
