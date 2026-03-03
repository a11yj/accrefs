import fs from "node:fs/promises";
import path from "node:path";
import { ASSETS } from "../src/config.mjs";

const error = (error) => {
  console.error(error);
  throw error;
};

export const assets = async () =>
  (await Array.fromAsync(await fs.glob(ASSETS))).map(
    async (filepath) =>
      await fs
        .mkdir(path.parse(filepath).dir.replace("src", "dist"), {
          recursive: true,
        })
        .catch(error)
        .then(
          async () =>
            await fs
              .copyFile(filepath, filepath.replace("src", "dist"))
              .catch(error),
        ),
  );
