import React, { Component } from 'react'
import classes from './Card.module.css'
import Favorite from 'components/Favorite/Favorite'

// Won't pass linter due to jsx-no-bind rule (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
// ...unless we set ignoreDOMComponents or allowArrowFunctions to true.

// Also, arrow function syntax creates a different callback each time Card renders.
// Performance may be affected if this component is frequently re-rendered.

// On the other hand, functional components only work with arrow function callbacks
// ...and use less memory as they don't need to be instantiated on each render

export const Card = (props) => {

  const { id, car, children, footer, clickHandler } = props

  return (
    <div className={classes.card} onClick={(event) => clickHandler(event, id)} data-test='card'>
      <div className={classes.cardContent}>
        <div className={classes.cardHeader}>
          <Favorite id={id} className={classes.favorite}/>
          <div><label>MONTHLY FEE</label>${(Number(car.product_financials[0].monthly_payment_cents))/100}</div>
        </div>
        <div>
          <img src={car.chrome_image_url} className={classes.cardImage} alt='car'/>
        </div>
        <div className={classes.cardBody}>
          <div><label>MILEAGE</label>{car.mileage.toLocaleString('en-US')}</div>
          <div><label>START FEE</label>${(Number(car.product_financials[0].start_fee_cents))/100}</div>
        </div>
        { children }
      </div>

      { footer && <div className={classes.cardFooter}>{footer}</div> }

    </div>
  )
}

// // Public class method syntax is experimental but enabled by default in create-react-app
// // This will pass linter

// export class Card extends Component {
//
//   handleClick = (event) => {
//     this.props.clickHandler(event, this.props.id)
//   }
//
//   render() {
//
//     const { id, car, children, footer, clickHandler } = this.props
//
//     return (
//       <div className={classes.card} onClick={this.handleClick} data-test='card'>
//         <div className={classes.cardContent}>
//           <div className={classes.cardHeader}>
//             <Favorite id={id} className={classes.favorite}/>
//             <div><label>MONTHLY FEE</label>${(Number(car.product_financials[0].monthly_payment_cents))/100}</div>
//           </div>
//           <div>
//             <img src={car.chrome_image_url} className={classes.cardImage} alt='car'/>
//           </div>
//           <div className={classes.cardBody}>
//             <div><label>MILEAGE</label>{car.mileage.toLocaleString('en-US')}</div>
//             <div><label>START FEE</label>${(Number(car.product_financials[0].start_fee_cents))/100}</div>
//           </div>
//           { children }
//         </div>
//
//         { footer && <div className={classes.cardFooter}>{footer}</div> }
//
//       </div>
//     )
//   }
// }
