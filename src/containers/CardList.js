import React, { Component } from 'react'
import classes from 'styles/CardList.module.css'
import { connect } from 'react-redux'
import { getNextCard, removeCard } from 'actions/cardsActions'
import { Card } from 'components/Card'
import { PageHeader } from 'components/PageHeader'
import { ProgressBar } from 'components/ProgressBar'

var startX;
var endX;
var destinationX;

export class CardList extends Component {

  constructor(props) {
    super(props)
    this.state={
      headerLabel: 'Messages',
      page_number: 1
      // startX: 0,
      // endX: 0,
      // destinationX: 0
    }
  }

  componentDidMount() {
    // true sets event handler for bubbling phase so that parent element's event handler fires first
    document.getElementById('list').addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    document.getElementById('list').removeEventListener('scroll', this.handleScroll, false);
  }

  handleTouchStart = (event, id) => {
    let target = document.getElementById(id);
    // this.setState({
    //   startX: event.touches[0].clientX
    // })
    startX = event.touches[0].clientX
  }

  handleTouchMove = (event, id) => {
    let target = document.getElementById(id);
    for(var i=0; i<event.touches.length; i++) {
      // this.setState({
      //   endX: event.touches[i].clientX,
      //   destinationX: event.touches[i].clientX - target.getBoundingClientRect().left
      // })
      endX = event.touches[i].clientX
      destinationX = event.touches[i].clientX - target.getBoundingClientRect().left
      target.style.transform = `translate3d(${endX-startX}px, 0, 0)`;
    }
  }

  handleTouchEnd = (event, id) => {
    let target = document.getElementById(id);
    // this.setState({
    //   endX: event.changedTouches[0].clientX,
    // destinationX: event.changedTouches[0].clientX - target.getBoundingClientRect().left
    // })
    if (destinationX === 0) { return; }
    if (Math.abs(endX - startX) > document.getElementById('cards').clientWidth/3) {
    // dismiss messages after significant amount of swipe
      this.props.removeCard(id);
      this.props.getNextCard(this.props.pageToken, 1)
    } else {
    // snap message back into place if swipe was accidental
      target.classList.add('isAnimating');
      target.style.transform = `translate3d(0px, 0, 0)`;
    }
  }

  handleScroll = (event) => {
    const { getNextCard, error, loading, item_count, pageToken } = this.props
    // Exit if there's an error or data is loading or there are no more cards to load
    if (error || loading || item_count < 10) return
    // If user scrolls near bottom of list, fetch next 10 cards (desktop) or next 1 card (mobile)
    if (window.innerWidth > 600 && document.getElementById('list').scrollTop + window.innerHeight + window.innerHeight/5 >= document.getElementById('list').scrollHeight) {
      getNextCard(pageToken, 10)
    } else if (window.innerWidth < 600 && document.getElementById('list').scrollTop >= document.getElementById('list').getBoundingClientRect().bottom * this.state.page_number) {
      getNextCard(pageToken, 1)
      this.setState({
        page_number: this.state.page_number + 1
      })
    }
  }

  handleDismiss = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
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
          <div id='list' className={classes.list}>
            <div id='cards' className={classes.cards}>{messages}</div>
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
