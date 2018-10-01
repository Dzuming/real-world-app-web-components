import { getAllCards } from "../services/cards";
import { cardBackground } from "../const/colors";

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
    console.log(cards)
    return `<div class="card">
        ${cards
          .map(card => `<card-item card-name="${card.name}" card-image="${card.imageUrl}"></card-item>`)
          .join(" ")};
</div>`;
  }

  style() {
    return `
    .card {
      display: grid;
      grid-template-columns: repeat(4, 1fr [col-start]);
      justify-items: center;
      width: 100%;
    }
    
    card-item {
      margin: 10px;
      width: 120px
      height: auto
    }
    `;
  }
}
