import React, { Component } from 'react'
import Ionicon from 'react-ionicons'

export default class Favorite extends Component {

  constructor(props) {
    super(props)
    this.state={
      favorited: window.localStorage.getItem('favorites') ? JSON.parse(window.localStorage.getItem('favorites')).includes(props.id) : false
    }
  }

  toggleOpen = (event) => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleFavorite = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      favorited: !this.state.favorited
    })
    if (window.localStorage.getItem('favorites')) {
      let retrieved = JSON.parse(window.localStorage.getItem('favorites'))
      if (retrieved.includes(id)) {
        let removed = retrieved.filter(VIN => VIN !== id)
        window.localStorage.clear()
        window.localStorage.setItem('favorites', JSON.stringify(removed))
        return
      } else {
        retrieved.push(id)
        window.localStorage.setItem('favorites', JSON.stringify(retrieved))
        return
      }
    } else {
      let favorites = []
      favorites.push(id)
      window.localStorage.setItem('favorites', JSON.stringify(favorites))
      return
    }
  }

  render() {

    const { id } = this.props
    const { favorited } = this.state

    return (
      <div onClick={(event) => this.toggleFavorite(event, id)}>
        <Ionicon
          icon={favorited ? 'md-heart' : 'md-heart-outline'}
          fontSize="30px"
          color={favorited ? 'red' : 'gray'} />
      </div>
    )
  }
}
