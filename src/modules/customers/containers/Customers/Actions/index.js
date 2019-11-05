import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DateRangePicker from 'SharedComponents/mwamba-date-range-picker';
import Filters from './Filters';

export default class Actions extends Component {
  static propTypes = {
    width: PropTypes.number,
    loading: PropTypes.bool,
  };

  state = {};

  render() {
    const { width, loading } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <DateRangePicker loading={loading} />
        <Filters width={width} />
      </div>
    );
  }
}
