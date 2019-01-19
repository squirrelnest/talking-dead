import { combineReducers } from 'redux'
import cardsReducer from './cardsReducer'

const appReducer = combineReducers({
  cards: cardsReducer
})

const rootReducer = (state, action) => {
  // RESET STATE UPON LOGOUT
  // if (action.type === LOGOUT) {
  //   state = undefined
  // }
  return appReducer(state, action)
}

export default rootReducer
