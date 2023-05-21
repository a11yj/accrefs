import { assets } from "./assets.mjs";
import { database } from "./database.mjs";
import { html } from "./html.mjs";
import { matters } from "./matters.mjs";

await assets()
  .then(async () => await matters("src/references/*.md"))
  .then(database)
  .then(html);
