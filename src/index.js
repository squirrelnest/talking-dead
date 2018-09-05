import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'


// CREATE REDUX STORE AND APPLY DEVTOOLS AND MIDDLEWARE

function configureStore(initialState={}) {
    return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
}

// PASS REDUX STORE INTO REACT APP AND RENDER REACT APP

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// ENABLE APP TO BE SERVED FROM OFFLINE CACHE

// registerServiceWorker()
