export class Search {
  constructor() {
    this.$Search = document.querySelector("#Search");
    if (!this.$Search) return;
    this.debounceTimer = 0;
    this.refs = [...document.querySelectorAll("article[id^=reference]")];
    this.models = this.refs.map((ref) => ({
      id: ref.id,
      title: ref.querySelector(".-reference").innerText.toLowerCase(),
      link: ref.querySelector(".-reference").href.toLowerCase(),
      tags: ref.dataset.tags,
      year: ref.dataset.year,
      content: ref.children[2] ? ref.children[1].innerText.toLowerCase() : null,
    }));

    this.$Search.addEventListener(
      "input",
      (e) => this.handleInput(e.target.value),
      false
    );
    this.$Search.addEventListener("reset", () => this.handleReset(), false);
  }

  getMatchedIds = (query) =>
    this.models
      .filter(
        ({ title, link, tags, year, content }) =>
          RegExp(query).test(title) ||
          RegExp(query).test(link) ||
          RegExp(query).test(tags) ||
          RegExp(query).test(year) ||
          RegExp(query).test(content)
      )
      .map(({ id }) => id);

  search = (query) => {
    const ids = this.getMatchedIds(query.toLowerCase());
    this.refs.forEach((ref) =>
      ids.includes(ref.id)
        ? ref.removeAttribute("hidden")
        : ref.setAttribute("hidden", "")
    );
  };

  reset = () => this.refs.forEach((ref) => ref.removeAttribute("hidden"));

  handleInput = (query) => {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer =
      query === ""
        ? setTimeout(() => this.reset(), 1000 / 30)
        : setTimeout(() => this.search(query), 1000 / 30);
  };

  handleReset = () => this.reset();
}
