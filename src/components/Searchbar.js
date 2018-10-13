import { styleLoader } from "../library/loaders";
import { style } from "./Card.style";
import * as PubSub from "pubsub-js";
import { CLEAR_CARD_SEARCH, SEARCH_CARD } from "../const/events";
import { myCards } from "../main";

export class Searchbar extends HTMLElement {
  constructor() {
    super();
    this.shadow = null;
    PubSub.subscribe(SEARCH_CARD, this.searchCard);
    PubSub.subscribe(SEARCH_CARD, this.hideShowMoreButton);
    PubSub.subscribe(CLEAR_CARD_SEARCH, this.searchCard);
    PubSub.subscribe(CLEAR_CARD_SEARCH, this.showShowMoreButton);
  }

  static get observedAttributes() {
    return [];
  }

  async connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = this.render();
    styleLoader(this.shadow, style);
    const searchBar = this.shadow.getElementById("js-search-bar");
    const searchButton = this.shadow.getElementById("js-search-button");
    searchButton.addEventListener("click", async () => {
      const SearchString = searchBar.value;
      const isSearchString = SearchString.length > 0;
      if (isSearchString) {
        await this.searchCardByName(SearchString);
      } else {
        await this.fetchAllCards();
      }
    });
  }
  async searchCardByName(SearchString) {
    const cardsByName = await myCards.getCardsByName({
      name: SearchString
    });
    PubSub.publish(SEARCH_CARD, cardsByName);
  }

  async fetchAllCards() {
    const cards = await myCards.fetchCards({
      page: 1
    });
    PubSub.publish(CLEAR_CARD_SEARCH, cards);
  }

  searchCard(message, cards) {
    const cardElement = document.querySelector("card-element").shadowRoot;
    const cardsContainer = cardElement.getElementById("cards-container");
    cardsContainer.innerHTML = "";
    cards.map(card => {
      let template = document.createElement("template");
      template.innerHTML = myCards.renderCardItem({
        cardId: card.id,
        cardImage: card.imageUrl
      });
      let fragment = template.content;
      cardsContainer.append(fragment);
    });
  }

  hideShowMoreButton() {
    const cardElement = document.querySelector("card-element").shadowRoot;
    const cardsContainer = cardElement.getElementById(
      "js-fetch-more-container"
    );
    cardsContainer.style.display = "none";
  }

  showShowMoreButton() {
    const cardElement = document.querySelector("card-element").shadowRoot;
    const cardsContainer = cardElement.getElementById(
      "js-fetch-more-container"
    );
    cardsContainer.style.display = "flex";
  }

  render() {
    return `
    <input id="js-search-bar" type="search" placeholder="Search card" />
    <button id="js-search-button">Search</button>
`;
  }
}
