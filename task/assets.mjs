import fs from "fs/promises";
import fg from "fast-glob";
import path from "path";

const error = (error) => {
  console.log(error);
  throw error;
};

export const assets = async () =>
  (await fg("src/(assets/**/*|apple-touch-icon.png|favicon.ico)")).map(
    async (source) => {
      await fs
        .mkdir(path.parse(source).dir.replace("src", "dist"), {
          recursive: true,
        })
        .catch(error);
      return await fs
        .copyFile(source, source.replace("src", "dist"))
        .catch(error);
    }
  );
