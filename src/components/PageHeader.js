import React from 'react'
import classes from '../styles/PageHeader.module.css'

export const PageHeader = (props) => {

  const { children, headerLabel } = props

  return (
    <div className={classes.pageHeader}>
      <h3 className={classes.menuIcon}>&#9776;</h3>
      <h3>{headerLabel}</h3>
      {children}
    </div>
  )

}
