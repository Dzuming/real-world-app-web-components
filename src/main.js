import { Card } from "./components/Card";
import { CardItem } from "./components/CardItem";
import { CardZoomed } from "./components/CardZoomed";
import { defineElement } from "./library/loaders";
import { Searchbar } from "./components/Searchbar";
import * as PubSub from "pubsub-js";
import { getAllCards } from "./services/cards";
import Cards from "./models/cards";

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
  {
    name: "search-bar",
    component: Searchbar
  },
];

export const myCards = new Cards()

components.map(item => defineElement(item.name, item.component))
