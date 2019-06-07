export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const NEW_DECK = "NEW_DECK";
export const NEW_CARD = "NEW_CARD";

export const receiveDecks = decks => {
  return {
    type: RECEIVE_DECKS,
    decks
  };
};

export const addDeck = ({ title }) => {
  return {
    type: NEW_DECK,
    title
  };
};

export function addCard({ title, question, answer }) {
  return {
    type: NEW_CARD,
    title,
    question,
    answer
  };
}
