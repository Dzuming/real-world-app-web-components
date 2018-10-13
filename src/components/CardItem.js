import { styleLoader } from "../library/loaders";
import { style } from "./CardItem.style";

export class CardItem extends HTMLElement {
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
    switch (name) {
      case "card-image":
        return (this.cardImage = newValue);
      case "card-id": {
        return (this.cardId = newValue);
      }
    }
  }

  async connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = this.render();
    styleLoader(this.shadow, style);
    this.renderImage();
    const cardImage = this.shadow.getElementById(this.cardId);

    cardImage.addEventListener("click", () => {
      const cardZoomed = document.createElement("card-zoomed");
      cardZoomed.setAttribute("card-id", this.cardId);
      cardZoomed.setAttribute("card-image", this.cardImage);
      document.body.append(cardZoomed);
    });
  }

  renderImage() {
    const card = this.shadow.getElementById(`${this.cardId}`);
    const loader = this.shadow.getElementById(`${this.cardId}-loader`);
    card.style.display = "none";
    card.onload = function() {
      loader.style.display = "none";
      card.style.display = "inline";
    };
  }

  render() {
    return `
        <div class="loader-wrapper">
                <div class="loader" id="${this.cardId}-loader"></div>
        </div>
        <img id="${this.cardId}"  src="${this.cardImage}"/>
    `;
  }
}
