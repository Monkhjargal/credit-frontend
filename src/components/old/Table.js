import React, { Component } from 'react';
import ReactTable from 'react-table';
import Loader from './Loader';

class Table extends Component {
  render() {
    console.log('table: ', this.props);
    return (
      <ReactTable
        className="custom-table"
        defaultPageSize={10}
        {...this.props}
        LoadingComponent={() =>
          this.props.loading ? <Loader absolute /> : ''
        }
      />
    );
  }
}

export default Table;
