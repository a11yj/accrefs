export const Switcher = () => {
  const $Html = document.documentElement;
  const $Mode = document.querySelector("#Mode");
  const modes = [...$Mode.querySelectorAll(`[name="mode"]`)].map(
    (v) => v.value
  );

  const updateMode = (value) => {
    localStorage.setItem("prefer-accrefs-mode", value);
    $Html.classList.remove(...modes);
    $Html.classList.add(value);
  };

  const mountModeChanger = (value) => {
    updateMode(value);

    $Mode.querySelector(`[value="${value}"]`).setAttribute("checked", "");
    $Mode.addEventListener("change", (e) => updateMode(e.target.value), false);
  };

  try {
    const preferMode = localStorage.getItem("prefer-accrefs-mode");
    const initMode = modes.includes(preferMode) ? preferMode : modes[0];
    mountModeChanger(initMode);
  } catch (e) {
    console.error(e);
    document.querySelector(".Mode").setAttribute("hidden", "");
  }
};
