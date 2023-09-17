import React, { useEffect } from 'react';
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
  ExternalLink,
} from '../../components';
import { TopbarContainer } from '..';

import { isScrollingDisabled } from '../../ducks/UI.duck';
import css from './SessionsPage.module.css';
import { InboxItem, txState } from '../InboxPage/InboxPage';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { loadData } from './SessionsPage.duck';
import { txIsAccepted, txIsEnquired, txIsRequested } from '../../util/transaction';
import config from '../../config';
import { useHistory } from 'react-router-dom';

export const SessionsPageComponent = props => {
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
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname.includes('upcoming-sessions')) {
      localStorage.setItem('back_path', history.location.pathname);
    }
  }, []);
  const currentTransactions = isUpcomingSessions
    ? transactions.filter(tx => txIsRequested(tx) || txIsAccepted(tx))
    : transactions.filter(tx => !txIsRequested(tx) && !txIsAccepted(tx) && !txIsEnquired(tx));

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

  const error = fetchOrdersOrSalesError ? (
    <p className={css.error}>
      <FormattedMessage id="InboxPage.fetchFailed" />
    </p>
  ) : null;

  const noResults =
    !fetchInProgress && currentTransactions.length === 0 && !fetchOrdersOrSalesError ? (
      <>
        <div key="noResults" className={css.noResults}>
          {!isUpcomingSessions ? (
            <FormattedMessage
              id={
                // isUpcomingSessions
                //   ? 'ProfilePage.emptyUpcomingSessions'
                //   :
                'ProfilePage.emptyPastSessions'
              }
            />
          ) : (
            <div className={css.bookDemoContainer}>
              <h1 className={css.bookDemoHeader}>
                <FormattedMessage id="UpcomingSessionsPage.welcomeMessage" />
              </h1>
              <h2 className={css.bookDemoContent}>
                <FormattedMessage id="UpcomingSessionsPage.demoBookingMessage" />
              </h2>
              <ExternalLink
                className={css.bookDemoLink}
                href="https://calendly.com/proledteam/proled-demo"
              >
                <span className={css.helpCenter}>
                  <FormattedMessage id="UpcomingSessionsPage.demoBookingButton" />
                </span>
              </ExternalLink>
            </div>
          )}
        </div>
        {!isProSessions ? (
          <NamedLink
            name="SearchPage"
            to={{
              search: 'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873',
            }}
            className={css.searchButton}
          >
            <FormattedMessage id="ProfilePage.BookingButton" />
          </NamedLink>
        ) : null}
      </>
    ) : null;

  const noLearnerResults = category => (
    <div className={css.noResults}>
      <FormattedMessage
        id={
          isUpcomingSessions ? 'ProfilePage.emptyUpcomingSessions' : 'ProfilePage.emptyPastSessions'
        }
      />
      <NamedLink
        name="CategoriesPage"
        to={{
          search: `bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&pub_category=${category}`,
        }}
        className={css.searchButton}
      >
        <FormattedMessage id="ProfilePage.BookingButton" />
      </NamedLink>
    </div>
  );

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

  const categoryFilter = (txs, category) =>
    txs.filter(item => item?.listing?.attributes?.publicData?.category[0] === category);

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
          {/*<UserNav selectedPageName="ContactDetailsPage" listing={currentUserListing} />*/}
        </LayoutWrapperTopbar>
        {/* <AvatarLarge className={css.avatar} user={currentUser} disableProfileLink /> */}
        <LayoutWrapperAccountSettingsSideNav
          currentTab={isUpcomingSessions ? 'UpcomingSessionsPage' : 'PastSessionsPage'}
          userProfile={true}
          isAvatar={true}
          currentUser={currentUser}
          isProUser={isProSessions}
        />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage
                id={
                  isUpcomingSessions
                    ? 'UpcomingSessionsPage.header'
                    : isProSessions
                    ? 'MyClientsPage.header'
                    : 'PastSessionsPage.header'
                }
              />
            </h1>
            {error}
            {isProSessions && (
              <ul className={css.itemList}>
                {!fetchInProgress ? (
                  currentTransactions.map(toTxItem)
                ) : (
                  <li className={css.listItemsLoading}>
                    <IconSpinner />
                  </li>
                )}
                {noResults}
              </ul>
            )}
            {!isProSessions && (
              <ul className={css.itemList}>
                {!fetchInProgress ? (
                  <>
                    <div className={css.category}>
                      <h2 className={css.subheader}>Fitness & Sports</h2>
                      {!!categoryFilter(currentTransactions, 'fitness').length ? (
                        <>
                          <div>{categoryFilter(currentTransactions, 'fitness').map(toTxItem)}</div>
                        </>
                      ) : (
                        noLearnerResults('fitness')
                      )}
                    </div>
                    <div className={css.category}>
                      <h2 className={css.subheader}>Education & Skills</h2>
                      {!!categoryFilter(currentTransactions, 'education').length ? (
                        <>
                          <div>
                            {categoryFilter(currentTransactions, 'education').map(toTxItem)}
                          </div>
                        </>
                      ) : (
                        noLearnerResults('education')
                      )}
                    </div>
                    <div className={css.category}>
                      <h2 className={css.subheader}>Arts, Dance, & Music</h2>
                      {!!categoryFilter(currentTransactions, 'creative').length ? (
                        <>
                          <div>{categoryFilter(currentTransactions, 'creative').map(toTxItem)}</div>
                        </>
                      ) : (
                        noLearnerResults('creative')
                      )}
                    </div>
                  </>
                ) : (
                  <li className={css.listItemsLoading}>
                    <IconSpinner />
                  </li>
                )}
              </ul>
            )}
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

SessionsPageComponent.defaultProps = {
  saveEmailError: null,
  savePhoneNumberError: null,
  currentUser: null,
  sendVerificationEmailError: null,
  isUpcomingSessions: true,
  isPastSessions: false,
  unitType: config.bookingUnitType,
  isProSessions: false,
};

SessionsPageComponent.propTypes = {
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
    // fetchInProgress,
    // fetchOrdersOrSalesError,
    // pagination,
    transactions: getMarketplaceEntities(state, transactionRefs),
  };
};

const SessionsPage = compose(connect(mapStateToProps), injectIntl)(SessionsPageComponent);

SessionsPage.loadData = loadData;

export default SessionsPage;
