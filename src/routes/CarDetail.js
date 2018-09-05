import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getCar } from 'actions/carActions'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { IconDropdown } from 'components/IconDropdown/IconDropdown'
import Toggler from 'components/Toggler/Toggler'
import Carousel from 'components/Carousel/Carousel'
import Favorite from 'components/Favorite/Favorite'
import Placeholder from 'images/placeholder.svg'
import classes from 'styles/CarDetail.module.css'

function changeFees(nextState, nextProps) {
  return { // THIS IS A PLACEHOLDER FOR THE ACTUAL PRICING FORMULA, WHICH IS PROBABLY NOT LINEAR
    monthlyFee: Math.round( (nextProps.financials.monthly_payment_cents/100) * ((nextProps.car.mileage) / (nextState.mileage)) * (nextState.taxed ? 1.1 : 1) ),
    startFee: Math.round( (nextProps.financials.start_fee_cents/100) * ((nextProps.car.mileage) / (nextState.mileage)) * (nextState.taxed ? 1.1 : 1) )
  }
}

class CarDetail extends Component {

  constructor(props) {
    super(props)
    this.state={
      featuresOpen: false,
      mileage: props.car.mileage,
      monthlyFee: props.financials.monthly_payment_cents/100,
      startFee: props.financials.start_fee_cents/100,
      taxed: false,
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
        monthlyFee: nextProps.financials.monthly_payment_cents/100,
        startFee: nextProps.financials.start_fee_cents/100
      })
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

    const { match, car, loading, error, images } = this.props
    const { featuresOpen, monthlyFee, startFee, mileage, taxed } = this.state

    return (

      <div className='page'>
        { error !== null && <div className='error'>{error}</div> }
        <div className={classes.detailsGrid}>

          { loading ?
              <img src={Placeholder} alt='car' className={classes.placeholderImage}/>
            :
              <Carousel images={images} error={error} loading={loading} />
          }

          <div className='panel'>

            { loading ?
              <ProgressBar />
            :
              <Fragment>
                <div className='row' style={{ justifyContent: 'space-between' }}>
                  <div>{car.model_year} {car.make}</div>
                  <Favorite id={match.params.carID}/>
                </div>
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
                    <div><label>MONTHLY PYMT.</label>${monthlyFee || 0}</div>
                    <div><label>START PYMT.</label>${startFee || 0}</div>
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
    images: state.car.images || [],
    financials: state.car.financials || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCar: (carID) => dispatch(getCar(carID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarDetail)
