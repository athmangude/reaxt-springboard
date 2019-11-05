/* eslint-disable jsx-a11y/href-no-hash, no-shadow, object-curly-newline */
import React, { Component } from 'react';
import { Row } from 'react-grid-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import Overview from './Overview';
import Summary from './Summary';
import Filters from '../Filters';
import * as metricsActions from '../../flux/actions';

@connect(() => ({}),
  (dispatch) => ({
    metricsActions: bindActionCreators(metricsActions, dispatch),
    dispatch,
  }))

export default class Surveys extends Component {
  static propTypes = {
    metricsActions: PropTypes.object.isRequired,
    alertActions: PropTypes.object.isRequired,
    EventHandler: PropTypes.object.isRequired,
    accountId: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      label: 'Interactions',
      endpoint: '/surveys',
      statType: 'SURVEY',
      startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    };

    this.onDateRangeChange = this.onDateRangeChange.bind(this);
  }


  onDateRangeChange({ from, to }) {
    this.setState({ startDate: from, endDate: to });
  }

  render() {
    const { metricsActions, EventHandler, alertActions, accountId } = this.props;
    const { label, startDate, endDate, endpoint, statType } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <Filters handleDateRangeChanged={this.onDateRangeChange} startDate={startDate} endDate={endDate} padding={0} margin={0} EventHandler={EventHandler} alertActions={alertActions} />
        <Row style={{ width: '100%', margin: 0, padding: 0 }}>
          <Overview accountId={accountId} endpoint={endpoint} statType={statType} startDate={startDate} endDate={endDate} EventHandler={EventHandler} alertActions={alertActions} metricsActions={metricsActions} />
        </Row>
        <Summary accountId={accountId} label={label} endpoint={endpoint} statType={statType} EventHandler={EventHandler} alertActions={alertActions} metricsActions={metricsActions} />
      </div>
    );
  }
}
