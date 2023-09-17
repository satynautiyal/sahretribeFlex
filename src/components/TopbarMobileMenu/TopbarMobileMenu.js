/**
 *  TopbarMobileMenu prints the menu content for authenticated user or
 * shows login actions for those who are not authenticated.
 */
import React, { useState } from 'react';
import { bool, func, number, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import {
  Avatar,
  AvatarLarge,
  ExternalLink,
  InlineTextButton,
  ListingLink,
  MenuItem,
  NamedLink,
  NotificationBadge,
} from '../../components';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import css from './TopbarMobileMenu.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopbarMobileMenu = props => {
  const {
    isAuthenticated,
    currentPage,
    currentUserHasListings,
    currentUserListing,
    currentUserListingFetched,
    currentUser,
    notificationCount,
    onLogout,
  } = props;

  const user = ensureCurrentUser(currentUser);
  const [isPro, setIsPro] = useState(false);
  // const aboutUs = (
  //   <NamedLink className={css.navigationLink} name="AboutPage">
  //       <span className={css.aboutUs}>
  //         <FormattedMessage id="TopbarDesktop.aboutUsLink" />
  //       </span>
  //   </NamedLink>
  // );

  const howWorks = (
    <NamedLink className={css.navigationLink} name="HowWorksPage">
      <span className={css.howWorks}>
        <FormattedMessage id="TopbarDesktop.howWorksLink" />
      </span>
    </NamedLink>
  );
  const becomePro = (
    <NamedLink className={css.navigationLink} name="BecomeProPage">
      <FormattedMessage id="TopbarMobileMenu.becomeProLink" />
    </NamedLink>
  );
  const helpCenter = (
    <NamedLink className={css.navigationLink} name="HelpGeneralPage">
      <span className={css.helpCenter}>
        <FormattedMessage id="TopbarDesktop.helpLink" />
      </span>
    </NamedLink>
  );
  ////Learner menu start
  const learnerMenu = (
    <>
      <NamedLink className={css.navigationLink} name="CategoriesPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.findAPro" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="UpcomingSessionsPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.upcomingSessions" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="PastSessionsPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.pastSessions" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="EnquiriesPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.enquiries" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="ProfileSettingsPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.editUserProfile" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="EmergencyContactPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.emergencyContact" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="AccountSettingsPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.settings" />
        </span>
      </NamedLink>
    </>
  );

  ////Learner menu end

  ////Pro menu start
  const proMenu = (
    <>
      <NamedLink className={css.navigationLink} name="ProUpcomingSessionsPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.upcomingSessions" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="ProPastSessionsPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.myClients" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="EnquiriesProPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.enquiries" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="ReviewsPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.reviews" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="MyCalendarPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.calendar" />
        </span>
      </NamedLink>

      <NamedLink className={css.navigationLink} name="AccountSettingsPage">
        <span className={css.helpCenter}>
          <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.settings" />
        </span>
      </NamedLink>
    </>
  );

  ////Pro menu end

  const blog = (
    <ExternalLink className={css.navigationLink} href="http://blog.proled.app/">
      <span className={css.helpCenter}>
        <FormattedMessage id="TopbarDesktop.blogLink" />
      </span>
    </ExternalLink>
  );

  if (!isAuthenticated) {
    // const signup = (
    //   <NamedLink name="SignupPage" className={css.signupLink}>
    //     <FormattedMessage id="TopbarMobileMenu.signupLink" />
    //   </NamedLink>
    // );

    const login = (
      <NamedLink name="LoginPage" className={css.navigationLink}>
        <FormattedMessage id="TopbarMobileMenu.signinLink" />
      </NamedLink>
    );

    // const signupOrLogin = (
    //   <span className={css.authenticationLinks}>
    //     <FormattedMessage id="TopbarMobileMenu.signupOrLogin" values={{ signup, login }} />
    //   </span>
    // );
    return (
      <div className={css.root}>
        <div className={css.contentBasic}>
          {/* {aboutUs} */}
          {howWorks}{' '}
          <NamedLink className={css.navigationLink} name="BecomeProPage">
            <FormattedMessage id="TopbarMobileMenu.becomeProLink" />
          </NamedLink>
          {helpCenter}
          {blog}
          {login}
        </div>
        <div className={css.footer}>
          <NamedLink className={css.createNewListingLink} name="SignupPage">
            <FormattedMessage id="SignupBar.client" />
          </NamedLink>
          <hr />
        </div>
      </div>
    );
  }

  const notificationCountBadge =
    notificationCount > 0 ? (
      <NotificationBadge className={css.notificationBadge} count={notificationCount} />
    ) : null;

  const displayName = user.attributes.profile.firstName;
  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  const history = useHistory();

  const isProPath = history?.location?.pathname?.includes('/pro/');

  const handleUserManage = () => {
    setIsPro(!isPro);
  };

  return (
    <div className={css.root}>
      {/* {isAvatar && ( */}
      <div className={css.avatarContainer}>
        <div className={css.avatar}>
          <Avatar user={props.currentUser} disableProfileLink />
        </div>
        <h2 className={css.role}>{isPro ? 'Pro' : 'Learner'}</h2>
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
      {/* )} */}
      {/* <AvatarLarge className={css.avatar} user={currentUser} /> */}
      <div className={css.content}>
        <span className={css.greeting}>
          <FormattedMessage id="TopbarMobileMenu.greeting" values={{ displayName }} />
        </span>
        <br />
        {isPro ? proMenu : learnerMenu}
        {/* {aboutUs} */}
        {/* <NamedLink
          className={classNames(css.inbox)}
          name="InboxPage"
          params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
        >
          <FormattedMessage id="TopbarMobileMenu.inboxLink" />
          {notificationCountBadge}
        </NamedLink>
        {currentUserListing && (
          <NamedLink
            className={classNames(css.navigationLink, currentPageClass('ProfilePage'))}
            name="ProUpcomingSessionsPage"
            // params={{ id: user.id.uuid }}
          >
            <div>
              <FormattedMessage id="TopbarDesktop.trainerProfile" />
            </div>
          </NamedLink>
        )}
        {user.id ? (
          <NamedLink
            className={classNames(css.navigationLink, currentPageClass('ProfilePage'))}
            name="UpcomingSessionsPage"
            params={{ id: user.id.uuid }}
          >
            <FormattedMessage id="TopbarDesktop.profileSettingsLink" />
          </NamedLink>
        ) : null}
        {!currentUserListing && becomePro}
        {helpCenter}
        {blog} */}

        {/* <NamedLink
          className={classNames(css.navigationLink, currentPageClass('AccountSettingsPage'))}
          name="AccountSettingsPage"
        >
          <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
        </NamedLink> */}
      </div>
      <div className={css.footer}>
        <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
          <FormattedMessage id="TopbarMobileMenu.logoutLink" />
        </InlineTextButton>
      </div>
    </div>
  );
};

TopbarMobileMenu.defaultProps = {
  currentUser: null,
  notificationCount: 0,
  currentPage: null,
  currentUserListing: null,
  currentUserListingFetched: false,
};

TopbarMobileMenu.propTypes = {
  isAuthenticated: bool.isRequired,
  currentUserHasListings: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  currentUser: propTypes.currentUser,
  currentPage: string,
  notificationCount: number,
  onLogout: func.isRequired,
};

export default TopbarMobileMenu;
