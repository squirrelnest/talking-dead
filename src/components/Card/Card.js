import React, { Component } from 'react'
import classes from './Card.module.css'
import Favorite from 'components/Favorite/Favorite'

export const Card = (props) => {

  const { id, car, children, footer, clickHandler } = props

  return (
    <div className={classes.card} onClick={(event) => clickHandler(event, id)}>
      <div className={classes.cardContent}>

        { children }

        <div className={classes.cardHeader}>
          <Favorite id={id}/>
          <div><label>MONTHLY FEE</label>${(Number(car.product_financials[0].monthly_payment_cents))/100}</div>
        </div>
        <div>
          <img src={car.chrome_image_url} className={classes.cardImage} alt='car'/>
        </div>
        <div className={classes.cardBody}>
          <div><label>MILEAGE</label>{car.mileage.toLocaleString('en-US')}</div>
          <div><label>START FEE</label>${(Number(car.product_financials[0].start_fee_cents))/100}</div>
        </div>

      </div>

      { footer && <div className={classes.cardFooter}>{footer}</div> }

    </div>
  )

}
