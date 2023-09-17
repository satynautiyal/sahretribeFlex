import React, { useState, useEffect } from 'react';
import { bool, func, object, number, string } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import {
  Avatar,
  InlineTextButton,
  Logo,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
  ListingLink,
  ExternalLink,
} from '../../components';
import { TopbarSearchForm } from '../../forms';

import css from './TopbarDesktop.module.css';

const TopbarDesktop = props => {
  const {
    className,
    currentUser,
    currentPage,
    rootClassName,
    currentUserHasListings,
    currentUserListing,
    currentUserListingFetched,
    notificationCount,
    intl,
    isAuthenticated,
    onLogout,
    onSearchSubmit,
    initialSearchFormValues,
    location,
  } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;

  const classes = classNames(rootClassName || css.root, className);

  const user = ensureCurrentUser(currentUser);

  const search = (
    <TopbarSearchForm
      className={css.searchLink}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
    />
  );

  // const aboutUs = (
  //   <NamedLink className={css.aboutUsLink} name="AboutPage">
  //       <span className={css.aboutUs}>
  //         <FormattedMessage id="TopbarDesktop.aboutUsLink" />
  //       </span>
  //   </NamedLink>
  // );

  const howWorks = (
    <NamedLink className={css.howWorksLink} name="HowWorksPage">
      <span className={css.howWorks}>
        <FormattedMessage id="TopbarDesktop.howWorksLink" />
      </span>
    </NamedLink>
  );

  const helpCenter = (
    <NamedLink className={css.helpCenterLink} name="HelpGeneralPage">
      <span className={css.helpCenter}>
        <FormattedMessage id="TopbarDesktop.helpLink" />
      </span>
    </NamedLink>
  );

  const blog = (
    <ExternalLink className={css.helpCenterLink} href="http://blog.proled.app/">
      <span className={css.helpCenter}>
        <FormattedMessage id="TopbarDesktop.blogLink" />
      </span>
    </ExternalLink>
  );

  const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

  const inboxLink = authenticatedOnClientSide ? (
    <NamedLink
      className={css.inboxLink}
      name="InboxPage"
      params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
    >
      <span className={css.inbox}>
        <FormattedMessage id="TopbarDesktop.inbox" />
        {notificationDot}
      </span>
    </NamedLink>
  ) : null;

  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  const isUserHasListings =
    isAuthenticatedOrJustHydrated && !(currentUserListingFetched && !currentUserListing);
  const createListingLink = isUserHasListings ? null : (
    <NamedLink className={css.createListingLink} name="BecomeProPage">
      <span className={css.createListing}>
        <FormattedMessage id="TopbarDesktop.becomeProLink" />
      </span>
    </NamedLink>
  );

  const profileMenu = authenticatedOnClientSide ? (
    <Menu>
      <MenuLabel className={css.profileMenuLabel} isOpenClassName={css.profileMenuIsOpen}>
        <Avatar className={css.avatar} user={currentUser} disableProfileLink />
      </MenuLabel>
      <MenuContent className={css.profileMenuContent}>
        <MenuItem key="ProUpcomingSessionsPage">
          <NamedLink
            className={classNames(css.profileSettingsLink, currentPageClass('ProfilePage'))}
            name="ProUpcomingSessionsPage"
            // params={{ id: user.id.uuid }}
          >
            <div>
              <span className={css.menuItemBorder} />
              {currentUserListing ? <FormattedMessage id="TopbarDesktop.trainerProfile" /> : null}
            </div>
          </NamedLink>
        </MenuItem>
        <MenuItem key="ProfileSettingsPage">
          {user.id ? (
            <NamedLink
              className={classNames(css.profileSettingsLink, currentPageClass('ProfilePage'))}
              name="UpcomingSessionsPage"
              // params={{ id: user.id.uuid }}
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.profileSettingsLink" />
            </NamedLink>
          ) : null}
        </MenuItem>
        <MenuItem key="ReferralPage">
          <NamedLink
            className={classNames(css.profileSettingsLink, currentPageClass('ProfilePage'))}
            name="ReferralPage"
          >
            <div>
              <span className={css.menuItemBorder} />
              <FormattedMessage id="Earn SGD 10" />
            </div>
          </NamedLink>
        </MenuItem>

        {isUserHasListings ? (
          <MenuItem key="BecomeProPage" />
        ) : (
          <MenuItem key="BecomeProPage">
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('AccountSettingsPage'))}
              name="BecomeProPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="Become A Pro" />
            </NamedLink>
          </MenuItem>
        )}

        {/* <MenuItem key="AccountSettingsPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('AccountSettingsPage'))}
            name="AccountSettingsPage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
          </NamedLink>
        </MenuItem> */}
        <MenuItem key="logout">
          <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.logout" />
          </InlineTextButton>
        </MenuItem>
      </MenuContent>
    </Menu>
  ) : null;

  const signupLink = isAuthenticatedOrJustHydrated ? null : (
    <NamedLink name="LoginPage" className={css.signupLink}>
      <span className={css.signup}>
        <FormattedMessage id="TopbarDesktop.signin" />
      </span>
    </NamedLink>
  );

  const joinLink = isAuthenticatedOrJustHydrated ? null : (
    <div className={css.joinLinkContainer}>
      <NamedLink name="SignupPage" className={css.joinLink}>
        <FormattedMessage id="TopbarDesktop.join" />
      </NamedLink>
    </div>
  );

  return !isAuthenticated ? (
    <nav className={classes}>
      <NamedLink className={css.logoLink} name="LandingPage">
        <Logo
          format="desktop"
          className={css.logo}
          alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
        />
      </NamedLink>
      {location.pathname !== '/' && search}
      <div className={css.placeholder}></div>
      {/* {aboutUs} */}
      {howWorks}

      {!user?.id && createListingLink}
      {helpCenter}
      {blog}
      {inboxLink}
      {profileMenu}
      {signupLink}
      {joinLink}
    </nav>
  ) : null;
};

TopbarDesktop.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  currentPage: null,
  notificationCount: 0,
  initialSearchFormValues: {},
  currentUserListing: null,
  currentUserListingFetched: false,
};

TopbarDesktop.propTypes = {
  rootClassName: string,
  className: string,
  currentUserHasListings: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  currentUser: propTypes.currentUser,
  currentPage: string,
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  notificationCount: number,
  onSearchSubmit: func.isRequired,
  initialSearchFormValues: object,
  intl: intlShape.isRequired,
};

export default TopbarDesktop;
