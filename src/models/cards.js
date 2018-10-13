import { getAllCards } from "../services/cards";
import * as PubSub from "pubsub-js";
import { GET_CARDS } from "../const/events";

export default class Cards {
  constructor() {
    this.cards = null;
    PubSub.subscribe(GET_CARDS, this.setCards.bind(this));
  }

  setCards(message, cards) {
    this.cards = cards;
  }

  getCards() {
    return this.cards;
  }

  renderCardItem({ cardId, cardImage }) {
    return `<card-item card-id="${cardId}" card-image="${cardImage}"></card-item>`;
  }

  async fetchCards({ page }) {
    const { cards } = await getAllCards({ page, pageSize: 8 });
    return cards;
  }

  async getCardsByName({ name }) {
    const { cards } = await getAllCards({ name });
    return cards;
  }
}
