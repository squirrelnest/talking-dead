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
        financials: action.payload.data.vehicle.product_financials[0],
        images: action.payload.data.vehicle.image_location_list
      }

    case GET_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Details Not Available',
        log: `${action.payload}`
      }

    default:
      return state
  }
}
