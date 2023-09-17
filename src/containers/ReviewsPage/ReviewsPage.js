import React, { useEffect } from 'react';
import { bool, func } from 'prop-types';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
//import { fetchCurrentUser, sendVerificationEmail } from '../../ducks/user.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  UserNav,
  Avatar,
  BookingTimeInfo,
  NamedLink,
  NotificationBadge,
  Page,
  PaginationLinks,
  TabNav,
  LayoutWrapperSideNav,
  IconSpinner,
  UserDisplayName,
  AvatarLarge,
  Reviews,
} from '../../components';
import { TopbarContainer } from '..';

import { isScrollingDisabled } from '../../ducks/UI.duck';
import css from './ReviewsPage.module.css';
import { InboxItem, txState } from '../InboxPage/InboxPage';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { loadData } from './ReviewsPage.duck';
import config from '../../config';
import { queryUserReviews } from '../ProfilePage/ProfilePage.duck';

export const ReviewsPageComponent = props => {
  const {
    currentUser,
    scrollingDisabled,
    intl,
    unitType,
    fetchInProgress,
    fetchOrdersOrSalesError,
    pagination,
    params,
    providerNotificationCount,
    transactions,
    isProSessions,
  } = props;

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const dispatch = useDispatch();

  const title = 'Reviews';

  useEffect(() => {
    dispatch(loadData(currentUser?.id?.uuid));
  }, [currentUser?.id?.uuid]);

  const reviews = useSelector(state => state.ReviewsPage.reviews);

  const toTxItem = tx => {
    const type = isProSessions ? 'sales' : 'order';
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

  const noResults = (
    //!fetchInProgress && currentTransactions.length === 0 && !fetchOrdersOrSalesError ?
    <p key="noResults" className={css.noResults}>
      <FormattedMessage id={'You currently have no reviews.'} />
    </p>
  );
  // : null;

  const hasOrderTransactions = (tx, user) => {
    return !isProSessions
      ? user.id && tx && tx.length > 0 && tx[0].customer.id.uuid === user.id.uuid
      : user.id && tx && tx.length > 0 && tx[0].provider.id.uuid === user.id.uuid;
  };
  const hasTransactions =
    !fetchInProgress && hasOrderTransactions(transactions, ensuredCurrentUser);
  const pagingLinks =
    hasTransactions && pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="InboxPage"
        pagePathParams={params}
        pagination={pagination}
      />
    ) : null;

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="ContactDetailsPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav
          currentTab={'ReviewsPage'}
          userProfile={true}
          isAvatar={true}
          currentUser={currentUser}
          isProUser={isProSessions}
        />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id={'Reviews'} />
            </h1>
            {error}
            {!!reviews.length ? <Reviews reviews={reviews} /> : noResults}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

ReviewsPageComponent.defaultProps = {
  saveEmailError: null,
  savePhoneNumberError: null,
  currentUser: null,
  sendVerificationEmailError: null,
  isUpcomingSessions: true,
  isPastSessions: false,
  unitType: config.bookingUnitType,
  isProSessions: false,
};

ReviewsPageComponent.propTypes = {
  saveEmailError: propTypes.error,
  savePhoneNumberError: propTypes.error,
  currentUser: propTypes.currentUser,
  currentUserListing: propTypes.ownListing,
  scrollingDisabled: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  isUpcomingSessions: bool,
  isPastSessions: bool,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    currentUser,
    currentUserListing,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  const { fetchInProgress, fetchOrdersOrSalesError, pagination, transactionRefs } = state.InboxPage;
  const {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    contactDetailsChanged,
  } = state.ContactDetailsPage;
  return {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    currentUser,
    currentUserListing,
    contactDetailsChanged,
    scrollingDisabled: isScrollingDisabled(state),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    transactions: getMarketplaceEntities(state, transactionRefs),
  };
};

const ReviewsPage = compose(connect(mapStateToProps), injectIntl)(ReviewsPageComponent);

export default ReviewsPage;
