import React from 'react'
import classes from '../styles/PageHeader.module.css'

export const PageHeader = (props) => {

  const { children, headerLabel } = props

  return (
    <div className={classes.pageHeader}>
      <h3>{headerLabel}</h3>
        {children}
      <h3>{new Date().toLocaleDateString()}</h3>
    </div>
  )

}
