/* eslint-disable jsx-a11y/href-no-hash, no-shadow, no-nested-ternary, object-curly-newline */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';

import IconList from '../../components/IconList';
import TearedList from '../../components/TearedList';

const demoData = [
  { name: 'Promoter Customers', metrics: { visits: { value: numeral(367).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '2.7%', color: '#0f9d58', icon: 'arrow_upward' } } },
  { name: 'Female Customers in Nairobi', metrics: { visits: { value: numeral(364).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '2.4%', color: '#0f9d58', icon: 'arrow_upward' } } },
  { name: 'Detractors below the age of 25', metrics: { visits: { value: numeral(357).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '1.9%', color: '#0f9d58', icon: 'arrow_upward' } } },
  { name: 'Customers above the age of 50', metrics: { visits: { value: numeral(349).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '1.1%', color: '#0f9d58', icon: 'arrow_upward' } } },
  { name: 'Unique customers in the last 30 days', metrics: { visits: { value: numeral(347).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '0.1%', color: '#0f9d58', icon: 'arrow_upward' } } },
  { name: 'Customers with LSM above 11', metrics: { visits: { value: numeral(347).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '0.1%', color: '#0f9d58', icon: 'arrow_upward' } } },
  { name: 'Customers who spend above 5K', metrics: { visits: { value: numeral(357).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '0.0%', color: 'inherit', icon: 'arrow_forward' } } },
  { name: 'Male Customers in Nairobi', metrics: { visits: { value: numeral(357).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '0.0%', color: 'inherit', icon: 'arrow_forward' } } },
  { name: 'All customers in Nairobi', metrics: { visits: { value: numeral(347).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '-1.9%', color: '#db4437', icon: 'arrow_downward' } } },
  { name: 'Customers who visit more than twice a week', metrics: { visits: { value: numeral(347).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '-1.4%', color: '#db4437', icon: 'arrow_downward' } } },
  { name: 'Customers between 30 and 35', metrics: { visits: { value: numeral(337).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '-2.6%', color: '#db4437', icon: 'arrow_downward' } } },
  { name: 'Passive customers', metrics: { visits: { value: numeral(337).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: '-2.7%', color: '#db4437', icon: 'arrow_downward' } } },
];

function paginate(data, currentPage, type) {
  let lowerLimit = 0;
  let upperLimit = 10;

  if (type == 'prev') {
    currentPage = currentPage == 0 ? 0 : currentPage - 1;
    lowerLimit = currentPage * 10;
    upperLimit = lowerLimit + 10;
  }

  if (type == 'next') {
    currentPage = currentPage + 1;
    lowerLimit = currentPage * 10;
    upperLimit = lowerLimit + 10;
  }

  const items = data.sort((a, b) => b.value - a.value).map((item) => {
    const delta = (Math.random() * (1 - 0) + 0).toFixed(0);
    return ({ name: item.segmentName, metrics: { count: { value: numeral(item.value).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: `${(Math.random() * (20 - 0) + 0).toFixed(1)}%`, color: delta === '1' ? '#0f9d58' : '#db4437', icon: delta === '1' ? 'arrow_upward' : 'arrow_downward' } } });
  });

  return items.slice(lowerLimit, upperLimit);
}

export default class Segments extends PureComponent {
  static propTypes = {
    selectedDateRange: PropTypes.object,
    selectedSegment: PropTypes.object,
    appliedFilters: PropTypes.array,
    demoMode: PropTypes.bool,
    width: PropTypes.number,
    customerAnalyticsActions: PropTypes.object,
    EventHandler: PropTypes.object,
    alertActions: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.fetchBehaviourSegments = this.fetchBehaviourSegments.bind(this);
    this.onPaginateNext = this.onPaginateNext.bind(this);
    this.onPaginatePrevious = this.onPaginatePrevious.bind(this);
  }

  state = {
    data: [],
    items: [],
    currentPage: 0,
    isLoading: false,
  }

