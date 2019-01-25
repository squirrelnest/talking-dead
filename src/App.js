import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import 'styles/global.css'
import CardList from 'containers/CardList'
import { getCards } from 'actions/cardsActions'
import { auth, firebaseAuthProvider } from './firebase.js';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      authenticated: false
    }
  }

  componentWillMount() {
    this.props.getCards()
  }

  componentDidMount() {
    auth.onAuthStateChanged((authenticated) => {
      if (authenticated) {
        this.setState({ authenticated });
      }
    });
  }

  login = () => {
    auth.signInWithPopup(firebaseAuthProvider)
      .then((result) => {
        this.setState({
          user: result.user
        });
      });
  }

  render() {

    return (
      <div className="screen">
        { this.state.authenticated ?
          <CardList/>
          :
          <button onClick={this.login} className="login">Log In</button>
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: () => dispatch(getCards())
  }
}

export default connect(null, mapDispatchToProps)(App)
