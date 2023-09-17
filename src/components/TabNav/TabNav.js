import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Avatar,
  // AvatarLarge,
  // AvatarMedium,
  InlineTextButton,
  ListingLink,
  MenuContent,
  MenuItem,
  NamedLink,
} from '../../components';
import config from '../../config';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import css from './TabNav.module.css';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { hasCurrentUserErrors } from '../../ducks/user.duck';
import { pathByRouteName } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
const Tab = props => {
  const { className, id, disabled, text, selected, linkProps, onLogout, history } = props;
  const linkClasses = classNames(css.link, {
    [css.selectedLink]: selected,
    [css.disabled]: disabled,
  });

  return (
    <div id={id} className={className}>
      {linkProps.listing ? (
        <ListingLink
          listing={linkProps.listing}
          listingFetched={linkProps.currentUserListingFetched}
          className={linkClasses}
        >
          {linkProps.tabText}
        </ListingLink>
      ) : (
        <NamedLink className={linkClasses} {...linkProps}>
          {text}
        </NamedLink>
      )}
    </div>
  );
};

Tab.defaultProps = { className: null, disabled: false, selected: false };

const { arrayOf, bool, node, object, string } = PropTypes;

Tab.propTypes = {
  id: string.isRequired,
  className: string,
  text: node.isRequired,
  disabled: bool,
  selected: bool,
  linkProps: object.isRequired,
};

const TabNavComponent = props => {
  const { className, rootClassName, tabRootClassName, tabs, isAvatar, onLogout } = props;
  const classes = classNames(rootClassName || css.root, className);
  const tabClasses = tabRootClassName || css.tab;

  const logoutClasses = classNames(css.link, css.logout);

  const history = useHistory();

  const isProPath = history?.location?.pathname?.includes('/pro/');
  const handleUserManage = () => {
    if (isProPath) {
      history.push('/listings');
    } else {
      history.push('/pro/upcoming-sessions');
    }
  };

  const handleLogout = () => {
    onLogout().then(() => {
      const path = pathByRouteName('LandingPage', routeConfiguration());

      // In production we ensure that data is really lost,
      // but in development mode we use stored values for debugging
      if (config.dev) {
        history.push(path);
      } else if (typeof window !== 'undefined') {
        window.location = path;
      }

      console.log('logged out'); // eslint-disable-line
    });
  };

  const { currentUserListing, currentUserListingFetched } = useSelector(state => state.user);
  return (
    <>
      {isAvatar && (
        <div className={css.avatarContainer}>
          <div className={css.avatar}>
            <Avatar user={props.currentUser} disableProfileLink />
          </div>
          <h2 className={css.role}>{isProPath ? 'Pro' : 'Learner'}</h2>
          <div className={css.navigationContainer}>
            <div className={css.upButton} onClick={handleUserManage}>
              <FontAwesomeIcon icon={faChevronUp} className={css.buttonIcon} />
            </div>
            <div className={css.downButton} onClick={handleUserManage}>
              <FontAwesomeIcon icon={faChevronDown} className={css.buttonIcon} />
            </div>
          </div>
          {/* <MenuContent className={css.profileMenuContent}>
            <MenuItem key="logout">
              <InlineTextButton
                rootClassName={css.logoutButton}
                // onClick={onLogout}
                // const mapDispatchToProps = dispatch => ({
                //   onLogout: historyPush => dispatch(logout(historyPush)),
                // const TopbarContainer = compose(
                //   withRouter,
                //   connect(mapStateToProps, mapDispatchToProps)
                // )(TopbarContainerComponent);
              >
                <span className={css.menuItemBorder} />
                <FormattedMessage id="TopbarDesktop.logout" />
              </InlineTextButton>
            </MenuItem>
          </MenuContent> */}
        </div>
      )}
      <nav className={classes}>
        {tabs.map((tab, index) => {
          const id = typeof tab.id === 'string' ? tab.id : `${index}`;
          return <Tab key={id} id={id} className={tabClasses} {...tab} />;
        })}
        {/* <ListingLink
          listing={currentUserListing}
          listingFetched={currentUserListingFetched}
          className={css.navigationLink}
        >
          Preview Profile
        </ListingLink> */}
        <div onClick={handleLogout} className={logoutClasses}>
          Log out
        </div>
      </nav>
    </>
  );
};

TabNavComponent.defaultProps = {
  className: null,
  rootClassName: null,
  tabRootClassName: null,
  tabClassName: null,
};

TabNavComponent.propTypes = {
  className: string,
  rootClassName: string,
  tabRootClassName: string,
  tabs: arrayOf(object).isRequired,
};
const mapStateToProps = state => {
  // Topbar needs isAuthenticated
  const { isAuthenticated, logoutError, authScopes } = state.Auth;
  const hasGenericError = !!(logoutError || hasCurrentUserErrors(state));
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
});

const TabNav = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(TabNavComponent);

export default TabNav;
