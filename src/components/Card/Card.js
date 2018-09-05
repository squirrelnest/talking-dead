import React, { Component } from 'react'
import classes from './Card.module.css'
import { IconDropdown } from 'components/IconDropdown/IconDropdown'
import Ionicon from 'react-ionicons'
import { connect } from 'react-redux'

export class Card extends Component {

  constructor(props) {
    super(props)
    this.state={
      isOpen: false,
      favorited: window.localStorage.getItem('favorites') ? JSON.parse(window.localStorage.getItem('favorites')).includes(props.id) : false
    }
  }

  toggleOpen = (event) => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleFavorite = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      favorited: !this.state.favorited
    })
    if (window.localStorage.getItem('favorites')) {
      let retrieved = JSON.parse(window.localStorage.getItem('favorites'))
      if (retrieved.includes(id)) {
        let removed = retrieved.filter(VIN => VIN !== id)
        window.localStorage.clear()
        window.localStorage.setItem('favorites', JSON.stringify(removed))
        return
      } else {
        retrieved.push(id)
        window.localStorage.setItem('favorites', JSON.stringify(retrieved))
        return
      }
    } else {
      let favorites = []
      favorites.push(id)
      window.localStorage.setItem('favorites', JSON.stringify(favorites))
      return
    }
  }

  handleNotes = (event) => {
    event.preventDefault()
  }

  render() {

    const { id, car, children, notes, footer, clickHandler } = this.props
    const { isOpen, favorited } = this.state

    return (
      <div className={classes.card} onClick={(event) => clickHandler(event, id)}>
        <div className={classes.cardContent}>

          { children }

          <div className={classes.cardHeader}>
            <div onClick={(event) => this.toggleFavorite(event, id)}><Ionicon icon={favorited ? 'md-heart' : 'md-heart-outline'} fontSize="30px" color={favorited ? 'red' : 'gray'} /></div>
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

        { notes &&
          <div className={[classes.cardFooter, isOpen ? classes.open : classes.closed].join(' ')}>
            <div
              className={classes.notesHeader}
              onClick={this.toggleOpen}>
              NOTES
              <IconDropdown
                iconColor='white'
                isOpen={isOpen}>
              </IconDropdown>
            </div>,
            <div className={classes.notesBody}>
              { isOpen ?
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
