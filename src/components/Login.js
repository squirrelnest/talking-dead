import React, { Component } from 'react'
import classes from '../styles/Login.module.css'

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state={
      password: 'Enter Password'
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({
      password: event.target.value.toLowerCase()
    })
  }

  clearField = (event) => {
    event.preventDefault()
    this.setState({
      password: ''
    })
  }

  render () {

    const { login } = this.props

    return (
      <div
        id="login"
        className={classes.login}>
        <input
          type="text"
          id="password"
          onClick={this.clearField}
          onChange={this.handleChange}
          name="password"
          value={this.state.password} />
        <div
          id="loginBtn"
          className={classes.loginBtn}
          onClick={(event) => login(event, this.state.password)}>
          <span>LOGIN</span>
        </div>
      </div>
    )
  }
}
