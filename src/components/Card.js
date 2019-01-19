import React from 'react'
import classes from '../styles/Card.module.css'
import { millisecondsToTime } from '../actions/_utils';

export const Card = (props) => {

  const { id, card, touchStartHandler, touchMoveHandler, touchEndHandler, dismiss } = props

  return (
    <div
      className={classes.card}
      data-test='card'
      id={id}
      onTouchStart={(event) => touchStartHandler(event, id)}
      onTouchMove={(event) => touchMoveHandler(event, id)}
      onTouchEnd={(event) => touchEndHandler(event, id)}
    >
      <div className={classes.cardHeader}>
        <div className={classes.cardHeaderContent}>
          <img src={'http://message-list.appspot.com/' + card.author.photoUrl} alt="author mug" />
          <div className={classes.cardHeaderText}>
            <span>{card.author.name}</span>
            <span className='lightgrey'>{millisecondsToTime(Date.now()-Date.parse(card.updated))}</span>
          </div>
        </div>
        <div
          className={classes.dismissButton}
          onClick={(event) => dismiss(event, id)}
        >
          &#10005;
        </div>
      </div>
      <p className={classes.cardBody}>
        {card.content}
      </p>
    </div>
  )
}
