import { getAllCards } from "../services/cards";

export class Card extends HTMLElement {
  constructor() {
    super();
    this.page = 1;
  }

  static get observedAttributes() {
    return [];
  }

  async connectedCallback() {
    const cards = await this.fetchCards({ page: this.page });
    const shadow = this.attachShadow({ mode: "open" });
    let style = document.createElement("style");
    shadow.innerHTML = this.render({ cards });
    style.textContent = this.style();
    shadow.appendChild(style);
    const cardsContainer = shadow.querySelector("#cards-container");
    shadow.querySelector("#js-fetch-more").addEventListener("click", async () => {
      this.page++;
      const cards = await this.fetchCards({ page: this.page });
      //Use a template

      cards.map(card => {
        var template = document.createElement("template");
        template.innerHTML = `<card-item card-name="${card.name}" card-image="${
          card.imageUrl
        }"></card-item>`;

        //Get the document fragment
        var fragment = template.content;
        cardsContainer.appendChild(fragment);
      });
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
              `<card-item card-name="${card.name}" card-image="${
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
    
    .fetch-more-container {
      display: flex;
      justify-content: center;
    }
    .fetch-more {
      width: 120px;
      height: 40px;
    }
    `;
  }
}
