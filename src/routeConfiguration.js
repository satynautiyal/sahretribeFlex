import React from 'react';
import loadable from '@loadable/component';
import getPageDataLoadingAPI from './containers/pageDataLoadingAPI';
import { NotFoundPage } from './containers';
import PreviewResolverPage from './containers/PreviewResolverPage/PreviewResolverPage';

// routeConfiguration needs to initialize containers first
// Otherwise, components will import form container eventually and
// at that point css bundling / imports will happen in wrong order.
import { NamedRedirect } from './components';

const pageDataLoadingAPI = getPageDataLoadingAPI();

const AuthenticationPage = loadable(() => import(/* webpackChunkName: "AuthenticationPage" */ './containers/AuthenticationPage/AuthenticationPage'));
const LandingPage = loadable(() =>
  import(/* webpackChunkName: "LandingPage" */ './containers/LandingPage/LandingPage')
);
const ReferralPage = loadable(() =>
  import(/* webpackChunkName: "ReferralPage" */ './containers/ReferralPage/ReferralPage')
);
const CheckoutPage = loadable(() =>
  import(/* webpackChunkName: "CheckoutPage" */ './containers/CheckoutPage/CheckoutPage')
);
const ListingPage = loadable(() =>
  import(/* webpackChunkName: "ListingPage" */ './containers/ListingPage/ListingPage')
);
const HowWorksPage = loadable(() =>
  import(/* webpackChunkName: "HowWorksPage" */ './containers/HowWorksPage/HowWorksPage')
);
const BecomeProPage = loadable(() =>
  import(/* webpackChunkName: "BecomeProPage" */ './containers/BecomeProPage/BecomeProPage')
);
const InboxPage = loadable(() => import(/* webpackChunkName: "InboxPage" */ './containers/InboxPage/InboxPage'));
const SearchPage = loadable(() => import(/* webpackChunkName: "SearchPage" */ /* webpackPrefetch: true */  './containers/SearchPage/SearchPage'));
const CategoriesPage = loadable(() => import(/* webpackChunkName: "CategoriesPage" */ /* webpackPrefetch: true */  './containers/CategoriesPage/CategoriesPage'));


import {
  AccessibilityPage,
  ContactDetailsPage,
  EditListingPage,
  EmailVerificationPage,
  HelpGeneralPage,
  HelpClientPage,
  HelpTrainerPage,
  PasswordChangePage,
  PasswordRecoveryPage,
  PasswordResetPage,
  StripePayoutPage,
  PaymentMethodsPage,
  PrivacyPolicyPage,
  ProfileSettingsPage,
  StyleguidePage,
  TermsOfServicePage,
  TransactionPage,
  ProfilePage,
  SessionsPage,
  EnquiresPage,
  EmergencyContactPage,
  MyCalendarPage,
  ReviewsPage,
} from './containers';

export const ACCOUNT_SETTINGS_PAGES = [
  'ContactDetailsPage',
  'PasswordChangePage',
  'StripePayoutPage',
  'PaymentMethodsPage',
];

// https://en.wikipedia.org/wiki/Universally_unique_identifier#Nil_UUID
const draftId = '00000000-0000-0000-0000-000000000000';
const draftSlug = 'draft';

const RedirectToLandingPage = () => <NamedRedirect name="LandingPage" />;

// NOTE: Most server-side endpoints are prefixed with /api. Requests to those
// endpoints are indended to be handled in the server instead of the browser and
// they will not render the application. So remember to avoid routes starting
// with /api and if you encounter clashing routes see server/index.js if there's
// a conflicting route defined there.

// Our routes are exact by default.
// See behaviour from Routes.js where Route is created.
//

