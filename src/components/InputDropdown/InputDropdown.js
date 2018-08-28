import React, { Component } from 'react'
import Select from 'react-select'

const selectorStyle = {
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#16a085' : 'white',
    color: state.isFocused ? 'white' : '#000000',
    textAlign: 'left',
    padding: '20px',
  }),
  control: (base, state) => ({
    ...base,
    appearance: 'none',
    backgroundColor: 'white',
    boxShadow: state.isFocused ? '0 0 5px 1px #16a085' : 'none !important',
    border: '1px solid #ccc',
    outline: 'none',
    borderRadius: '3px',
    width: '100%',
    height: '40px'
  }),
  indicatorsContainer: (base) => ({
    ...base,
    backgroundColor: '#16a085 !important'
  }),
  indicatorSeparator: (base) => ({
    ...base,
    visibility: 'hidden'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'white',
  }),
}

export default class Growl extends Component {

  render() {

    const { id, value, options, changeHandler, blurHandler } = this.props

    return (

      <Select
        id={id}
        value={value}
        options={options}
        styles={selectorStyle}
        style={{ outline: 'none' }}
        onChange={changeHandler}
        onBlur={blurHandler} />

    )

  }

}
