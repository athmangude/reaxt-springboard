
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import Switch from 'react-switch';

import AppInstallButton from './AppInstallButton';

import * as AppActions from 'Modules/voc/containers/App/flux/actions';

import HelpMenuLauncher from './HelpMenuLauncher';

import SideNavigationLink from './SideNavigationLink';

import sideBarLinks from './SideBarLinks';

import themes from 'SharedComponents/themes';
const { primaryColor, lightPrimaryColor } = themes.light;

const SideNavigation = (props, context) => {
  const {
    windowWidth, activeApp, action, app, location, configurations, onToggleDemoMode,
  } = props;

  function onInstallButtonClicked() {
    window.deferredInstallPrompt.prompt();

    window.deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      window.deferredInstallPrompt = null;
      // AppActions.setBeforeInstallPromptFire(false);
    });
  }

  if (windowWidth > 768 && activeApp.fullWidthMenu) {
    console.log();
    // return a large menu on large screens
    return (
      <div
        style={{
          width: 'calc(100% - 10px)', display: 'flex', flexDirection: 'column', padding: props.action ? 0 : '10px 0',
        }}
      >
        {
          props.action ? (
            <div
              style={{
                display: 'flex', alingItems: 'center', justifyContent: 'center', padding: '10px 0',
              }}
            >
              {action('large')}
            </div>
          ) : null
        }
        {
          location.pathname.indexOf('settings') > -1 ? (
            <SideNavigationLink sideBarLink={sideBarLinks.find((linksGroup) => linksGroup.app === 'settings')} />
          ) : (
            <div>
              {
                sideBarLinks.map((sidebarLink) => {
                  if (sidebarLink.app === 'settings') {
                    return null;
                  } else if(sidebarLink.app === 'customers' && !configurations.features.customerAnalytics) {
                    return null;
                  }else if (sidebarLink.app === 'analytics' && !configurations.features.customerAnalytics) {
                    return null;
                  }
                  return (<SideNavigationLink authentication={props.authentication} sideBarLink={sidebarLink} />);
                })
              }
              {/* {
                configurations.features.customerAnalytics ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'absolute', bottom: 70, left: 20 }}>
                    <Switch
                      checked={configurations.demoMode}
                      onChange={onToggleDemoMode}
                      onColor={lightPrimaryColor}
                      onHandleColor={primaryColor}
                      handleDiameter={15}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={10}
                      width={24}
                      className="react-switch"
                      id="material-switch"
                    />
                    <span>&nbsp;&nbsp;</span>
                    <span style={{ textTransform: 'capitalize' }}>
                      Demo Mode
                    </span>
                  </div>
                ) : null
              } */}
              {
                app.hasBeforeInstallPromptBeenFired && !(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) ? (
                  <AppInstallButton onInstallButtonClicked={onInstallButtonClicked} />
                ) : null
              }
            </div>
          )
        }
        {
          // sideBarLinks.find((linkGroup) => linkGroup.app === 'settings').map((sideBarLink) => (
          //   <SideNavigationLink sideBarLink={sideBarLink} />
          // ))
        }
        {
          // sideBarLinks.map((sideBarLink) => (
          //   <SideNavigationLink sideBarLink={sideBarLink} />
          // ))
        }
        <HelpMenuLauncher />
      </div>
    );
  }

  // otherwise return a small menu on smaller screens
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {
        action ? (
          <div
            style={{
              display: 'flex', alingItems: 'center', justifyContent: 'center', padding: '10px 0',
            }}
          >
            {action('small')}
          </div>
        ) : null
      }
      {
        sideBarLinks.map((sidebarLink) => {
          if (sidebarLink.app === 'settings') {
            return null;
          } else if (sidebarLink.app === 'analytics' && !configurations.features.customerAnalytics) {
            return null;
          }
          return (
            <Link
              to={sidebarLink.paths[0]}
              className={classNames('side-navigation-link', { active: !!sidebarLink.paths.find((path) => (context.router.route.match.path.substring(1).includes(path.substring(1)) && path.substring(1).length) || (path === '/' && context.router.route.match.path === '/')) })}
              style={{
                color: '#000000de', padding: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <i className="material-icons" style={{ fontSize: 20, margin: 0 }}>{sidebarLink.icon}</i>
            </Link>
          );
        })
      }
    </div>
  );
};

SideNavigation.contextTypes = {
  router: PropTypes.object.isRequired,
};

SideNavigation.propTypes = {
  action: PropTypes.func,
  windowWidth: PropTypes.number.isRequired,
  activeApp: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  configurations: PropTypes.object,
  onToggleDemoMode: PropTypes.func,
  authentication: PropTypes.object,
};

export default connect((state) => ({ app: state.app, route: state.route }), (dispatch) => ({
  AppActions: bindActionCreators(AppActions, dispatch),
}))(withRouter(SideNavigation));