const routeConfiguration = () => {

  const DownloadFile = () => {
    // Replace 'your_file_url' with the actual URL of the file you want to download
    const fileUrl = '/static/apple-developer-merchantid-domain-association';
    useEffect(() => {
      document.getElementById('download_file').click();
    }, []);
    
    return (
      <div>
        <h1>Download File</h1>
        <p>Click the link below to download the file:</p>
        <a id="download_file" href={fileUrl} download>
          Download File
        </a>
      </div>
    );
  };

  return [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    loadData: pageDataLoadingAPI.LandingPage.loadData,
    },
    {
      path: '/.well-known/apple-developer-merchantid-domain-association',
      name: 'DownloadFile',
      component: DownloadFile,
    },
    {
      path: '/.well-knownss/apple-developer-merchantid-domain-association',
      name: 'DownloadFile',
      component: DownloadFile,
    },

    // {
    //   path: '/about-us',
    //   name: 'AboutPage',
    //   component: AboutPage,
    // },
    {
      path: '/accessibility',
      name: 'AccessibilityPage',
      component: props => <AccessibilityPage {...props} />,
    },
    {
      path: '/become-a-pro',
      // auth: true,
      name: 'BecomeProPage',
      component: BecomeProPage,
    },
    {
      path: '/how-it-works',
      name: 'HowWorksPage',
      component: HowWorksPage,
    },
    {
      path: '/help-center',
      name: 'HelpGeneralPage',
      component: props => <HelpGeneralPage {...props} />,
    },
    {
      path: '/help-center-client',
      name: 'HelpClientPage',
      component: props => <HelpClientPage {...props} />,
    },
    {
      path: '/help-center-trainer',
      name: 'HelpTrainerPage',
      component: props => <HelpTrainerPage {...props} />,
    },
    {
      path: '/s',
      name: 'SearchPage',
      component: SearchPage,
      loadData: pageDataLoadingAPI.SearchPage.loadData,
    },
    {
      path: '/listings',
      name: 'CategoriesPage',
      component: CategoriesPage,
      loadData: pageDataLoadingAPI.SearchPage.loadData,
    },
    
    // {
    //   path: '/s/filters',
    //   name: 'SearchFiltersPage',
    //   component: props => <SearchPage {...props} tab="filters" />,
    //   loadData: pageDataLoadingAPI.SearchPage.loadData,
    // },
    // {
    //   path: '/s/listings',
    //   name: 'SearchListingsPage',
    //   component: props => <SearchPage {...props} tab="listings" />,
    //   loadData: pageDataLoadingAPI.SearchPage.loadData,
    // },
    // {
    //   path: '/s/map',
    //   name: 'SearchMapPage',
    //   component: props => <SearchPage {...props} tab="map" />,
    //   loadData: SearchPage.loadData,
    // },
    {
      path: '/l',
      name: 'ListingBasePage',
      component: RedirectToLandingPage,
    },
    // {
    //   path: '/l/:slug/:id',
    //   name: 'ListingPage',
    //   component: props => <ListingPage {...props} />,
    //   loadData: ListingPage.loadData,
    // },



    {
      path: '/l/:slug/:id/checkout',
      name: 'CheckoutPage',
      auth: true,
      component: CheckoutPage,
      setInitialValues:  pageDataLoadingAPI.CheckoutPage.setInitialValues,
    },
    {
      path: '/l/:slug/:id/:variant',
      name: 'ListingPageVariant',
      auth: true,
      authPage: 'LoginPage',
      component: ListingPage,
      loadData: pageDataLoadingAPI.ListingPage.loadData,
    },
    {
      path: '/l/new',
      name: 'NewListingPage',
      auth: true,
      component: () => (
        <NamedRedirect
          name="EditListingPage"
          params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description' }}
        />
      ),
    },
    {
      path: '/l/:slug/:id/:type/:tab',
      name: 'EditListingPage',
      auth: true,
      component: props => <EditListingPage {...props} allowOnlyOneListing />,
      loadData: EditListingPage.loadData,
    },
    {
      path: '/l/:slug/:id/:type/:tab/:returnURLType',
      name: 'EditListingStripeOnboardingPage',
      auth: true,
      component: props => <EditListingPage {...props} />,
      loadData: EditListingPage.loadData,
    },

    // Canonical path should be after the `/l/new` path since they
    // conflict and `new` is not a valid listing UUID.
    {
      path: '/l/:id',
      name: 'ListingPageCanonical',
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/u',
      name: 'ProfileBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/u/upcoming-sessions',
      name: 'UpcomingSessionsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <SessionsPage {...props} isUpcomingSessions={true} />,
      loadData: SessionsPage.loadData,
      //
    },

    {
      path: '/u/past-sessions',
      name: 'PastSessionsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <SessionsPage {...props} isUpcomingSessions={false} />,
      loadData: SessionsPage.loadData,
      //
    },

    {
      path: '/u/emergency-contact',
      name: 'EmergencyContactPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <EmergencyContactPage {...props} />,
      // loadData: SessionsPage.loadData,
      //
    },

    // {
    //   path: '/u',
    //   name: 'ProfileBasePage',
    //   // component: props => <ProfilePage {...props} />,
    //   // loadData: ProfilePage.loadData,
    //   component: props => (
    //     <NamedRedirect name="ProfilePage" {...props} params={{ tab: 'orders' }} />
    //   ),
    //   // params={{ tab: 'sales' }}
    //   ///
    // },
    {
      path: '/u/enquiries',
      name: 'EnquiriesPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => (
        <EnquiresPage {...props} isProSessions={false} isUpcomingSessions={false} />
      ),
      loadData: params => EnquiresPage.loadData({ ...params, isProSessions: false }),
    },
    {
      path: '/u/:id',
      name: 'ProfilePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ProfilePage {...props} />,
      loadData: ProfilePage.loadData,
    },
    {
      path: '/pro/upcoming-sessions',
      name: 'ProUpcomingSessionsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => (
        <SessionsPage {...props} isUpcomingSessions={true} isProSessions={true} />
      ),
      loadData: params => SessionsPage.loadData({ ...params, isProSessions: true }),
    },
    {
      path: '/pro/past-sessions',
      name: 'ProPastSessionsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => (
        <SessionsPage {...props} isProSessions={true} isUpcomingSessions={false} />
      ),
      loadData: params => SessionsPage.loadData({ ...params, isProSessions: true }),
    },
    {
      path: '/pro/enquiries',
      name: 'EnquiriesProPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => (
        <EnquiresPage {...props} isProSessions={true} isUpcomingSessions={false} />
      ),
      loadData: params => EnquiresPage.loadData({ ...params, isProSessions: true }),
    },
    {
      path: '/pro/my-calendar',
      name: 'MyCalendarPage',
      // auth: true,
      // authPage: 'LoginPage',
      component: props => <MyCalendarPage {...props} isProSessions={true} isProUser={true} />,
      loadData: MyCalendarPage.loadData,
      //params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description' }}
      // component: props => (
      //   <NamedRedirect name="MyCalendarPage" {...props} params={{ ...props.params, id: draftId }} />
      // ),
      // component: props => (
      //   <SessionsPage {...props} isUpcomingSessions={true} isProSessions={true} />
      // ),
      //loadData: params => MyCalendarPage.loadData({ ...params, isProSessions: true }),
    },
    {
      path: '/pro/reviews',
      name: 'ReviewsPage',
      component: props => <ReviewsPage {...props} isProUser={true} isProSessions={true} />,
      //loadData: ReviewsPage.loadData,
    },
    {
      path: '/pro/:slug/:id',
      name: 'ListingPage',
      component: ListingPage,
      loadData: pageDataLoadingAPI.ListingPage.loadData,
    },
    {
      path: '/profile-settings',
      name: 'ProfileSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ProfileSettingsPage {...props} />,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: AuthenticationPage,
      extraProps: { tab: 'login' },
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: AuthenticationPage,
      extraProps: { tab: 'signup' },
      // loadData: pageDataLoadingAPI.AuthenticationPage.loadData,
    },
    {
      path: '/recover-password',
      name: 'PasswordRecoveryPage',
      component: props => <PasswordRecoveryPage {...props} />,
    },
    {
      path: '/inbox',
      name: 'InboxBasePage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />,
      //
    },
    {
      path: '/inbox/:tab',
      name: 'InboxPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <InboxPage {...props} />,
      loadData: pageDataLoadingAPI.loadData,
    },
    {
      path: '/order/:id',
      name: 'OrderPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="OrderDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/order/:id/details',
      name: 'OrderDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <TransactionPage {...props} transactionRole="customer" />,
      loadData: params => TransactionPage.loadData({ ...params, transactionRole: 'customer' }),
      setInitialValues: TransactionPage.setInitialValues,
    },
    {
      path: '/sale/:id',
      name: 'SalePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="SaleDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/sale/:id/details',
      name: 'SaleDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <TransactionPage {...props} transactionRole="provider" />,
      loadData: params => TransactionPage.loadData({ ...params, transactionRole: 'provider' }),
    },
    {
      path: '/account',
      name: 'AccountSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="ContactDetailsPage" />,
    },
    {
      path: '/account/contact-details',
      name: 'ContactDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ContactDetailsPage {...props} />,
      loadData: ContactDetailsPage.loadData,
    },
    {
      path: '/account/change-password',
      name: 'PasswordChangePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <PasswordChangePage {...props} />,
    },
    {
      path: '/account/payments',
      name: 'StripePayoutPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <StripePayoutPage {...props} />,
      loadData: StripePayoutPage.loadData,
    },
    {
      path: '/account/payments/:returnURLType',
      name: 'StripePayoutOnboardingPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <StripePayoutPage {...props} />,
      loadData: StripePayoutPage.loadData,
    },
    {
      path: '/account/payment-methods',
      name: 'PaymentMethodsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <PaymentMethodsPage {...props} />,
      loadData: PaymentMethodsPage.loadData,
    },
    {
      path: '/terms-of-use',
      name: 'TermsOfServicePage',
      component: props => <TermsOfServicePage {...props} />,
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicyPage',
      component: props => <PrivacyPolicyPage {...props} />,
    },
    {
      path: '/styleguide',
      name: 'Styleguide',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/g/:group',
      name: 'StyleguideGroup',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component',
      name: 'StyleguideComponent',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example',
      name: 'StyleguideComponentExample',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example/raw',
      name: 'StyleguideComponentExampleRaw',
      component: props => <StyleguidePage raw {...props} />,
    },
    {
      path: '/notfound',
      name: 'NotFoundPage',
      component: props => <NotFoundPage {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /reset-password endpoint
    {
      path: '/reset-password',
      name: 'PasswordResetPage',
      component: props => <PasswordResetPage {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /verify-email endpoint
    {
      path: '/verify-email',
      name: 'EmailVerificationPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <EmailVerificationPage {...props} />,
      loadData: EmailVerificationPage.loadData,
    },
    {
      path: '/referral',
      name: 'ReferralPage',
      auth: true,
      authPage: 'LoginPage',
      // component: props => <ReferralPage {...props} />,
      component: ReferralPage,
      // loadData: ReferralPage.loadData,
    },

        // Do not change this path!
    //
    // The API expects that the application implements /preview endpoint
    // {
    //   path: '/preview',
    //   name: 'PreviewResolverPage',
    //   component: PreviewResolverPage ,
    // },
  ];
};

export default routeConfiguration;
