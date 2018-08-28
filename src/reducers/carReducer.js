import {
  GET_CAR_PENDING,
  GET_CAR_SUCCESS,
  GET_CAR_FAILURE
} from 'actions/carActions'
import { formatDate, formatDateTime, flattenObject } from 'actions/_common'

const initialState = {
  car: []
}

export default function carReducer(state = initialState, action) {
  switch (action.type) {

    case GET_CAR_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        car: action.payload.data.vehicle,
      }

    case GET_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.status
      }

    default:
      return state
  }
}
