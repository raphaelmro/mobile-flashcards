import { RECEIVE_DECKS, NEW_DECK, NEW_CARD, REMOVE_DECK } from "../actions";
import { addEntry } from "../utils/api";
import _ from "lodash";

function reducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };

    case NEW_DECK:
      const { title } = action;

      addEntry({
        key: title,
        entry: {
          title,
          questions: []
        }
      });

      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };

    case NEW_CARD: {
      const { title, question, answer } = action;
      const entry = {
        title,
        questions: [
          {
            result: null,
            question,
            answer
          },
          ...state[title].questions
        ]
      };

      addEntry({
        key: title,
        entry
      });

      return {
        ...state,
        [title]: entry
      };
    }

    case REMOVE_DECK: {
      const { title } = action;

      const decks = _.omit(state, title);
      return {
        ...decks
      };
    }

    default:
      return state;
  }
}

export default reducer;