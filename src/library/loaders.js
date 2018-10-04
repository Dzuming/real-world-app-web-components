export const defineElement = (name, element) =>
  customElements.define(name, element);

export const styleLoader = (shadow, style) => {
  let styleElement = document.createElement("style");
  styleElement.textContent = style();
  shadow.appendChild(styleElement);
};
