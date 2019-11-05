import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'SharedComponents/icon-button';
import { stringToHexColor, extractInitials } from 'Utils/UtilFunctions';

export default class Collaborator extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    collaborator: PropTypes.object,
    loggedInUserRole: PropTypes.object,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  state = {
    isMouseOver: false,
  }

  onMouseEnter() {
    this.setState({ isMouseOver: true });
  }

  onMouseLeave() {
    this.setState({ isMouseOver: false });
  }

  onView(collaborator) {
    const { onView } = this.props;
    onView(collaborator);
  }

  onEdit(collaborator) {
    const { onEdit } = this.props;
    onEdit(collaborator);
  }

  render() {
    const { collaborator, loggedInUserRole } = this.props;
    const { isMouseOver } = this.state;
    const colorMix = stringToHexColor(`${collaborator.firstName} ${collaborator.lastName}`);
    return (
      <div role="button" tabIndex={0} className="account-list-item" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={{ width: '100%', borderBottom: 'solid 1px #d9d9d9', padding: '10px 10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative', cursor: 'pointer', backgroundColor: this.state.isMouseOver ? 'rgba(0, 0, 0, 0.03)' : 'transparent' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
          <div style={{ margin: '0 10px', height: 40, width: 40, borderRadius: 20, backgroundColor: colorMix.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colorMix.color }}>{extractInitials(`${collaborator.firstName} ${collaborator.lastName}`)}</div>
          <span>
            {collaborator.firstName}
            &nbsp;
            {collaborator.lastName}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
          <span>{collaborator.email}</span>
        </div>
        {
          isMouseOver ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', position: 'absolute', right: 0, top: 0, height: '100%', backgroundColor: 'rgba(255, 255, 255, 1)', padding: '0 10px' }}>
              <IconButton onClick={() => this.onView(collaborator)} icon="visibility" style={{ margin: 0, padding: 6 }} />
              {
                !loggedInUserRole || loggedInUserRole.name !== 'ADMIN'
                  ? null : (
                    <IconButton onClick={() => this.onEdit(collaborator)} icon="edit" style={{ margin: 0, padding: 6 }} />
                  )
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}
