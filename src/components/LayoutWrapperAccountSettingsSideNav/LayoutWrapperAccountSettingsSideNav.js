/**
 * This is a wrapper component for different Layouts.
 * Navigational 'aside' content should be added to this wrapper.
 */
import React from 'react';
import { node, number, string, shape, bool, object } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage } from '../../util/reactIntl';
import { withViewport } from '../../util/contextHelpers';
import { LayoutWrapperSideNav } from '../../components';
import { useSelector } from 'react-redux';

const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

const scrollToTab = currentTab => {
  const el = document.querySelector(`#${currentTab}Tab`);

  // if (el) {
  //   el.scrollIntoView({
  //     block: 'end',
  //     inline: 'end',
  //     behavior: 'smooth',
  //   });
  // }
};

const LayoutWrapperAccountSettingsSideNavComponent = props => {
  //add additional prop "userProfile" to reuse this component for user profile
  //isAvatar defines if there is avatar in above the side navigation
  // isProUser defines if our side navigation for user or for trainer profile
  const { currentTab, viewport, userProfile, isAvatar, currentUser, isProUser } = props;

  let hasScrolledToTab = false;

  const { width } = viewport;
  const hasViewport = width > 0;
  const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
  const hasVerticalTabLayout = hasViewport && width > MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
  const hasFontsLoaded = hasViewport && document.documentElement.classList.contains('fontsLoaded');

  // Check if scrollToTab call is needed (tab is not visible on mobile)
  if (hasVerticalTabLayout) {
    hasScrolledToTab = true;
  } else if (hasHorizontalTabLayout && !hasScrolledToTab && hasFontsLoaded) {
    scrollToTab(currentTab);
    hasScrolledToTab = true;
  }

  const { currentUserHasListings, currentUserListingFetched } = useSelector(state => state.user);
  const isUserHasListings = !(currentUserListingFetched && !currentUserHasListings);
  const id = useSelector(state => state?.user?.currentUserListing?.id?.uuid);
  const currentUserListing = useSelector(state => state?.user?.currentUserListing);
  const userId = useSelector(state => state?.user);

  const usualUserAccountSettingTabs = [
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.contactDetailsTabTitle" />,
      selected: currentTab === 'ContactDetailsPage',
      id: 'ContactDetailsPageTab',
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.passwordTabTitle" />,
      selected: currentTab === 'PasswordChangePage',
      id: 'PasswordChangePageTab',
      linkProps: {
        name: 'PasswordChangePage',
      },
    },
  ];

  const proUserAccountSettingTabs = [
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentsTabTitle" />,
      selected: currentTab === 'StripePayoutPage',
      id: 'StripePayoutPageTab',
      linkProps: {
        name: 'StripePayoutPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentMethodsTabTitle" />,
      selected: currentTab === 'PaymentMethodsPage',
      id: 'PaymentMethodsPageTab',
      linkProps: {
        name: 'PaymentMethodsPage',
      },
    },
  ];

  //We need to show payment options only for pro users
  const accountSettingsTabs = isUserHasListings
    ? usualUserAccountSettingTabs.concat(proUserAccountSettingTabs)
    : usualUserAccountSettingTabs;

  const usualUserProfileTabs = [
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.findAPro" />,
      selected: currentTab === 'CategoriesPage',
      id: 'CategoriesPageTab',
      linkProps: {
        name: 'CategoriesPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.upcomingSessions" />,
      selected: currentTab === 'UpcomingSessionsPage',
      id: 'UpcomingSessionsPageTab',
      linkProps: {
        name: 'UpcomingSessionsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.pastSessions" />,
      selected: currentTab === 'PastSessionsPage',
      id: 'PastSessionsPageTab',
      linkProps: {
        name: 'PastSessionsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.enquiries" />,
      selected: currentTab === 'Enquiries',
      id: 'Enquiries',
      linkProps: {
        name: 'EnquiriesPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.editUserProfile" />,
      selected: currentTab === 'ProfileSettingsPage',
      id: 'ProfileSettingsPageTab',
      linkProps: {
        name: 'ProfileSettingsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.emergencyContact" />,
      selected: currentTab === 'EmergencyContactPage',
      id: 'EmergencyContactPageTab',
      linkProps: {
        name: 'EmergencyContactPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.settings" />,
      selected: currentTab === 'AccountSettingsPage',
      id: 'AccountSettingsPageTab',
      linkProps: {
        name: 'AccountSettingsPage',
      },
    },

    // {
    //   text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.passwordTabTitle" />,
    //   selected: currentTab === 'ProfilePagePage',
    //   id: 'ProfilePageTab',
    //   linkProps: {
    //     name: 'ProfilePage',
    //   },
    // },
  ];

  const proProfileTabs = [
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.upcomingSessions" />,
      selected: currentTab === 'UpcomingSessionsPage',
      id: 'ProUpcomingSessionsPageTab',
      linkProps: {
        name: 'ProUpcomingSessionsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.myClients" />,
      selected: currentTab === 'PastSessionsPage',
      id: 'ProPastSessionsPageTab',
      linkProps: {
        name: 'ProPastSessionsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.enquiries" />,
      selected: currentTab === 'Enquiries',
      id: 'Enquiries',
      linkProps: {
        name: 'EnquiriesProPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.reviews" />,
      selected: currentTab === 'ReviewsPage',
      id: 'ReviewsPageTab',
      linkProps: {
        name: 'ReviewsPage',
        userId: userId,
      },
      params: { id: userId },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.calendar" />,
      selected: currentTab === 'MyCalendarPage',
      id: 'MyCalendarPageTab',
      linkProps: {
        name: 'MyCalendarPage',
      },
      params: { id: id },
    },
    // {
    //   text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.profilePreview" />,
    //   selected: currentTab === 'EmergencyContactPage',
    //   id: 'EmergencyContactPageTab',
    //   linkProps: {
    //     name: 'EmergencyContactPage',
    //   },
    // },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.settings" />,
      selected: currentTab === 'AccountSettingsPage',
      id: 'AccountSettingsPageTab',
      linkProps: {
        name: 'AccountSettingsPage',
      },
    },
  ];

  const userProfileTabs = isProUser ? proProfileTabs : usualUserProfileTabs;

  return (
    <LayoutWrapperSideNav
      tabs={!userProfile ? accountSettingsTabs : userProfileTabs}
      isAvatar={isAvatar}
      currentUser={currentUser}
      {...props}
    />
  );
};

LayoutWrapperAccountSettingsSideNavComponent.defaultProps = {
  className: null,
  rootClassName: null,
  children: null,
  currentTab: null,
  userProfile: false,
  isAvatar: false,
  isProUser: false,
};

LayoutWrapperAccountSettingsSideNavComponent.propTypes = {
  children: node,
  className: string,
  rootClassName: string,
  currentTab: string,
  userProfile: bool,
  isAvatar: bool,
  currentUser: object,
  isProUser: bool,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,
};

const LayoutWrapperAccountSettingsSideNav = compose(withViewport)(
  LayoutWrapperAccountSettingsSideNavComponent
);

export default LayoutWrapperAccountSettingsSideNav;
