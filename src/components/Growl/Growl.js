import React, { Component } from 'react'
import classes from './Growl.module.css'

export default class Growl extends Component {

  render() {

    const { children, showGrowl } = this.props

    return (
      <div className={classes.growl}>{ children }</div>
    )

  }

}
