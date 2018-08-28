import React, { Component } from 'react'
import { connect } from 'react-redux'

export class PageHeader extends Component {

  constructor(props) {
    super(props)
    this.state={
    }
  }

  render() {

    const { children, headerLabel, firstName, lastName } = this.props

    return (
      <div className='page-header'>
        <h3 style={{ width: '100%'}}>{headerLabel}</h3>
          {children}
        <h3>{new Date().toLocaleDateString()}</h3>
      </div>
    )
  }

}

// CONNECT TO REDUX STORE TO ACCESS GLOBAL STATE AND/OR DISPATCH THROUGH PROPS THROUGH PROPS

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, null)(PageHeader)
