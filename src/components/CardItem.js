//TODO Add card zooming on click
//TODO Add logic to search specific card
//TODO Add general function to load style
//TODO Add general function to load custom elements

export class CardItem extends HTMLElement {
  constructor() {
    super();
    this.cardId = null;
    this.cardImage = null;
    this.shadow = null;
  }

  static get observedAttributes() {
    return ["card-id", "card-image"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "card-image":
        return (this.cardImage = newValue);
      case "card-id": {
        return (this.cardId = newValue);
      }
    }
  }

  async connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = this.render();
    let style = document.createElement("style");
    style.textContent = this.style();
    this.shadow.appendChild(style);
    this.renderImage()
  }

  renderImage() {
    const card = this.shadow.getElementById(`${this.cardId}`);
    const loader = this.shadow.getElementById(`${this.cardId}-loader`);
    card.style.display = "none";
    card.onload = function() {
      loader.style.display = "none";
      card.style.display = "block";
    };
  }

  render() {
    return `
        <div class="loader-wrapper">
                <div class="loader" id="${this.cardId}-loader"></div>
        </div>
        <img id="${this.cardId}"  src="${this.cardImage}"/>
    `;
  }

  style() {
    return `
      .loader {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid #39132E;
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
      }
    
      @keyframes spin {
        to { -webkit-transform: rotate(360deg); }
      }  
      @-webkit-keyframes spin {
        to { -webkit-transform: rotate(360deg); }
      }
    `;
  }
}
