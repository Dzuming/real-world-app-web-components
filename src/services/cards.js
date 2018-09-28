const API_URL = "https://api.magicthegathering.io/v1";

export const getAllCards = () =>
  fetch(`${API_URL}/cards`).then(response => response.json());
