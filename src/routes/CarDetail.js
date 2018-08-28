import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCar } from 'actions/carActions'
import Table from 'components/Table/Table'
import PageHeader from 'components/PageHeader/PageHeader'
import ProgressBeer from 'components/ProgressBeer/ProgressBeer'
import IconDropdown from 'components/IconDropdown/IconDropdown'
import Toggler from 'components/Toggler/Toggler'
import Ionicon from 'react-ionicons'
import classes from 'styles/CarDetail.module.css'


class CarDetail extends Component {

  constructor(props) {
    super(props)
    this.state={
      headerLabel: <p><Link to='/cars'>Cars</Link> > VIN</p>,
      favorited: false,
      featuresOpen: false,
      mileage: props.car.mileage
    }
  }

  componentDidMount() {
    // this.props.getCar(this.props.match.params.carID)
    this.props.getCar('19XFC2F59GE2276732016')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.car !== this.props.car) {
      this.setState({
        mileage: nextProps.car.mileage
      })
    }
  }

  toggleDropdown = (event) => {
    event.preventDefault()
    this.setState({
      featuresOpen: !this.state.featuresOpen
    })
  }

  render() {

    const { match, id, car, financials } = this.props

    return (

      <div className='page'>

        { this.props.loading ?

          <ProgressBeer />

        :

        <div className={classes.detailsGrid}>

          <div className={classes.carousel}>
            <img src={car.chrome_image_url} alt='car photo' className={classes.carouselImage}/>
          </div>

          <div className='panel'>
            <div>{car.model_year} {car.make}</div>
            <h3>{car.model} {car.trim}</h3>

            <div className='row col-2-grid'>
              <div>{car.mileage} Mi.</div>
              <div className='row' onClick={(event) => this.toggleDropdown(event)}>Vehicle Features <IconDropdown isOpen={this.state.featuresOpen}/></div>
            </div>

            <div className='row border-top col-2-grid'>
              <div><label>EXTERIOR COLOR</label>{ car.exterior_color? car.exterior_color : 'Not Available'}</div>
              <div><label>INTERIOR COLORS</label>{ car.interior_colors? car.interior_colors : 'Not Available'}</div>
            </div>

            <div className='border-top'>
              <div className='col-2-grid'>
                <div><label>MONTHLY PYMT.</label>${(financials.monthly_payment_cents/100).toLocaleString('en-US')}</div>
                <div><label>START PYMT.</label>${(financials.start_fee_cents/100).toLocaleString('en-US')}</div>
              </div>

              <label>MILEAGE</label>
              <div className='row space-between' style={{ paddingBottom: '20px' }}>
                <span>0</span>
                <input type='range' className='slider' min='0' max='100000' value={this.state.mileage} style={{ margin: '10px' }}/>
                <span>100,000</span>
              </div>
            </div>

            <div className='row border-top space-between' style={{ paddingTop: '20px' }}>
              Price Without Tax <Toggler />
            </div>
          </div>

        </div>

        }

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
