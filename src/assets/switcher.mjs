export class Switcher {
  constructor() {
    try {
      this.$Html = document.documentElement;
      this.$Mode = document.querySelector("#Mode");
      this.modes = [...this.$Mode.querySelectorAll(`[name="mode"]`)].map(
        (v) => v.value,
      );
      this.preferd = localStorage.getItem("prefer-accrefs-mode");
      this.value = this.modes.includes(this.preferd)
        ? this.preferd
        : this.modes[0];

      this.update(this.value);
      this.$Mode
        .querySelector(`[value="${this.value}"]`)
        .setAttribute("checked", "");
      this.$Mode.addEventListener(
        "change",
        (e) => this.update(e.target.value),
        false,
      );
    } catch (e) {
      console.error(e);
      document.querySelector(".Mode").setAttribute("hidden", "");
    }
  }

  update(value) {
    localStorage.setItem("prefer-accrefs-mode", value);
    this.$Html.classList.remove(...this.modes);
    this.$Html.classList.add(value);
  }
}
