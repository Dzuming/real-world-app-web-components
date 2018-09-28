export class Card extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        this.innerHTML = this.render()
    }

    render() {
        return `
        <div>It works</div>
`;
    }

}