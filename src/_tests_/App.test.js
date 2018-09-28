import React from 'react'
import ReactDOM from 'react-dom'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure, render } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import App from '../App'

// initialize enzyme

configure({ adapter: new Adapter() })

// initialize mock redux STORE

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

// UNIT TEST SUITE

describe('App', () => {

  it('renders without crashing', () => {
    shallow(<App />)
  })

})
