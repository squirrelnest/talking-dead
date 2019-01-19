import React from 'react'
import Wheel from 'images/steering-wheel.svg'
import classes from '../styles/ProgressBar.module.css'

export const ProgressBar = (props) => {

  return (
    <div className={classes.loader} data-test='progressbar'>
      <div><img src={Wheel} alt='steering wheel' className={classes.wheel} /></div>
      <h4 style={{ color: '#fc9414' }}>Doing Donuts...</h4>
    </div>
  )

}
