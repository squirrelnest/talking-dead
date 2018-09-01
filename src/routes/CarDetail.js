import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCar } from 'actions/carActions'
import ProgressBar from 'components/ProgressBar/ProgressBar'
import IconDropdown from 'components/IconDropdown/IconDropdown'
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
      taxed: false
    }
  }

  componentWillMount() {
    // this.props.getCar(this.props.match.params.carID)
    this.props.getCar('19XFC2F59GE2276732016')
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
    console.log(this.state.mileage)
  }

  render() {

    const { id, car, loading } = this.props

    return (

      <div className='page'>

        <div className={classes.detailsGrid}>

          <div className={classes.carousel}>
            <img src={loading ? Placeholder : car.chrome_image_url} alt='car photo' className={classes.carouselImage}/>
          </div>

          <div className='panel'>

            { loading ?

              <ProgressBar />

            :

              <React.Fragment>
                <div>{car.model_year} {car.make}</div>
                <h3>{car.model} {car.trim}</h3>
                <div className='row col-2-grid'>
                  <div>{car.mileage} Mi.</div>
                  <div className='row' onClick={this.toggleDropdown}>Vehicle Features <IconDropdown isOpen={this.state.featuresOpen}/></div>
                </div>
                <div className='row border-top col-2-grid'>
                  <div><label>EXTERIOR COLOR</label>{ car.exterior_color? car.exterior_color : 'Not Available'}</div>
                  <div><label>INTERIOR COLORS</label>{ car.interior_colors? car.interior_colors : 'Not Available'}</div>
                </div>
                <div className='border-top'>
                  <div className='col-2-grid'>
                    <div><label>MONTHLY PYMT.</label>${this.state.monthly_fee}</div>
                    <div><label>START PYMT.</label>${this.state.start_fee}</div>
                  </div>
                  <label>MILEAGE: {this.state.mileage}</label>
                  <div className='row space-between' style={{ paddingBottom: '20px' }}>
                    <span>1</span>
                    <input
                      name='mileageSlider'
                      type='range'
                      className='slider'
                      min='1'
                      max='100000'
                      step='10'
                      value={this.state.mileage}
                      onChange={(event) => this.handleSlider(event)}
                      style={{ margin: '10px' }}/>
                    <span>100,000</span>
                  </div>
                </div>
                <div className='row border-top space-between' style={{ paddingTop: '20px' }}>
                  Price With{!this.state.taxed && 'out'} Tax <Toggler onChange={this.toggleTax}/>
                </div>
              </React.Fragment>

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
