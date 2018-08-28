import React, { Component } from 'react'
import classes from './Card.module.css'
import IconDropdown from 'components/IconDropdown/IconDropdown'
import Ionicon from 'react-ionicons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class Card extends Component {

  constructor(props) {
    super(props)
    this.state={
      isOpen: false,
      favorited: false
    }
  }

  toggleOpen = (event) => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleNotes = (event) => {
    event.preventDefault()
  }

  render() {

    const { id, car, children, notes, footer, clickHandler } = this.props

    return (
      <div className={classes.card} onClick={(event) => clickHandler(event, id)}>
        <div className={classes.cardContent}>

          { children }

          <div className={classes.cardHeader}>
            <div><Ionicon icon={this.state.favorited ? 'md-heart' : 'md-heart-outline'} fontSize="30px" color={this.state.favorited ? 'red' : 'gray'} /></div>
            <div><label>MONTHLY FEE</label>${(Number(car.product_financials[0].monthly_payment_cents))/100}</div>
          </div>
          <div>
            <img src={car.chrome_image_url} className={classes.cardImage} alt='car photo'/>
          </div>
          <div className={classes.cardBody}>
            <div><label>MILEAGE</label>{car.mileage.toLocaleString('en-US')}</div>
            <div><label>START FEE</label>${(Number(car.product_financials[0].start_fee_cents))/100}</div>
          </div>

        </div>

        { footer && <div className={classes.cardFooter}>{footer}</div> }

        { notes &&
          <div className={[classes.cardFooter, this.state.isOpen ? classes.open : classes.closed].join(' ')}>
            <div
              className={classes.notesHeader}
              onClick={this.toggleOpen}>
              NOTES
              <IconDropdown
                iconColor='white'
                isOpen={this.state.isOpen}>
              </IconDropdown>
            </div>,
            <div className={classes.notesBody}>
              { this.state.isOpen ?
                <textarea
                  placeholder={notes}
                  className={classes.notes}
                  onClick={(event) => this.handleNotes(event)}></textarea>
              : null }
            </div>
          </div>
        }

      </div>
    )
  }

}


export default connect()(Card)
