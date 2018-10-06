import { Card } from "./components/Card";
import { CardItem } from "./components/CardItem";
import { CardZoomed } from "./components/CardZoomed";
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
  {
    name: "card-zoomed",
    component: CardZoomed
  },
];

components.map(item => defineElement(item.name, item.component))
