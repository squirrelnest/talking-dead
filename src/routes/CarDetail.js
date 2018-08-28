import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCar } from 'actions/carActions'
import Table from 'components/Table/Table'
import PageHeader from 'components/PageHeader/PageHeader'
import ProgressBeer from 'components/ProgressBeer/ProgressBeer'
import classes from 'styles/CarDetail.module.css'


class CarDetail extends Component {

  constructor(props) {
    super(props)
    this.state={
      headerLabel: <p><Link to='/cars'>Cars</Link> > VIN</p>
    }
  }

  componentDidMount() {
    this.props.getCar(this.props.match.params.carID)
  }

  render() {

    const { match } = this.props

    return (

      <div className='page'>

        <PageHeader headerLabel={this.state.headerLabel}/>

        { this.props.loading ?

          <ProgressBeer />

        :

          <div>hi</div>

        }

      </div>
    )

  }
}


// CONNECT TO REDUX STORE TO ACCESS GLOBAL STATE AND ACTIONS AND CALL THEM AS PROPS

const mapStateToProps = (state) => {
  return {
    loading: state.car.loading,
    car: state.car.car
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCar: (carID) => dispatch(getCar(carID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarDetail)
