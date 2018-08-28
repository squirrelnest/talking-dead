import React, { Component } from 'react'
import classes from './Toggler.module.css'

export default class toggle extends Component {

  constructor(props) {
    super(props)
    this.state={
    }
  }

  render() {

    const { name, value, onChange } = this.props

    return (
      <label className={classes.switch}>
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange} />
        <div className={classes.slider}></div>
      </label>
    )
  }

}
