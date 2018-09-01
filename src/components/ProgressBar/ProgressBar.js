import React, { Component } from 'react'
import Wheel from 'images/steering-wheel.svg'
import classes from './ProgressBar.module.css'

export default class ProgressBar extends Component {

  constructor(props) {
    super(props)
    this.state={
      isOpen: false
    }
  }

  render() {

    return (
      <div className={classes.loader}>
        <div><img src={Wheel} alt='steering wheel' className={classes.wheel} /></div>
        <h4 style={{ color: '#fc9414' }}>Doing Donuts...</h4>
      </div>
    )
  }

}
