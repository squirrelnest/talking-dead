import React, { Component } from 'react'
import classes from './Carousel.module.css'
import Ionicon from 'react-ionicons'
import Placeholder from 'images/placeholder.svg'

export default class Carousel extends Component {

  constructor(props) {
    super(props)
    this.state={
      currentSlide: 0,
      imageUnavailable: false
    }
  }

  previousSlide = (props) => {
    this.setState({
      currentSlide: this.state.currentSlide !== 0 ? this.state.currentSlide - 1 : this.props.images.length - 1
    })
  }

  nextSlide = (props) => {
    this.setState({
      currentSlide: this.state.currentSlide !== this.props.images.length - 1 ? this.state.currentSlide + 1 : 0
    })
  }

  handleError = () => {
    this.setState({
      imageUnavailable: true
    })
    console.log(this.state.imageUnavailable)
  }

  render () {

    const { images, error } = this.props
    const { imageUnavailable } = this.state

    return (
      <div className={classes.carousel}>
        <div className={classes.arrowContainer}>
          <div onClick={this.previousSlide} className={classes.arrow}><Ionicon icon='ios-arrow-back' fontSize='36px' color='grey' /></div>
          <div onClick={this.nextSlide} className={classes.arrow}><Ionicon icon='ios-arrow-forward' fontSize='36px' color='grey' /></div>
        </div>
        <div className={classes.imageContainer}>
          <img
            src={error ? Placeholder : images[this.state.currentSlide]}
            className={classes.carouselImage}
            alt='car detail'
            onError={(event)=>event.target.setAttribute('src', Placeholder)}/>
        </div>
      </div>
    )
  }
}
