import { getAllCards } from "../services/cards";

export class Card extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [];
  }

  async connectedCallback() {
    const { cards } = await getAllCards();
    const shadow = this.attachShadow({ mode: "open" });
    let style = document.createElement("style");
    shadow.innerHTML = this.render({ cards });
    style.textContent = this.style();
    shadow.appendChild(style);
  }

  render({ cards }) {
    return cards
      .map(card => `<card-item card-name='${card.name}'></card-item>`)
      .join(" ");
  }

  style() {
    return `
    card-item {
        color: red
    }
    `;
  }
}
