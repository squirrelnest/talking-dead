import fetch from 'isomorphic-fetch';

/* ACTION TYPES */

export const GET_CARS_PENDING = 'GET_CARS_PENDING'
export const GET_CARS_SUCCESS = 'GET_CARS_SUCCESS'
export const GET_CARS_FAILURE = 'GET_CARS_FAILURE'

/* ACTION CREATORS */

export function getCarsPending() {
  return { type: GET_CARS_PENDING }
}

export function getCarsSuccess(data) {
  return { type: GET_CARS_SUCCESS, payload: data }
}

export function getCarsFailure(error) {
  return { type: GET_CARS_SUCCESS, payload: error }
}


/* API CALLS */

export function getCars(page_number) {
  return (dispatch) => {
    dispatch(getCarsPending());
    return fetch(`https://private-4e19e-interviewapi3.apiary-mock.com/vehicles?page=${page_number}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(cars => {
        dispatch(getCarsSuccess(cars))
      })
  }
}
