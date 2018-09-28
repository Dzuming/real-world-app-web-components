export class CardItem extends HTMLElement {
  constructor() {
    super();
    this.cardName = null;
  }

  static get observedAttributes() {
    return ["card-name"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "card-name":
        this.cardName = newValue;
    }
  }

  async connectedCallback() {
    this.innerHTML = this.render();
  }

  render() {
    return `<div>${this.cardName}</div>`;
  }
}
