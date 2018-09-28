//TODO: Show all cards

import {getAllCards} from "../services/cards";

export class Card extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return [];
    }

    async connectedCallback() {
        const cards = await getAllCards();
        console.log(cards);
        this.innerHTML = this.render();
    }

    render() {
        return `
        <div>It works</div>
`;
    }

}