//TODO Add api call on scroll
//TODO Add card zooming on click
//TODO Add logic to search specific card

export class CardItem extends HTMLElement {
  constructor() {
    super();
    this.cardImage = null;
  }

  static get observedAttributes() {
    return ["card-name", "card-image"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "card-image":
        this.cardImage = newValue;
    }
  }

  async connectedCallback() {
    this.innerHTML = this.render();
  }

  render() {
    console.log(this.cardImage);
    return `
        <img src="${this.cardImage}"/>
    `;
  }
}
