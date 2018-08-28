import { combineReducers } from 'redux'
import carReducer from './carReducer'
import carsReducer from './carsReducer'

const appReducer = combineReducers({
  car: carReducer,
  cars: carsReducer
})

const rootReducer = (state, action) => {
  // RESET STATE UPON LOGOUT
  // if (action.type === LOGOUT) {
  //   state = undefined
  // }
  return appReducer(state, action)
}

export default rootReducer
