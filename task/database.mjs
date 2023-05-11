import { marked } from "marked";
import { CONSTANTS } from "../site.config.mjs";

export const database = (matter) => ({
  references: matter.flatMap(({ content, data, id }) =>
    !data.ignore
      ? {
          data,
          id,
          marked: marked.parse(content),
        }
      : []
  ),
  years: [
    ...new Set(
      matter.filter((item) => !item.data.ignore).map((ref) => ref.data.year)
    ),
  ],
  ...CONSTANTS,
});
