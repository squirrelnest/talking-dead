import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCars } from 'actions/carsActions'

import Ionicon from 'react-ionicons'
import Card from 'components/Card/Card'
import classes from 'styles/CarList.module.css'
import PageHeader from 'components/PageHeader/PageHeader'

class CarList extends Component {

  constructor(props) {
    super(props)
    this.state={
      headerLabel: 'Car Listing',
    }
  }

  componentDidMount() {
    this.props.getCars()
  }

  handleRedirect = (event, id) => {
    event.preventDefault()
    console.log(id)
    this.props.history.push(`/cars/19XFC2F59GE2276732016`)
  }

  render() {

    const { cars } = this.props

    const cards = cars.map( car =>
      <Card
        id={car.id}
        car={car}
        clickHandler={this.handleRedirect}
        footer={`${car.model_year} ${car.make} ${car.model} ${car.trim}`} />
    )

    return (
      <div className='page'>
        <PageHeader headerLabel={this.state.headerLabel}/>
        <div className={classes.cardsContainer}>{cards}</div>
      </div>
    )

  }

}

// CONNECT TO REDUX STORE TO ACCESS GLOBAL STATE AND/OR DISPATCH THROUGH PROPS

const mapStateToProps = (state) => {
  return {
    cars: state.cars.cars,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCars: () => dispatch(getCars())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CarList)
