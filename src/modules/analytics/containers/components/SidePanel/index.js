/* eslint-disable jsx-a11y/href-no-hash, no-nested-ternary, object-curly-newline */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SidePanel extends Component {
  static propTypes = {
    component: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.onUpdateDimensions = this.onUpdateDimensions.bind(this);
  }

  state = {
    windowWidth: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('resize', this.onUpdateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onUpdateDimensions);
  }

  onUpdateDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  render() {
    const { component } = this.props;
    const { windowWidth } = this.state;

    return (
      <div style={{ height: '100%', transition: 'right 0.2s', width: !component ? 0 : windowWidth > 425 ? 425 : '100%', overflowY: 'auto', position: 'absolute', right: component ? 0 : windowWidth > 425 ? 0 : '-100%', top: 0, backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', zIndex: 3, overflowX: 'hidden' }}>
        {component}
      </div>
    );
  }
}
