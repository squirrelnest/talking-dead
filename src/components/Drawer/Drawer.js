import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './Drawer.module.css'

export default class Drawer extends Component {

  constructor(props) {
    super(props);
    this.state={
      drawerOpen: this.props.drawerOpen
    }
  }

  componentWillMount() { window.addEventListener('click', this.onWindowClickHandler) }
  componentWillUnmount() { window.removeEventListener('click', this.onWindowClickHandler) }

  onWindowClickHandler = (event) => {

    if (!event.target.matches('.Drawer') && !event.target.matches('.drawerToggler')) {
      this.setState({ drawerOpen: false })
    }

    if (event.target.matches('.drawerToggler')) {
      this.setState({ drawerOpen: !this.state.drawerOpen })
    }

  }

  render() {

    const { drawerClassName, children } = this.props

    return (
      <div id="Drawer" className={[drawerClassName, this.state.drawerOpen ? classes.open : classes.closed ].join(' ')}>
        {children}
      </div>
    )
  }

}

Drawer.propTypes = {
}
