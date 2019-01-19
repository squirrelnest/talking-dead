import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import 'styles/global.css'
import CardList from 'containers/CardList'
import { getCards } from 'actions/cardsActions'

export class App extends Component {

  constructor(props) {
    super(props);
    this.state={
    }
  }

  componentWillMount() {
    this.props.getCards()
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ CardList } />
          <Route exact path="/cards" component={ CardList } />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: () => dispatch(getCards())
  }
}

export default connect(null, mapDispatchToProps)(App)
