const API_URL = new URL("https://api.magicthegathering.io");

export const getAllCards = params => {
  const getAllCards = API_URL;
  getAllCards.pathname = "v1/cards";
  getAllCards.search = new URLSearchParams(params);
  return fetch(getAllCards).then(response => response.json());
};
