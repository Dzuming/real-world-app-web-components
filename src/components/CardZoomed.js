import { styleLoader } from "../library/loaders";
import { style } from "./CardZommed.style";

export class CardZoomed extends HTMLElement {
  constructor() {
    super();
    this.cardId = null;
    this.cardImage = null;
    this.shadow = null;
  }

  static get observedAttributes() {
    return ["card-id", "card-image"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name);
    switch (name) {
      case "card-id": {
        return (this.cardId = newValue);
      }
      case "card-image": {
        return (this.cardImage = newValue);
      }
    }
  }

  async connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = this.render();
    styleLoader(this.shadow, style);
    this.zoomCard();
    this.closeCard();
  }

  zoomCard() {
    document.body.style.overflow = "hidden";
  }

  closeCard() {
    const buttonClose = this.shadow.getElementById("js-button-close");
    buttonClose.addEventListener("click", () => {
      const cardZoomed = document.querySelector("card-zoomed");
      document.body.style.overflow = "auto";
      cardZoomed.remove();
    });
  }
  render() {
    return `
        <div id="js-card-zoomed-wrapper" class="card-zoomed-wrapper">
          <img id="${this.cardId}"  src="${this.cardImage}"/>
          <button id="js-button-close" class="button-close">Close</button>
        </div>
    `;
  }
}
