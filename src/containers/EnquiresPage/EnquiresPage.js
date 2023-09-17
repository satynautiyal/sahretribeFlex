import React from 'react';
import { bool, func } from 'prop-types';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { fetchCurrentUser, sendVerificationEmail } from '../../ducks/user.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  NotificationBadge,
  Page,
  PaginationLinks,
  IconSpinner,
} from '../../components';
import { TopbarContainer } from '..';

import { isScrollingDisabled } from '../../ducks/UI.duck';
import css from './EnquiresPage.module.css';
import { InboxItem, txState } from '../InboxPage/InboxPage';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { loadData } from './EnquiresPage.duck';
import { txIsAccepted, txIsEnquired, txIsRequested } from '../../util/transaction';
import config from '../../config';

export const EnquiresPageComponent = props => {
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
    isUpcomingSessions,
    isProSessions,
  } = props;

  const currentTransactions = transactions.filter(tx => txIsEnquired(tx));

  const ensuredCurrentUser = ensureCurrentUser(currentUser);

  const upcomingSessionsTitle = intl.formatMessage({ id: 'UpcomingSessionsPage.title' });
  const pastSessionsTitle = intl.formatMessage({
    id: isProSessions ? 'MyClientsPage.title' : 'PastSessionsPage.title',
  });

  const title = isUpcomingSessions ? upcomingSessionsTitle : pastSessionsTitle;

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

  const categoryFilter = (txs, category) =>
    txs.filter(item => item?.listing?.attributes?.publicData?.category[0] === category);

  const error = fetchOrdersOrSalesError ? (
    <p className={css.error}>
      <FormattedMessage id="InboxPage.fetchFailed" />
    </p>
  ) : null;

  const noResults =
    !fetchInProgress && currentTransactions.length === 0 && !fetchOrdersOrSalesError ? (
      <>
        <li key="noResults" className={css.noResults}>
          <FormattedMessage id={'EnquirePage.emptyEnqiures'} />
        </li>
      </>
    ) : null;

  // const noResults =
  //   !fetchInProgress && currentTransactions.length === 0 && !fetchOrdersOrSalesError ? (
  //     <li key="noResults" className={css.noResults}>
  //       <FormattedMessage id={'ProfilePage.emptyUpcomingSessions'} />
  //     </li>
  //   ) : null;

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

  const providerNotificationBadge =
    providerNotificationCount > 0 ? <NotificationBadge count={providerNotificationCount} /> : null;

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
          currentTab={'Enquiries'}
          userProfile={true}
          isAvatar={true}
          currentUser={currentUser}
          isProUser={isProSessions}
        />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id={'LayoutWrapperAccountSettingsSideNav.enquiries'} />
            </h1>
            {error}
            <ul className={css.itemList}>
              {isProSessions && (
                <>
                  {!fetchInProgress ? (
                    currentTransactions.map(toTxItem)
                  ) : (
                    <li className={css.listItemsLoading}>
                      <IconSpinner />
                    </li>
                  )}
                </>
              )}
              {!isProSessions && (
                <>
                  {!!categoryFilter(currentTransactions, 'fitness').length && (
                    <div className={css.category}>
                      <h2 className={css.subheader}>Fitness & Sports</h2>
                      <div>{categoryFilter(currentTransactions, 'fitness').map(toTxItem)}</div>
                    </div>
                  )}
                  {!!categoryFilter(currentTransactions, 'education').length && (
                    <div className={css.category}>
                      <h2 className={css.subheader}>Education & Skills</h2>
                      <div>{categoryFilter(currentTransactions, 'education').map(toTxItem)}</div>
                    </div>
                  )}
                  {!!categoryFilter(currentTransactions, 'creative').length && (
                    <div className={css.category}>
                      <h2 className={css.subheader}>Arts, Dance, & Music</h2>
                      <div>{categoryFilter(currentTransactions, 'creative').map(toTxItem)}</div>
                    </div>
                  )}
                </>
              )}
              {noResults}
            </ul>
            {pagingLinks}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

EnquiresPageComponent.defaultProps = {
  saveEmailError: null,
  savePhoneNumberError: null,
  currentUser: null,
  sendVerificationEmailError: null,
  isUpcomingSessions: true,
  isPastSessions: false,
  unitType: config.bookingUnitType,
  isProSessions: false,
};

EnquiresPageComponent.propTypes = {
  saveEmailError: propTypes.error,
  savePhoneNumberError: propTypes.error,
  currentUser: propTypes.currentUser,
  currentUserListing: propTypes.ownListing,
  scrollingDisabled: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  isUpcomingSessions: bool,
  isPastSessions: bool,
  isProSessions: bool,
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

const EnquiresPage = compose(connect(mapStateToProps), injectIntl)(EnquiresPageComponent);

EnquiresPage.loadData = loadData;

export default EnquiresPage;
