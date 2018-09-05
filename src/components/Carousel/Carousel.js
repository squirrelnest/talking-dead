import React, { Component } from 'react'
import classes from './Carousel.module.css'
import { IconDropdown } from 'components/IconDropdown/IconDropdown'
import Ionicon from 'react-ionicons'
import Placeholder from 'images/placeholder.svg'
import { connect } from 'react-redux'

export class Carousel extends Component {

  constructor(props) {
    super(props)
    this.state={
      currentSlide: 0
    }
  }

  previousSlide = (props) => {
    // const lastIndex = props.images.length - 1
    // const { currentSlide } = this.state
    // const shouldResetIndex = currentSlide === 0
    // const index = shouldResetIndex ? lastIndex : currentSlide - 1

    this.setState({
      // currentSlide: index
      currentSlide: this.state.currentSlide - 1
    })
  }

  nextSlide = (props) => {
    // const lastIndex = props.images.length - 1
    // const { currentSlide } = this.state
    // const shouldResetIndex = currentSlide === lastIndex;
    // const index = shouldResetIndex ? 0 : currentSlide + 1

    this.setState({
      // currentSlide: index
      currentSlide: this.state.currentSlide + 1
    })
    console.log(this.state.currentSlide)
  }

  render () {

    const { images, className, loading } = this.props
    const { currentSlide } = this.state

    return (
        <div className={classes.carousel}>
          <div className={classes.arrowContainer}>
            <div onClick={this.previousSlide} className={classes.arrow}><Ionicon icon='ios-arrow-back' fontSize='36px' color='grey' /></div>
            <div onClick={this.nextSlide} className={classes.arrow}><Ionicon icon='ios-arrow-forward' fontSize='36px' color='grey' /></div>
          </div>
          <div className={classes.imageContainer}><img src={ images[this.state.currentSlide] } className={classes.carouselImage} /></div>
        </div>
    )
  }
}

export default connect()(Carousel)
