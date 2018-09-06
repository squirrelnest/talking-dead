import fetch from 'isomorphic-fetch'
import { checkHTTPStatus } from 'actions/_utils'

/* ACTION TYPES */

export const GET_CAR_PENDING = 'GET_CAR_PENDING'
export const GET_CAR_SUCCESS = 'GET_CAR_SUCCESS'
export const GET_CAR_FAILURE = 'GET_CAR_FAILURE'
export const FAVORITE_CAR = 'FAVORITE_CAR'
export const UNFAVORITE_CAR = 'UNFAVORITE_CAR'

/* ACTION CREATORS */

export function getCarPending() {
  return { type: GET_CAR_PENDING }
}

export function getCarSuccess(car) {
  return { type: GET_CAR_SUCCESS, payload: car }
}

export function getCarFailure(error) {
  return { type: GET_CAR_FAILURE, payload: error }
}


/* API CALLS */

export function getCar(carID) {
  return (dispatch) => {
    dispatch(getCarPending())
    return fetch(`https://private-4e19e-interviewapi3.apiary-mock.com/vehicles/${carID}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHTTPStatus)
      .then(response => response.json())
      .then(car => dispatch(getCarSuccess(car)))
      .catch(error => {
        dispatch(getCarFailure(error))
        console.log(error)
      })
  }
}
