import { getAllCards } from "../services/cards";
import { styleLoader } from "../library/loaders";
import { style } from "./Card.style";

export class Card extends HTMLElement {
  constructor() {
    super();
    this.page = 1;
    this.shadow = null;
  }

  static get observedAttributes() {
    return [];
  }

  async connectedCallback() {
    const cards = await this.fetchCards({ page: this.page });
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = this.render({ cards });
    styleLoader(this.shadow, style);
    this.handleMoreButtonClick();
  }

  handleMoreButtonClick() {
    const cardsContainer = this.shadow.querySelector("#cards-container");
    const moreButton = this.shadow.querySelector("#js-fetch-more");
    moreButton.addEventListener("click", async () => {
      await this.handleRenderNextCards(cardsContainer);
    });
  }
  async handleRenderNextCards(cardsContainer) {
    this.page++;
    const cards = await this.fetchCards({ page: this.page });

    cards.map(card => {
      let template = document.createElement("template");
      template.innerHTML = `<card-item card-id="${card.id}" card-image="${
        card.imageUrl
      }"></card-item>`;
      let fragment = template.content;
      cardsContainer.appendChild(fragment);
    });
  }

  async fetchCards({ page }) {
    const { cards } = await getAllCards({ page, pageSize: 8 });
    return cards;
  }
  render({ cards }) {
    return `<div id="cards-container" class="card">
        ${cards
          .map(
            card =>
              `<card-item card-id="${card.id}" card-image="${
                card.imageUrl
              }"></card-item>`
          )
          .join(" ")}
    </div>
    <div class="fetch-more-container">
        <button id="js-fetch-more" class="fetch-more">Show more</button>
    </div>
`;
  }
}
