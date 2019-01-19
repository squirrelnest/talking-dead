import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNextCard, removeCard } from 'actions/cardsActions'
import classes from 'styles/CardList.module.css'
import { Card } from 'components/Card'
import { PageHeader } from 'components/PageHeader'
import { ProgressBar } from 'components/ProgressBar'

var originX = 0;
var startX = 0;
var endX = 0;
var destinationX = 0;

export class CardList extends Component {

  constructor(props) {
    super(props)
    this.state={
      headerLabel: 'Messages'
    }
  }

  componentDidMount() {
    // true sets event handler for bubbling phase so that parent element's event handler fires first
    document.getElementById('page').addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    document.getElementById('page').removeEventListener('scroll', this.handleScroll, false);
  }

  componentWillReceiveProps(nextProps){
  if (nextProps.cards !== this.props.cards) {
      this.setState({ cards: nextProps.cards });
    }
  }

  handleTouchStart = (event, id) => {
    let target = document.getElementById(id);
    let rect = target.getBoundingClientRect();
    startX = event.touches[0].clientX;
    originX = startX - rect.left;
  }

  handleTouchMove = (event, id) => {
    let target = document.getElementById(id);
    let rect = target.getBoundingClientRect();
    for(var i=0; i<event.touches.length; i++) {
      endX = event.touches[i].clientX
      destinationX = endX - rect.left
      target.style.transform = `translate3d(${endX-startX}px, 0, 0)`;
    }
    originX = 0;
    destinationX = 0;
  }

  handleTouchEnd = (event, id) => {
    let target = document.getElementById(id);
    if (Math.abs(endX - startX) > document.getElementById('cardList').clientWidth/4) {
      this.props.removeCard(id);
      this.props.getNextCard(this.props.pageToken, 1)
    } else {
      target.classList.add('isAnimating');
      target.style.transform = `translate3d(${-(destinationX-originX)}px, 0, 0)`;
    }
  }

  handleScroll = (event) => {
    const { getNextCard, error, loading, item_count, pageToken } = this.props
    // Exit if there's an error or data is loading or there are no more cards to load
    if (error || loading || item_count < 10) return
    // If page has scrolled near bottom of cardList, increment page number and fetch next set of cards
    if (window.innerHeight + document.getElementById('page').scrollTop === document.getElementById('page').scrollHeight) {
      getNextCard(pageToken, 10)
    }
  }

  handleDismiss = (event, id) => {
    event.preventDefault();
    this.props.removeCard(id);
    this.props.getNextCard(this.props.pageToken, 1);
  }

  render() {

    const { cards, error, loading } = this.props
    const { headerLabel } = this.state

    const messages = cards.map( card =>
      <Card
        key={card.id}
        id={card.id}
        card={card}
        touchStartHandler={this.handleTouchStart}
        touchMoveHandler={this.handleTouchMove}
        touchEndHandler={this.handleTouchEnd}
        dismiss={this.handleDismiss}
      />
    )

    return (
      [
        <PageHeader headerLabel={headerLabel} key='header'/>,
        <div id='wrapper' className='wrapper' key='wrapper'>
          { error && <div className='error'>{error}</div> }
          <div id='page' className='page'>
            <div id='cardList' className={[classes.cardsContainer].join(' ')}>{messages}</div>
          </div>
          { loading && <ProgressBar /> }
        </div>
      ]
    )

  }
}

// CONNECT TO REDUX STORE TO ACCESS GLOBAL STATE AND/OR DISPATCH THROUGH PROPS

const mapStateToProps = (state) => {
  return {
    cards: state.cards.cards || [],
    loading: state.cards.loading,
    pageToken: state.cards.pageToken,
    item_count: state.cards.item_count,
    error: state.cards.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNextCard: (pageToken) => dispatch(getNextCard(pageToken)),
    removeCard: (id) => dispatch(removeCard(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CardList)
