import React, { Component } from 'react'
import classes from './TableRow.module.css'
import IconDropdown from 'components/IconDropdown/IconDropdown'
import Ionicon from 'react-ionicons'
import { Link } from 'react-router-dom'
import Button from 'craft-button'

export default class TableRow extends Component {

  constructor(props) {
    super(props)
    this.state={
      isOpen: false,
      highlightDelete: false,
      highlightEdit: false
    }
  }

  toggleOpen = (event) => {
    event.preventDefault()
    if (event.target.name !== 'iconDelete' && event.target.name !== 'iconEdit') {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  highlightEditIcon = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      highlightEdit: !this.state.highlightEdit
    })
  }

  highlightDeleteIcon = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      highlightDelete: !this.state.highlightDelete
    })
  }

  render() {

    const { id, details, rowData, rowClassName, rowClickHandler, columns, editable, deletable } = this.props

    const detailsLink = (
      <div className='disappearingLabels'>
        <Link to='/orderDetail'>
          <Button
            wireframeTeal
            style={{ width: '120px' }}>
            DETAILS
          </Button>
        </Link>
      </div>

    )

    return (
      <div className={classes.TableRow}>

        <div
          className={[classes.summary, details ? this.state.isOpen ? classes.open : null : null, rowClassName].join(' ')}
          onClick={rowClickHandler ? rowClickHandler : (event) => this.toggleOpen(event)}>

            { columns.map( (column, index) =>
              <div key={index}>
                <label className='disappearingLabels'>{ column['label'] }</label>
                { rowData[column['key']] }
              </div>
            )}

        { deletable ?

          <div name='taskDiv' className={[classes.tasks, classes.delete].join(' ')} onClick={(event) => deletable(id, event)} onMouseOver={(event) => this.highlightDeleteIcon(event)} onMouseOut={(event) => this.highlightDeleteIcon(event)}>
            <Ionicon name='iconDelete' icon='md-checkmark' fontSize='30px' color='#16a085' className={this.state.highlightDelete ? classes.taskIconFocused : null }/>
          </div>

        : null }

        { editable ?

          <div name='taskDiv' className={[classes.tasks, classes.edit].join(' ')} onClick={(event) => editable(id, event)} onMouseOver={(event) => this.highlightEditIcon(event)} onMouseOut={(event) => this.highlightEditIcon(event)}>
            <Ionicon name='iconEdit' icon='md-create' fontSize='26px' color='#EC7B96' className={this.state.highlightEdit ? classes.taskIconFocused : null }/>
          </div>

        : null }

        { details ?

          <IconDropdown isOpen={this.state.isOpen} iconClassName={classes.more} label={detailsLink} />

        : null }

        </div>

        { this.state.isOpen && details ?

          <div className={classes.details}>
            { details }
          </div>

        : null }

      </div>
    )
  }

}
