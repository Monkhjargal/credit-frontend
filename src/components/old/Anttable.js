import React, { PureComponent } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

class Anttable extends PureComponent {
    render() {
        // console.log('table: ', this.props);
        return (
            <Table {...this.props} />
        );
    }
}


Anttable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
}

export default Anttable;
