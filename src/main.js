import { Card } from "./components/Card";
import { CardItem } from "./components/CardItem";
import { defineElement } from "./library/loaders";

const components = [
  {
    name: "card-element",
    component: Card
  },
  {
    name: "card-item",
    component: CardItem
  },
];

components.map(item => defineElement(item.name, item.component))
