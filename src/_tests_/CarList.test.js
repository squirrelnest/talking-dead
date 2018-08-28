import React from 'react'
import ReactDOM from 'react-dom'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure, render } from 'enzyme'

// initialize enzyme

configure({ adapter: new Adapter() })

// UNIT TEST SUITE

describe('CarList component', () => {

  let wrapper
  let event

  beforeEach(() => {
    wrapper = shallow(<Login />)
  })

  it("has header", () => {
    expect(wrapper.contains(<h3>).toBeTruthy()
  })

})
