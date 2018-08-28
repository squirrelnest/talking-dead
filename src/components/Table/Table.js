import React, { Component } from 'react'
import classes from './Table.module.css'
import TableRow from 'components/TableRow/TableRow'

export default class Table extends Component {

  constructor(props) {
    super(props)
    this.state=({
      rows: props.rowData,
      sortAsc: true,
      sortColumn: null
    })
  }

  sortBy(columnName) {

    const sorted = this.state.rows.sort((currentRow, nextRow) => {

      if (this.state.sortAsc) {

          if (currentRow[columnName] > nextRow[columnName]) {
            return 1;
          }
          if (currentRow[columnName] < nextRow[columnName]) {
            return -1;
          }
          if (currentRow[columnName] === nextRow[columnName]) {
            return 0;
          }

        } else {

          if (currentRow[columnName] > nextRow[columnName]) {
            return -1;
          }
          if (currentRow[columnName] < nextRow[columnName]) {
            return 1;
          }
          if (currentRow[columnName] === nextRow[columnName]) {
            return 0;
          }
        }
        return null;
      })
    this.setState({
      rows: sorted,
      sortAsc: !this.state.sortAsc,
      sortColumn: columnName
    })
  }

  render() {

    const {
      headerClassName,
      labelsClassName,
      rowClassName,
      totalsClassName,
      footerClassName,
      header,
      columns,
      rowData,
      totals,
      footer,
      details,
      rowClickHandler,
      deletable,
      editable
    } = this.props

    const labels = columns.map( column =>
      <div
        onClick={(event) => this.sortBy(column['key'])}
        className={[
          classes.TableLabel,
          this.state.sortColumn===column['key'] && this.state.sortAsc===true ? [classes.sortColumn, classes.asc].join(' ') : null,
          this.state.sortColumn===column['key'] && this.state.sortAsc===false ? [classes.sortColumn, classes.desc].join(' ') : null
          ].join(' ')}
        key={column['label']}>
        {column['label']}
      </div>
    )

    const rows = this.state.rows.map( (row, index) =>
      <TableRow
        id={row.restaurant}
        key={index}
        rowClassName={rowClassName}
        rowData={row}
        columns={columns}
        details={details}
        rowClickHandler={rowClickHandler}
        deletable={deletable}
        editable={editable}
      />
    )

    return (

        <div>
          <div className={[classes.TableHeader, headerClassName].join(' ')}>{ header }</div>
          <div className={[classes.TableLabels, labelsClassName].join(' ')}>{ labels }</div>
          <div className={classes.TableContainer}>{ rows }</div>
          <div className={[totals ? classes.TableTotals : null, totalsClassName].join(' ')}>{ totals }</div>
          <div className={[footer ? classes.TableFooter : null, footerClassName].join(' ')}>{ footer }</div>
        </div>

    )
  }

}
