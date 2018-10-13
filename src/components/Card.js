import { getAllCards } from "../services/cards";
import { styleLoader } from "../library/loaders";
import { style } from "./Card.style";
import * as PubSub from "pubsub-js";
import { myCards } from "../main";
import { GET_CARDS, GET_MORE_CARDS } from "../const/events";

export class Card extends HTMLElement {
  constructor() {
    super();
    this.page = 1;
    this.shadow = null;
    PubSub.subscribe(GET_MORE_CARDS, this.handleRenderNextCards.bind(this));
  }

  static get observedAttributes() {
    return [];
  }

  async connectedCallback() {
    const cards = await myCards.fetchCards({ page: 1 });
    PubSub.publishSync(GET_CARDS, cards);
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = this.render({ cards: myCards.getCards() });
    styleLoader(this.shadow, style);
    this.handleMoreButtonClick();
  }

  handleMoreButtonClick() {
    const moreButton = this.shadow.querySelector("#js-fetch-more");
    moreButton.addEventListener("click", async () => {
      this.increasePageNumber();
      const cards = await myCards.fetchCards({ page: this.page });
      PubSub.publishSync(GET_MORE_CARDS, cards);
    });
  }

  handleRenderNextCards(message, cards) {
    const cardsContainer = this.shadow.querySelector("#cards-container");
    cards.map(card => {
      let template = document.createElement("template");
      template.innerHTML = myCards.renderCardItem({
        cardId: card.id,
        cardImage: card.imageUrl
      });
      let fragment = template.content;
      cardsContainer.appendChild(fragment);
    });
  }

  increasePageNumber() {
    this.page++;
  }

  render({ cards }) {
    return `
        <search-bar></search-bar>
<div id="cards-container" class="card">
        ${cards
          .map(card =>
            myCards.renderCardItem({
              cardId: card.id,
              cardImage: card.imageUrl
            })
          )
          .join(" ")}
    </div>
    <div id="js-fetch-more-container" class="fetch-more-container">
        <button id="js-fetch-more" class="fetch-more">Show more</button>
    </div>
`;
  }
}
