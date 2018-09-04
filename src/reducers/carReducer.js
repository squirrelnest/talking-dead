import {
  GET_CAR_PENDING,
  GET_CAR_SUCCESS,
  GET_CAR_FAILURE
} from 'actions/carActions'

const initialState = {
  car: []
}

export default function carReducer(state = initialState, action) {
  switch (action.type) {

    case GET_CAR_PENDING:
      return {
        loading: true
      }

    case GET_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        car: action.payload.data.vehicle,
        financials: action.payload.data.vehicle.product_financials[0]
      }

    case GET_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Details Not Available',
        log: `${action.payload.code} ${action.payload.name}: ${action.payload.message}`
      }

    default:
      return state
  }
}
