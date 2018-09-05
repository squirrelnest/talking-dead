import React from 'react'
import classes from './PageHeader.module.css'

export const PageHeader = (props) => {

  const { children, headerLabel } = props

  return (
    <div className={classes.pageHeader}>
      <h3 style={{ width: '100%'}}>{headerLabel}</h3>
        {children}
      <h3>{new Date().toLocaleDateString()}</h3>
    </div>
  )

}
