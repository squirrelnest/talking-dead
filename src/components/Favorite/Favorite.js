import React, { Component } from 'react'
import classes from './Favorite.module.css'
import Ionicon from 'react-ionicons'

export default class Favorite extends Component {

  constructor(props) {
    super(props)
    this.state={
      favorited: window.localStorage.getItem('favorites') ? JSON.parse(window.localStorage.getItem('favorites'))[props.id] : false
    }
  }

  toggleFavorite = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      favorited: !this.state.favorited
    })
    if (window.localStorage.getItem('favorites')) {
      let retrieved = JSON.parse(window.localStorage.getItem('favorites'))
      if (retrieved[id]) { // REMOVE CAR IF IT'S ALREADY IN THE FAVORITES OBJECT
        delete retrieved[id]
        window.localStorage.clear()
        window.localStorage.setItem('favorites', JSON.stringify(retrieved))
        return
      } else { // ADD CAR IF IT'S NOT ALREADY IN THE FAVORITES ARRAY
        retrieved[id] = true
        window.localStorage.setItem('favorites', JSON.stringify(retrieved))
        return
      }
    } else { // CREATE AND SAVE A FAVORITES OBJECT IF IT DOESN'T ALREADY EXIST
      let favorites = {}
      favorites[id] = true
      window.localStorage.setItem('favorites', JSON.stringify(favorites))
      return
    }
  }

  render() {

    const { id } = this.props
    const { favorited } = this.state

    return (
      <div onClick={(event) => this.toggleFavorite(event, id)} className={classes.favorite} data-test='favorite'>
        <Ionicon
          icon={favorited ? 'md-heart' : 'md-heart-outline'}
          fontSize="30px"
          color={favorited ? 'red' : 'gray'} />
      </div>
    )
  }
}
