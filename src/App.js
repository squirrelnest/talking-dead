import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import 'styles/global.css'
import CarList from 'routes/CarList'
import CarDetail from 'routes/CarDetail'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state={
    }
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ CarList } />
          <Route exact path="/cars" component={ CarList } />
          <Route exact path="/cars/:carID" component={ CarDetail } />
        </Switch>
      </BrowserRouter>
    )
  }
}
