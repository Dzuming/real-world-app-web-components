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
    this.innerHTML = this.render({ cards });
  }

  render({ cards }) {
    return cards.map(card => `<div>${card.name}</div>`).join(' ');
  }
}
