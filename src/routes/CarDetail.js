import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getCar } from 'actions/carActions'
import ProgressBar from 'components/ProgressBar/ProgressBar'
import { IconDropdown } from 'components/IconDropdown/IconDropdown'
import Toggler from 'components/Toggler/Toggler'
import Ionicon from 'react-ionicons'
import Placeholder from 'images/placeholder.svg'
import classes from 'styles/CarDetail.module.css'

function changeFees(nextState, nextProps) {
  return { // THIS IS A PLACEHOLDER FOR THE ACTUAL PRICING FORMULA, WHICH IS PROBABLY NOT LINEAR
    monthly_fee: Math.round( (nextProps.financials.monthly_payment_cents/100) * ((nextProps.car.mileage) / (nextState.mileage)) * (nextState.taxed ? 1.1 : 1) ),
    start_fee: Math.round( (nextProps.financials.start_fee_cents/100) * ((nextProps.car.mileage) / (nextState.mileage)) * (nextState.taxed ? 1.1 : 1) )
  }
}

class CarDetail extends Component {

  constructor(props) {
    super(props)
    this.state={
      featuresOpen: false,
      mileage: props.car.mileage,
      monthly_fee: props.financials.monthly_payment_cents/100,
      start_fee: props.financials.start_fee_cents/100,
      taxed: false,
      favorited: window.localStorage.getItem('favorites') !== "[]" ? JSON.parse(window.localStorage.getItem('favorites')).includes(props.match.params.carID) : false
    }
  }

  componentWillMount() {
    this.props.getCar(this.props.match.params.carID)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.car !== this.props.car) {
      this.setState({
        mileage: nextProps.car.mileage
      })
    }
    if (nextProps.financials !== this.props.financials) {
      this.setState({
        monthly_fee: nextProps.financials.monthly_payment_cents/100,
        start_fee: nextProps.financials.start_fee_cents/100
      })
    }
  }

  toggleFavorite = (event, id) => {
    event.preventDefault()
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

  toggleDropdown = () => {
    this.setState({
      featuresOpen: !this.state.featuresOpen
    })
  }

  toggleTax = () => {
    this.setState({
      taxed: !this.state.taxed
    })
    this.setState(changeFees)
  }

  handleSlider = (event) => {
    this.setState({
      mileage: event.target.value,
    })
    this.setState(changeFees)
  }

  render() {

    const { match, car, loading, error } = this.props
    const { featuresOpen, monthly_fee, start_fee, mileage, taxed, favorited } = this.state

    return (

      <div className='page'>
        <div className={classes.detailsGrid}>
          <div className={classes.carousel}>
            { error !== null ?
                <React.Fragment>
                  <div className='error'>{error}</div>
                  <img src={Placeholder} alt='placeholder' className={classes.carouselImage}/>
                </React.Fragment>
              :
                <img src={loading ? Placeholder : car.chrome_image_url} alt='car' className={classes.carouselImage}/>
            }
          </div>
          <div className='panel'>

            { loading ?

              <ProgressBar />

            :

              <Fragment>
                <div onClick={(event) => this.toggleFavorite(event, match.params.carID)}><Ionicon icon={favorited ? 'md-heart' : 'md-heart-outline'} fontSize="30px" color={favorited ? 'red' : 'gray'} /></div>
                <div>{car.model_year} {car.make}</div>
                <h3>{car.model} {car.trim}</h3>
                <div className='row col-2-grid'>
                  <div>{car.mileage || 0} Mi.</div>
                  <div className='row' onClick={this.toggleDropdown}>Vehicle Features <IconDropdown isOpen={featuresOpen}/></div>
                </div>
                <div className='row border-top col-2-grid'>
                  <div><label>EXTERIOR COLOR</label>{ car.exterior_color? car.exterior_color : 'Not Available'}</div>
                  <div><label>INTERIOR COLORS</label>{ car.interior_colors? car.interior_colors : 'Not Available'}</div>
                </div>
                <div className='border-top'>
                  <div className='col-2-grid'>
                    <div><label>MONTHLY PYMT.</label>${monthly_fee || 0}</div>
                    <div><label>START PYMT.</label>${start_fee || 0}</div>
                  </div>
                  <label>MILEAGE: {mileage}</label>
                  <div className='row space-between' style={{ paddingBottom: '20px' }}>
                    <span>1</span>
                    <input
                      name='mileageSlider'
                      type='range'
                      className='slider'
                      min='1'
                      max='100000'
                      step='10'
                      value={mileage}
                      onChange={(event) => this.handleSlider(event)}
                      style={{ margin: '10px' }}/>
                    <span>100,000</span>
                  </div>
                </div>
                <div className='row border-top space-between' style={{ paddingTop: '20px' }}>
                  Price With{!taxed && 'out'} Tax <Toggler onChange={this.toggleTax}/>
                </div>
              </Fragment>

            }

          </div>
        </div>
      </div>
    )

  }
}


// CONNECT TO REDUX STORE TO ACCESS GLOBAL STATE AND ACTIONS AND CALL THEM AS PROPS

const mapStateToProps = (state) => {
  return {
    loading: state.car.loading,
    error: state.car.error || null,
    car: state.car.car || {},
    financials: state.car.financials || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCar: (carID) => dispatch(getCar(carID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarDetail)
