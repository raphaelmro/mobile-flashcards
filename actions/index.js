export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const NEW_DECK = 'NEW_DECK'
export const NEW_CARD = 'NEW_CARD'

export const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export const addNewDeck = ({ title }) => {
  return {
    type: NEW_DECK,
    title
  }
}

export function addNewCard({ title, question, answer }) {
  return {
    type: NEW_CARD,
    title,
    question,
    answer
  }
}