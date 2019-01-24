import fetch from 'isomorphic-fetch';

/* ACTION TYPES */

export const GET_CARDS_PENDING = 'GET_CARDS_PENDING'
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS'
export const GET_CARDS_FAILURE = 'GET_CARDS_FAILURE'
export const REMOVE_CARD = 'REMOVE_CAR'

/* ACTION CREATORS */

export function getCardsPending() {
  return { type: GET_CARDS_PENDING }
}

export function getCardsSuccess(data) {
  return { type: GET_CARDS_SUCCESS, payload: data }
}

export function getCardsFailure(error) {
  return { type: GET_CARDS_FAILURE, payload: error }
}

export function removeCard(id) {
  return { type: REMOVE_CARD, payload: id }
}

/* API CALLS */

export function getCards() {
  return (dispatch) => {
    dispatch(getCardsPending());
    return fetch(`https://message-list.appspot.com/messages`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(cars => {
        dispatch(getCardsSuccess(cars))
      })
  }
}

export function getNextCard(pageToken, limit) {
  return (dispatch) => {
    dispatch(getCardsPending());
    return fetch(`https://message-list.appspot.com/messages?limit=${limit}&pageToken=${pageToken}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(cars => { dispatch(getCardsSuccess(cars)) })
  }
}
