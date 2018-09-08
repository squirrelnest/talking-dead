import React from 'react'
import ReactDOM from 'react-dom'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure, render } from 'enzyme'

import Favorite from 'components/Favorite/Favorite'

// initialize enzyme

configure({ adapter: new Adapter() })

// UNIT TEST SUITE

describe('Favorite', () => {

  let wrapper
  let event

  beforeEach(() => {
    wrapper = shallow(<Favorite />)
    event = { preventDefault() {}, stopPropagation() {} }
  })

  it("initializes state with favorited: false", () => {
    expect(wrapper.state()).toHaveProperty('favorited', false)
  })

  it("favorites array in localStorage is initially empty", () => {
    expect(localStorage.getItem('favorites')).toEqual(undefined)
  })

  it("toggles state when clicked", () => {
    const heart = wrapper.find('[data-test="favorite"]')
    heart.simulate('click', event)
    expect(wrapper.state()).toHaveProperty('favorited', true)
    heart.simulate('click', event)
    expect(wrapper.state()).toHaveProperty('favorited', false)
  })

})
