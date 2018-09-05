import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCars } from 'actions/carsActions'

import classes from 'styles/CarList.module.css'
import Card from 'components/Card/Card'
import { PageHeader } from 'components/PageHeader/PageHeader'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'



class CarList extends Component {

  constructor(props) {
    super(props)
    this.state={
      headerLabel: 'Car Listing',
      page_number: 1
    }
  }

  componentWillMount() {
    // Load some cars on initial load
    this.props.getCars()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  handleScroll = () => {
    const { incrementPage } = this
    const { getCars, error, loading, page_count } = this.props
    const { page_number } = this.state
    // Exit if there's an error or data is loading or there are no more cars to load
    if (error || loading || page_number === page_count) return
    // If page has scrolled to the bottom, increment page number and fetch next set of cars
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
      incrementPage()
      getCars(page_number)
    }
  }

  incrementPage = () => {
    this.setState({
      page_number: this.state.page_number + 1
    })
  }

  handleRedirect = (event, id) => {
    event.preventDefault()
    this.props.history.push(`/cars/${id}`)
  }

  render() {

    const { cars, page_count, error, loading } = this.props
    const { headerLabel, page_number } = this.state

    const cards = cars.map( car =>
      <Card
        key={Math.random()}
        id={car.id}
        car={car}
        clickHandler={this.handleRedirect}
        footer={`${car.model_year} ${car.make} ${car.model} ${car.trim}`} />
    )

    return (
      <div id='wrapper' className='page'>
        { error && <div className='error'>{error}</div> }
        <PageHeader headerLabel={headerLabel}/>
        <div className={classes.cardsContainer}>{cards}</div>
        { loading && <ProgressBar /> }
        { page_number === page_count && <div className='center container'><h5>End of list</h5></div> }
      </div>
    )

  }

}

// CONNECT TO REDUX STORE TO ACCESS GLOBAL STATE AND/OR DISPATCH THROUGH PROPS

const mapStateToProps = (state) => {
  return {
    cars: state.cars.cars || [],
    loading: state.cars.loading,
    qualifying_count: state.cars.qualifying_count,
    page_count: state.cars.page_count,
    error: state.cars.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCars: (page_number) => dispatch(getCars(page_number))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CarList)
