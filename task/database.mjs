import { marked } from "marked";
import { CONSTANTS } from "../site.config.mjs";

export const database = async (matter) => {
  const references = matter
    .filter((item) => !item.data.ignore)
    .map(({ content, data, id }) => ({
      data,
      id,
      marked: marked.parse(content),
    }));

  return Promise.resolve({
    references,
    ...CONSTANTS,
  });
};
