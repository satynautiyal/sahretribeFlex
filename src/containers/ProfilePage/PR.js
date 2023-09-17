import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { types as sdkTypes } from '../../util/sdkLoader';
import { REVIEW_TYPE_OF_PROVIDER, REVIEW_TYPE_OF_CUSTOMER, propTypes } from '../../util/types';
import { ensureCurrentUser, ensureUser } from '../../util/data';
import { withViewport } from '../../util/contextHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  AvatarLarge,
  NamedLink,
  Reviews,
  ButtonTabNavHorizontal,
  PaginationLinks,
  IconSpinner,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';
import { loadData as inboxLoadData } from '../InboxPage/InboxPage.duck';
import { loadData } from './ProfilePage.duck';
import config from '../../config';
//import { loadData } from '../InboxPage/InboxPage.duck';

import css from './ProfilePage.css';
import { InboxItem, txState } from '../InboxPage/InboxPage';
import { txIsAccepted, txIsRequested } from '../../util/transaction';

const { UUID } = sdkTypes;
const MAX_MOBILE_SCREEN_WIDTH = 768;
const UPCOMING_SESSIONS = 'upcoming';
const PAST_SESSIONS = 'past';

export const ProfilePageComponent = props => {
  const {
    scrollingDisabled,
    currentUser,
    user,
    userShowError,
    reviews,
    queryReviewsError,
    viewport,
    intl,
    // inboxData,
    fetchInProgress,
    fetchOrdersOrSalesError,
    pagination,
    transactions,
    unitType,
    params,
  } = props;

  const dispatch = useDispatch();
  dispatch(inboxLoadData({ tab: 'orders' }));

  const [showReviewsType, setShowReviewsType] = useState(REVIEW_TYPE_OF_PROVIDER);

  const [myData, setMyData] = useState(null);
  const [tab1, setTab1] = useState(UPCOMING_SESSIONS);
  const [currentTsx, setCurrentTsx] = useState([]);

  const showPastSessionsHandler = tsx => {
    setTab1(PAST_SESSIONS);
    setCurrentTsx(tsx);
  };

  const showUpcomingSessionsHandler = tsx => {
    setTab1(UPCOMING_SESSIONS);
    setCurrentTsx(tsx);
  };

  const showOfCustomerReviewsHandler = () => {
    setShowReviewsType(REVIEW_TYPE_OF_CUSTOMER);
  };

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const profileUser = ensureUser(user);
  const isCurrentUser =
    ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
  const displayName = profileUser.attributes.profile.displayName;
  const bio = profileUser.attributes.profile.bio;
  const hasBio = !!bio;
  const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;

  const upcomingTransactions = transactions.filter(tx => txIsRequested(tx) || txIsAccepted(tx));
  const pastTransactions = transactions.filter(tx => !txIsRequested(tx) && !txIsAccepted(tx));
  // const editLinkMobile = isCurrentUser ? (
  //   <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
  //     <FormattedMessage id="ProfilePage.editProfileLinkMobile" />
  //   </NamedLink>
  // ) : null;
  // const editLinkDesktop = isCurrentUser ? (
  //   <NamedLink className={css.editLinkDesktop} name="ProfileSettingsPage">
  //     <FormattedMessage id="ProfilePage.editProfileLinkDesktop" />
  //   </NamedLink>
  // ) : null;
  const pastSessionLinkMobile = isCurrentUser ? (
    <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
      <FormattedMessage id="ProfilePage.editProfileLinkPastSession" />
    </NamedLink>
  ) : null;
  const upcomingSessionLinkMobile = isCurrentUser ? (
    <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
      <FormattedMessage id="ProfilePage.editProfileLinkUpcomingSession" />
    </NamedLink>
  ) : null;

  const pastSessionLinkDesktop = isCurrentUser ? (
    <div
      onClick={() => {
        showPastSessionsHandler(pastTransactions);
      }}
    >
      Past sessions
    </div>
  ) : null;

  const upcomingSessionLinkDesktop = isCurrentUser ? (
    <div onClick={() => showUpcomingSessionsHandler(upcomingTransactions)}>Upcoming sessions</div>
  ) : null;

  const asideContent = (
    <div className={css.asideContent}>
      <AvatarLarge className={css.avatar} user={user} disableProfileLink />
      <h1 className={css.mobileHeading}>
        {displayName ? (
          <FormattedMessage id="ProfilePage.mobileHeading" values={{ name: displayName }} />
        ) : null}
      </h1>
      {upcomingSessionLinkMobile}
      {pastSessionLinkMobile}
      {upcomingSessionLinkDesktop}
      {pastSessionLinkDesktop}
    </div>
  );

  const reviewsError = (
    <p className={css.error}>
      <FormattedMessage id="ProfilePage.loadingReviewsFailed" />
    </p>
  );

  const reviewsOfProvider = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_PROVIDER);

  const reviewsOfCustomer = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_CUSTOMER);

  const mobileReviews = (
    <div className={css.mobileReviews}>
      <h2 className={css.mobileReviewsTitle}>
        <FormattedMessage
          id="ProfilePage.reviewsOfProviderTitle"
          values={{ count: reviewsOfProvider.length }}
        />
      </h2>
      {queryReviewsError ? reviewsError : null}
      <Reviews reviews={reviewsOfProvider} />
      <h2 className={css.mobileReviewsTitle}>
        <FormattedMessage
          id="ProfilePage.reviewsOfCustomerTitle"
          values={{ count: reviewsOfCustomer.length }}
        />
      </h2>
      {queryReviewsError ? reviewsError : null}
      <Reviews reviews={reviewsOfCustomer} />
    </div>
  );

  //   const desktopReviewTabs = [
  //     {
  //       text: (
  //         <h3 className={css.desktopReviewsTitle}>
  //           <FormattedMessage
  //             id="ProfilePage.reviewsOfProviderTitle"
  //             values={{ count: reviewsOfProvider.length }}
  //           />
  //         </h3>
  //       ),
  //       selected: showReviewsType === REVIEW_TYPE_OF_PROVIDER,
  //       //   onClick: this.showOfProviderReviews,
  //     },
  //     {
  //       text: (
  //         <h3 className={css.desktopReviewsTitle}>
  //           <FormattedMessage
  //             id="ProfilePage.reviewsOfCustomerTitle"
  //             values={{ count: reviewsOfCustomer.length }}
  //           />
  //         </h3>
  //       ),
  //       selected: showReviewsType === REVIEW_TYPE_OF_CUSTOMER,
  //       onClick: showOfCustomerReviewsHandler,
  //     },
  //   ];

  //   const desktopReviews = (
  //     <div className={css.desktopReviews}>
  //       <ButtonTabNavHorizontal className={css.desktopReviewsTabNav} tabs={desktopReviewTabs} />

  //       {queryReviewsError ? reviewsError : null}

  //       {showReviewsType === REVIEW_TYPE_OF_PROVIDER ? (
  //         <Reviews reviews={reviewsOfProvider} />
  //       ) : (
  //         <Reviews reviews={reviewsOfCustomer} />
  //       )}
  //     </div>
  //   );

  ///////////////////////////////////////////
  ////////////////////////////////////////////////
  //////////////////////////////////////////////////
  const tab = 'orders';
  ///const ensuredCurrentUser = ensureCurrentUser(currentUser);

  const validTab = tab === 'orders' || tab === 'sales';
  if (!validTab) {
    return <NotFoundPage />;
  }

  const isOrders = tab === 'orders';

  const ordersTitle = intl.formatMessage({ id: 'InboxPage.ordersTitle' });
  const salesTitle = intl.formatMessage({ id: 'InboxPage.salesTitle' });
  const title = isOrders ? ordersTitle : salesTitle;

  const toTxItem = tx => {
    const type = isOrders ? 'order' : 'sale';
    const stateData = txState(intl, tx, type);

    // Render InboxItem only if the latest transition of the transaction is handled in the `txState` function.
    return stateData ? (
      <li key={tx.id.uuid} className={css.listItem}>
        <InboxItem unitType={unitType} type={type} tx={tx} intl={intl} stateData={stateData} />
      </li>
    ) : null;
  };

  const error = fetchOrdersOrSalesError ? (
    <p className={css.error}>
      <FormattedMessage id="InboxPage.fetchFailed" />
    </p>
  ) : null;

  const noResults =
    !fetchInProgress && transactions.length === 0 && !fetchOrdersOrSalesError ? (
      <li key="noResults" className={css.noResults}>
        <FormattedMessage id={isOrders ? 'InboxPage.noOrdersFound' : 'InboxPage.noSalesFound'} />
      </li>
    ) : null;

  const hasOrderOrSaleTransactions = (tx, isOrdersTab, user) => {
    return isOrdersTab
      ? user.id && tx && tx.length > 0 && tx[0].customer.id.uuid === user.id.uuid
      : user.id && tx && tx.length > 0 && tx[0].provider.id.uuid === user.id.uuid;
  };

  const hasTransactions =
    !fetchInProgress && hasOrderOrSaleTransactions(transactions, isOrders, ensuredCurrentUser);

  const pagingLinks =
    hasTransactions && pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="InboxPage"
        pagePathParams={params}
        pagination={pagination}
      />
    ) : null;

  const mainContent = (
    <div>
      <h1 className={css.desktopHeading}>
        <FormattedMessage id="ProfilePage.desktopHeading" values={{ name: displayName }} />
      </h1>
      {hasBio ? <p className={css.bio}>{bio}</p> : null}

      {/* {isMobileLayout ? mobileReviews : desktopReviews} */}
      {error}
      <ul className={css.itemList}>
        {!fetchInProgress ? (
          currentTsx.map(toTxItem)
        ) : (
          <li className={css.listItemsLoading}>
            <IconSpinner />
          </li>
        )}
        {noResults}
      </ul>
      {pagingLinks}
    </div>
  );

  let content;

  if (userShowError && userShowError.status === 404) {
    return <NotFoundPage />;
  } else if (userShowError) {
    content = (
      <p className={css.error}>
        <FormattedMessage id="ProfilePage.loadingDataFailed" />
      </p>
    );
  } else {
    content = mainContent;
  }

  const schemaTitle = intl.formatMessage(
    {
      id: 'ProfilePage.schemaTitle',
    },
    {
      name: displayName,
      siteTitle: config.siteTitle,
    }
  );

  return (
    <Page
      scrollingDisabled={scrollingDisabled}
      title={schemaTitle}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ProfilePage',
        name: schemaTitle,
      }}
    >
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="ProfilePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav className={css.aside}>{asideContent}</LayoutWrapperSideNav>
        <LayoutWrapperMain>{content}</LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
  //   }
};

ProfilePageComponent.defaultProps = {
  currentUser: null,
  user: null,
  userShowError: null,
  reviews: [],
  queryReviewsError: null,
  unitType: config.bookingUnitType,
};

const { bool, arrayOf, number, shape } = PropTypes;

ProfilePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUser: propTypes.currentUser,
  user: propTypes.user,
  userShowError: propTypes.error,
  reviews: arrayOf(propTypes.review),
  queryReviewsError: propTypes.error,

  // form withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const { userId, userShowError, reviews, queryReviewsError } = state.ProfilePage;
  const { fetchInProgress, fetchOrdersOrSalesError, pagination, transactionRefs } = state.InboxPage;
  // = state.TransactionPage
  //transactionRefs

  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    user,
    userShowError,
    reviews,
    queryReviewsError,
    fetchInProgress,
    fetchOrdersOrSalesError,
    pagination,
    transactions: getMarketplaceEntities(state, transactionRefs),
  };
};

const ProfilePage = compose(
  connect(mapStateToProps),
  withViewport,
  injectIntl
)(ProfilePageComponent);

ProfilePage.loadData = params => {
  const id = new UUID(params.id);
  return loadData(id);
};

export default ProfilePage;
