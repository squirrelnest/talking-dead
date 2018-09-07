import React from 'react'
import classes from './Toggler.module.css'

export const Toggler = (props) => {

  const { name, value, onChange } = props

  return (
    <label className={classes.switch} data-test='toggler'>
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}/>
      <div className={classes.slider}></div>
    </label>
  )

}
