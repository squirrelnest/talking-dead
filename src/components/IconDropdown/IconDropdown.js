import React from 'react'
import classes from './IconDropdown.module.css'
import Ionicon from 'react-ionicons'

export const IconDropdown = (props) => {

  const { iconColor, iconClassName, children, label, dropdownContentClassName, isOpen } = props

  return (
    <div id='IconDropdown' className='IconDropdown'>
      <div className={['IconDropdown', 'row'].join(' ')}>
        { label ? <div className='row'>{label}</div> : null }
        <div className='IconDropdown' style={{ position: 'relative'}}>
          <div className='IconDropdown' style={{backgroundColor: 'transparent', zIndex: 2, width: '24px', height: '24px', top: 0, position: 'absolute'}}></div>
          <Ionicon
            id='icondropdown-arrow'
            icon='ios-arrow-down'
            fontSize='24px'
            color={iconColor}
            className={['IconDropdown', 'iconPaddingLeft', iconClassName, isOpen ? classes.up : classes.down].join(' ')}
            />
        </div>
      </div>

      { children ?

        <div className={[classes.dropdownContainer, dropdownContentClassName].join(' ')}>
          <div className={ isOpen ? classes.visible : classes.invisible }>
            {children}
          </div>
        </div>

      : null }

    </div>
  )

}
