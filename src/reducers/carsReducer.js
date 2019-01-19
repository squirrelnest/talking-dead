import {
  GET_CARDS_PENDING,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAILURE,
  REMOVE_CARD
} from 'actions/cardsActions';

const initialState = {
  cards: []
}

export default function cardsReducer(state = initialState, action) {
  switch (action.type) {

    case GET_CARDS_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        item_count: action.payload.count,
        pageToken: action.payload.pageToken,
        cards: state.cards.concat(action.payload.messages)
      }

    case GET_CARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.warnings
      }

    case REMOVE_CARD:
      return {
        ...state,
        loading: false,
        item_count: state.cards.count,
        pageToken: state.cards.pageToken,
        cards: state.cards.filter(card => card.id !== action.payload)
      }

    default:
      return state
  }
}
