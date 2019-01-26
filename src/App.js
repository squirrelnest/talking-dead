import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import 'styles/global.css'
import CardList from 'containers/CardList'
import Login from 'components/Login'
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
    // Firebase Auth disabled to protect review panel identities
    // auth.onAuthStateChanged((authenticated) => {
    //   if (authenticated) {
    //     this.setState({ authenticated });
    //   }
    // });
  }

  // Firebase Auth disabled to protect review panel identities
  // login = () => {
  //   auth.signInWithPopup(firebaseAuthProvider)
  //     .then((result) => {
  //       this.setState({
  //         user: result.user
  //       });
  //     });
  // }

  login = (event, input) => {
    event.preventDefault()
    // not very secure w/o hashing but keeps out crawlers and riff raff
    if (input.toLowerCase() === 'hordor') {
      this.setState({
        authenticated: !this.state.authenticated
      })
    } else {
      alert('Wrong password')
    }
  }

  render() {

    return (
      <div className="screen">
        { this.state.authenticated ?
          <CardList/>
          :
          <Login login={this.login}/>
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
