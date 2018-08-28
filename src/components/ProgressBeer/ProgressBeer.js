import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import classes from './ProgressBeer.module.css'

export default class ProgressBeer extends Component {

  constructor(props) {
    super(props)
    this.state={
      isOpen: false
    }
  }

  render() {

    return (
      <div className={classes.loader}>
        <div className={classes.bubble1}></div>
        <div className={classes.bubble2}></div>
        <div className={classes.bubble3}></div>
        <Ionicon icon='ios-beer-outline' fontSize='100px' color='#fc9414' className={classes.beer} />
      </div>
    )
  }

}
