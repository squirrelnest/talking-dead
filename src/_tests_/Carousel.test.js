import React from 'react'
import ReactDOM from 'react-dom'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure, render } from 'enzyme'

import Carousel from 'components/Carousel/Carousel'

// initialize enzyme

configure({ adapter: new Adapter() })

// UNIT TEST SUITE

describe('Carousel', () => {

  let wrapper
  let event
  let imagesMock = [
    "http://cdn-prod.prod.fair.engineering/vehicle-images/0640_032_png/MY2016/10846/10846_cc0640_032_BS.png",
    "https://cdn.getauto.com/photos/1/231641/1c/19XFC2F5XGE007832-1c.jpg",
    "https://cdn.getauto.com/photos/1/231641/2c/19XFC2F5XGE007832-2c.jpg"
  ]

  beforeEach(() => {
    wrapper = mount(<Carousel images={imagesMock} loading={false}/>)
    event = { preventDefault() {}, stopPropagation() {} }
  })

  it("nextArrow increments slide number", () => {
    const nextArrow = wrapper.find('[data-test="next-arrow"]')
    nextArrow.simulate('click', event)
    expect(wrapper.state()).toHaveProperty('currentSlide', 1)
  })

  it("backArrow decrements slide number", () => {
    const nextArrow = wrapper.find('[data-test="next-arrow"]')
    const backArrow = wrapper.find('[data-test="back-arrow"]')
    nextArrow.simulate('click', event)
    backArrow.simulate('click', event)
    expect(wrapper.state()).toHaveProperty('currentSlide', 0)
  })

  it("on first slide, backArrow loops back to last slide", () => {
    const backArrow = wrapper.find('[data-test="back-arrow"]')
    backArrow.simulate('click', event)
    expect(wrapper.state()).toHaveProperty('currentSlide', imagesMock.length-1)
  })

  it("on last slide, nextArrow loops back to first slide", () => {
    const nextArrow = wrapper.find('[data-test="next-arrow"]')
    for (var i = 0; i < imagesMock.length; i++) {
      nextArrow.simulate('click', event)
    }
    expect(wrapper.state()).toHaveProperty('currentSlide', 0)
  })

})