  componentDidMount() {
    this.fetchBehaviourSegments();
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    if (!newProps.demoMode) {
      this.fetchBehaviourSegments();
    }
  }

  onPaginateNext() {
    const { currentPage, data } = this.state;

    const items = paginate(data, currentPage, 'next');

    let newCurrentPage = currentPage + 1;
    
    this.setState({ currentPage: newCurrentPage, items});
  }

  onPaginatePrevious() {
    const { currentPage, data } = this.state;

    const items = paginate(data, currentPage, 'prev');

    let newCurrentPage = currentPage == 0 ? 0 : currentPage - 1;

    this.setState({ currentPage: newCurrentPage, items});
  }

  async fetchBehaviourSegments() {
    const { customerAnalyticsActions, EventHandler, selectedDateRange, selectedSegment, appliedFilters } = this.props;
    this.setState({ isLoading: true, currentPage: 0 });

    let startDate = '';
    let endDate = '';

    if (selectedDateRange.value !== undefined) {
      startDate = moment(selectedDateRange.value.from).startOf('day').format('YYYY-MM-DD HH:MM:SS');
      endDate = moment(selectedDateRange.value.to).endOf('day').format('YYYY-MM-DD HH:MM:SS');
    } else {
      startDate = moment(selectedDateRange.from).startOf('day').format('YYYY-MM-DD HH:MM:SS');
      endDate = moment(selectedDateRange.to).endOf('day').format('YYYY-MM-DD HH:MM:SS');
    }

    try {
      const fetchBehaviourSegmentsResult = await customerAnalyticsActions.fetchBehaviourSegments({ startTime: startDate, endTime: endDate }, selectedSegment.id, appliedFilters);
      // const data = Object.keys(fetchBehaviourSegmentsResult.data.Data).map((aSegment) => ({ name: aSegment, visits: parseFloat(fetchVisitsSegmentsResult.data.Data[aSegment]) })).sort((a, b) => b.visits - a.visits).map((segment) => {
      //   const delta = (Math.random() * (1 - 0) + 0).toFixed(0);
      //   return ({ name: segment.name, metrics: { visits: { value: numeral(segment.visits).format('0.0 a').toUpperCase().replace(' ', '') }, performance: { value: `${(Math.random() * (20 - 0) + 0).toFixed(1)}%`, color: delta === '1' ? '#0f9d58' : '#db4437', icon: delta === '1' ? 'arrow_upward' : 'arrow_downward' } } });
      // });
      const items = paginate(fetchBehaviourSegmentsResult.data.Data, 0, null);

      this.setState({ data:fetchBehaviourSegmentsResult.data.Data, items});
    } catch (exception) {
      EventHandler.handleException(exception);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { width, EventHandler, alertActions, demoMode } = this.props;
    const { isLoading, data, items, currentPage } = this.state;

    // const data = demoMode ? demoData: actualData;

    // const topComponent = data.length > 10 ? (<IconList list={data.slice(0, 5)} />) : null;
    // const bottomComponent = data.length > 10 ? (<IconList list={data.slice(-5)} />) : null;
    const fullComponent = (<IconList list={items} />);

    return (
      <TearedList
        isLoading={isLoading}
        title="My Segments"
        subtitle="How are my customers interacting per segment with my business?"
        // topComponent={topComponent}
        // bottomComponent={bottomComponent}
        // hiddenItems={data.length - 10}
        fullComponent={fullComponent}
        width={width}
        EventHandler={EventHandler}
        alertActions={alertActions}
        pagination={
          {
            show: Object.keys(data).length > 10,
            previous: ((currentPage * 10) + 10) > 10,
            next: ((currentPage * 10) + 10) < ((currentPage + 1 * 10) + 10)
          }
        }
        onPaginateNext={this.onPaginateNext}
        onPaginatePrevious={this.onPaginatePrevious}
      />
    );
  }
}
