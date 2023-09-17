import React, { useEffect, useState } from 'react';
import { arrayOf, bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { getDefaultTimeZoneOnBrowser, resetToStartOfDay, timestampToDate } from '../../util/dates';
import { LISTING_STATE_DRAFT, DATE_TYPE_DATETIME, propTypes } from '../../util/types';
import {
  Button,
  IconClose,
  IconEdit,
  IconSpinner,
  InlineTextButton,
  ListingLink,
  Modal,
  TimeRange,
  Footnote,
  LayoutSideNavigation,
  LayoutWrapperTopbar,
  Page,
  Footer,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  EditListingAvailabilityPanel,

  ////
  ////
} from '../../components';
import { EditListingAvailabilityPlanForm, EditListingAvailabilityExceptionForm } from '../../forms';
import moment from 'moment';

import css from './MyCalendarPage.module.css';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  fetchAvailabilityExceptionsRequest,
  //loadData,
  requestAddAvailabilityException,
  requestDeleteAvailabilityException,
  requestFetchAvailabilityExceptions,
  requestUpdateListing,
} from './MyCalendarPage.duck';
import { loadData } from './MyCalendarPage.duck';
//import { loadData } from '../SessionsPage/SessionsPage.duck';
import { AVAILABILITY } from '../../components/EditListingWizard/EditListingWizardTab';
import { findRouteByRouteName } from '../../util/routes';
// import { SET_INITIAL_VALUES } from '../ListingPage/ListingPage.duck';

const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// We want to sort exceptions on the client-side, maximum pagination page size is 100,
// so we need to restrict the amount of exceptions to that.
const MAX_EXCEPTIONS_COUNT = 100;

const defaultTimeZone = () =>
  typeof window !== 'undefined' ? getDefaultTimeZoneOnBrowser() : 'Etc/UTC';

/////////////
// Weekday //
/////////////
const findEntry = (availabilityPlan, dayOfWeek) =>
  availabilityPlan.entries.find(d => d.dayOfWeek === dayOfWeek);

const getEntries = (availabilityPlan, dayOfWeek) =>
  availabilityPlan.entries.filter(d => d.dayOfWeek === dayOfWeek);

const Weekday = props => {
  const { availabilityPlan, dayOfWeek, openEditModal } = props;
  const hasEntry = findEntry(availabilityPlan, dayOfWeek);

  return (
    <div
      className={classNames(css.weekDay, { [css.blockedWeekDay]: !hasEntry })}
      onClick={() => openEditModal(true)}
      role="button"
    >
      <div className={css.dayOfWeek}>
        <FormattedMessage id={`EditListingAvailabilityPanel.dayOfWeek.${dayOfWeek}`} />
      </div>
      <div className={css.entries}>
        {availabilityPlan && hasEntry
          ? getEntries(availabilityPlan, dayOfWeek).map(e => {
              return (
                <span className={css.entry} key={`${e.dayOfWeek}${e.startTime}`}>{`${moment(
                  e.startTime,
                  'hh'
                ).format('LT')} - ${moment(e.endTime, 'hh').format('LT')}`}</span>
              );
            })
          : null}
      </div>
    </div>
  );
};

///////////////////////////////////////////////////
// EditListingAvailabilityExceptionPanel - utils //
///////////////////////////////////////////////////

// Create initial entry mapping for form's initial values
const createEntryDayGroups = (entries = {}) =>
  entries.reduce((groupedEntries, entry) => {
    const { startTime, endTime: endHour, dayOfWeek } = entry;
    const dayGroup = groupedEntries[dayOfWeek] || [];
    return {
      ...groupedEntries,
      [dayOfWeek]: [
        ...dayGroup,
        {
          startTime,
          endTime: endHour === '00:00' ? '24:00' : endHour,
        },
      ],
    };
  }, {});

// Create initial values
///
const createInitialValues = availabilityPlan => {
  const { timezone, entries } = availabilityPlan || {};
  const tz = timezone || defaultTimeZone();
  return {
    timezone: tz,
    ...createEntryDayGroups(entries),
  };
};

// Create entries from submit values
const createEntriesFromSubmitValues = values =>
  WEEKDAYS.reduce((allEntries, dayOfWeek) => {
    const dayValues = values[dayOfWeek] || [];
    const dayEntries = dayValues.map(dayValue => {
      const { startTime, endTime } = dayValue;
      // Note: This template doesn't support seats yet.
      return startTime && endTime
        ? {
            dayOfWeek,
            seats: 1,
            startTime,
            endTime: endTime === '24:00' ? '00:00' : endTime,
          }
        : null;
    });

    return allEntries.concat(dayEntries.filter(e => !!e));
  }, []);

// Create availabilityPlan from submit values
const createAvailabilityPlan = values => ({
  availabilityPlan: {
    type: 'availability-plan/time',
    timezone: values.timezone,
    entries: createEntriesFromSubmitValues(values),
  },
});

// Ensure that the AvailabilityExceptions are in sensible order.
//
// Note: if you allow fetching more than 100 exception,
// pagination kicks in and that makes client-side sorting impossible.
const sortExceptionsByStartTime = (a, b) => {
  return a.attributes.start.getTime() - b.attributes.start.getTime();
};

//////////////////////////////////
// EditListingAvailabilityPanel //
//////////////////////////////////
const MyCalendarPageComponent = props => {
  const {
    className,
    rootClassName,
    listing,
    availabilityExceptions,
    fetchExceptionsInProgress,
    onAddAvailabilityException,
    onDeleteAvailabilityException,
    disabled,
    ready,
    //onSubmit,
    // onManageDisableScrolling,
    onNextTab,
    submitButtonText,
    // updateInProgress,
    errors,
    currentUser,
    onUpdateListing,
    callSetInitialValues,
    //currentUser,
    currentUserHasListings,
    currentUserListing,
    currentUserListingFetched,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onRequestFetchAvailabilityExceptions,
    params,
  } = props;

  const onManageDisableScrolling = () => null;
  const updateInProgress = false;

  // Hooks
  const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false);
  const [isEditExceptionsModalOpen, setIsEditExceptionsModalOpen] = useState(false);
  const [valuesFromLastSubmit, setValuesFromLastSubmit] = useState(null);

  //const { availabilityExceptions } = state?.MyCalendarPage

  const classes = classNames(rootClassName || css.root, className);
  //const currentListing = useSelector(state => state.user.currentUserListing);
  const currentListing = currentUserListing;
  useEffect(() => {
    const tz = currentUserListing?.attributes?.availabilityPlan?.timezone;
    if (tz) {
      const today = new Date();
      const start = resetToStartOfDay(today, tz, 0);
      // Query range: today + 364 days
      const exceptionRange = 364;
      const end = resetToStartOfDay(today, tz, exceptionRange);

      // NOTE: in this template, we don't expect more than 100 exceptions.
      // If there are more exceptions, pagination kicks in and we can't use frontend sorting.
      const params = {
        listingId: currentUserListing?.id?.uuid,
        start,
        end,
      };
      onRequestFetchAvailabilityExceptions(params);
    }
  }, [currentUserListing]);

  const isNextButtonDisabled = !currentListing?.attributes?.availabilityPlan;
  const isPublished =
    currentListing?.id && currentListing?.attributes?.state !== LISTING_STATE_DRAFT;
  const defaultAvailabilityPlan = {
    type: 'availability-plan/time',
    timezone: defaultTimeZone(),
    entries: [
      // { dayOfWeek: 'mon', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'tue', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'wed', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'thu', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'fri', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'sat', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'sun', startTime: '09:00', endTime: '17:00', seats: 1 },
    ],
  };

  //const availabilityPlan = currentListing?.attributes?.availabilityPlan || defaultAvailabilityPlan;

  const [availabilityPlan, setAvailabilityPlan] = useState(
    currentListing?.attributes?.availabilityPlan || defaultAvailabilityPlan
  );

  const initialValues = valuesFromLastSubmit
    ? valuesFromLastSubmit
    : createInitialValues(availabilityPlan);
  ////
  const handleSubmit = values => {
    setValuesFromLastSubmit(values);

    // Final Form can wait for Promises to return.
    return onSubmit(createAvailabilityPlan(values))
      .then(data => {
        setAvailabilityPlan(createAvailabilityPlan(values).availabilityPlan);
        setIsEditPlanModalOpen(false);
      })
      .catch(e => {
        // Don't close modal if there was an error
      });
  };

  // // Customize checkout page state with current listing and selected bookingDates
  // const { setInitialValues } = findRouteByRouteName('CheckoutPage', routes);
  // callSetInitialValues(setInitialValues, initialValues);
  const [exceptions, setExceptions] = useState(availabilityExceptions);
  const [exceptionCount, setExceptionCount] = useState(0);
  const [sortedAvailabilityExceptions, setSortedAvailabilityExceptions] = useState([]);
  useEffect(() => {
    setExceptions(availabilityExceptions.sort(sortExceptionsByStartTime));
    setExceptionCount(availabilityExceptions.length);
  }, [availabilityExceptions, currentListing?.attributes?.availabilityPlan]);
  //const exceptionCount = exc.length ? exc.length.length : 0;
  //const sortedAvailabilityExceptions = exc.sort(sortExceptionsByStartTime);

  useEffect(() => {
    setAvailabilityPlan(currentListing?.attributes?.availabilityPlan || defaultAvailabilityPlan);
  }, [currentListing?.attributes?.availabilityPlan]);

  // Save exception click handler
  const saveException = values => {
    const { availability, exceptionStartTime, exceptionEndTime } = values;

    // TODO: add proper seat handling
    const seats = availability === 'available' ? 1 : 0;

    return onAddAvailabilityException({
      listingId: currentListing?.id,
      seats,
      start: timestampToDate(exceptionStartTime),
      end: timestampToDate(exceptionEndTime),
    })
      .then(() => {
        setIsEditExceptionsModalOpen(false);
      })
      .catch(e => {
        // Don't close modal if there was an error
      });
  };

  const fetchException = params => {
    requestFetchAvailabilityExceptions(params).then();
  };

  const onCompleteEditListingWizardTab = (
    tab = AVAILABILITY,
    updateValues,
    passThrownErrors = false
  ) => {
    // Normalize images for API call
    const { images: updatedImages, ...otherValues } = updateValues;
    const updateValuesWithImages = { ...otherValues };
    return onUpdateListing(tab, {
      ...updateValuesWithImages,
      id: currentListing?.id?.uuid,
    });
  };

  const onSubmit = values => {
    // We want to return the Promise to the form,
    // so that it doesn't close its modal if an error is thrown.
    return onCompleteEditListingWizardTab(AVAILABILITY, values, true);
  };
  const myCalendarForm = (
    <main className={classes}>
      <section className={css.section}>
        <header className={css.sectionHeader}>
          <h2 className={css.sectionTitle}>
            <FormattedMessage id="EditListingAvailabilityPanel.defaultScheduleTitle" />
          </h2>
          <InlineTextButton
            className={css.editPlanButton}
            onClick={() => setIsEditPlanModalOpen(true)}
          >
            <IconEdit className={css.editPlanIcon} />{' '}
            <FormattedMessage id="EditListingAvailabilityPanel.edit" />
          </InlineTextButton>
        </header>
        <div className={css.week}>
          {WEEKDAYS.map(w => (
            <Weekday
              dayOfWeek={w}
              key={w}
              availabilityPlan={availabilityPlan}
              openEditModal={setIsEditPlanModalOpen}
            />
          ))}
        </div>
      </section>
      <section className={css.section}>
        <header className={css.sectionHeader}>
          <h2 className={css.sectionTitle}>
            {fetchExceptionsInProgress ? (
              <FormattedMessage id="EditListingAvailabilityPanel.availabilityExceptionsTitleNoCount" />
            ) : (
              <FormattedMessage
                id="EditListingAvailabilityPanel.availabilityExceptionsTitle"
                values={{ count: exceptionCount }}
              />
            )}
          </h2>
        </header>
        {fetchExceptionsInProgress ? (
          <div className={css.exceptionsLoading}>
            <IconSpinner />
          </div>
        ) : exceptionCount === 0 ? (
          <div className={css.noExceptions}>
            <FormattedMessage id="EditListingAvailabilityPanel.noExceptions" />
          </div>
        ) : (
          <div className={css.exceptions}>
            {exceptions.map(availabilityException => {
              const { start, end, seats } = availabilityException.attributes;
              return (
                <div key={availabilityException.id.uuid} className={css.exception}>
                  <div className={css.exceptionHeader}>
                    <div className={css.exceptionAvailability}>
                      <div
                        className={classNames(css.exceptionAvailabilityDot, {
                          [css.isAvailable]: seats > 0,
                        })}
                      />
                      <div className={css.exceptionAvailabilityStatus}>
                        {seats > 0 ? (
                          <FormattedMessage id="EditListingAvailabilityPanel.exceptionAvailable" />
                        ) : (
                          <FormattedMessage id="EditListingAvailabilityPanel.exceptionNotAvailable" />
                        )}
                      </div>
                    </div>
                    <button
                      className={css.removeExceptionButton}
                      onClick={() =>
                        onDeleteAvailabilityException({ id: availabilityException.id })
                      }
                    >
                      <IconClose size="normal" className={css.removeIcon} />
                    </button>
                  </div>
                  <TimeRange
                    className={css.timeRange}
                    startDate={start}
                    endDate={end}
                    dateType={DATE_TYPE_DATETIME}
                    timeZone={availabilityPlan.timezone}
                  />
                </div>
              );
            })}
          </div>
        )}
        {exceptionCount <= MAX_EXCEPTIONS_COUNT ? (
          <InlineTextButton
            className={css.addExceptionButton}
            onClick={() => setIsEditExceptionsModalOpen(true)}
            disabled={disabled}
            ready={ready}
          >
            <FormattedMessage id="EditListingAvailabilityPanel.addException" />
          </InlineTextButton>
        ) : null}
      </section>

      {/* {errors.showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingAvailabilityPanel.showListingFailed" />
        </p>
      ) : null} */}

      {onManageDisableScrolling ? (
        <Modal
          id="EditAvailabilityPlan"
          isOpen={isEditPlanModalOpen}
          onClose={() => setIsEditPlanModalOpen(false)}
          onManageDisableScrolling={onManageDisableScrolling}
          containerClassName={css.modalContainer}
          usePortal
        >
          <EditListingAvailabilityPlanForm
            formId="EditListingAvailabilityPlanForm"
            listingTitle={currentListing?.attributes?.title}
            availabilityPlan={availabilityPlan}
            weekdays={WEEKDAYS}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            inProgress={updateInProgress}
            fetchErrors={errors}
          />
        </Modal>
      ) : null}
      {onManageDisableScrolling ? (
        <Modal
          id="EditAvailabilityExceptions"
          isOpen={isEditExceptionsModalOpen}
          onClose={() => setIsEditExceptionsModalOpen(false)}
          onManageDisableScrolling={onManageDisableScrolling}
          containerClassName={css.modalContainer}
          usePortal
        >
          <EditListingAvailabilityExceptionForm
            formId="EditListingAvailabilityExceptionForm"
            onSubmit={saveException}
            timeZone={availabilityPlan.timezone}
            availabilityExceptions={exceptions}
            updateInProgress={updateInProgress}
            fetchErrors={errors}
          />
        </Modal>
      ) : null}
    </main>
  );

  const title = 'My calendar';
  const scrollingDisabled = false;

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="EmergencyContactPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          {/*<UserNav selectedPageName="ContactDetailsPage" listing={currentUserListing} />*/}
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav
          currentTab="MyCalendarPage"
          currentUser={currentUser}
          isAvatar={true}
          isProUser={true}
          userProfile={true}
        />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="MyCalendarPage.title" />
            </h1>
            {myCalendarForm}
            {/* <EditListingAvailabilityPanel errors={{}} onManageDisableScrolling={() => null} on /> */}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

MyCalendarPageComponent.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
  availabilityExceptions: [],
};

MyCalendarPageComponent.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  availabilityExceptions: arrayOf(propTypes.availabilityException),
  fetchExceptionsInProgress: bool.isRequired,
  onAddAvailabilityException: func.isRequired,
  onDeleteAvailabilityException: func.isRequired,
  onSubmit: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onNextTab: func.isRequired,
  submitButtonText: string.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    currentUser,
    currentUserHasListings,
    currentUserListing,
    currentUserListingFetched,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;

  const { availabilityExceptions } = state?.MyCalendarPage;
  return {
    currentUser,
    currentUserHasListings,
    currentUserListing,
    currentUserListingFetched,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    availabilityExceptions,
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateListing: (tab, values) => dispatch(requestUpdateListing(tab, values)),
  callSetInitialValues: (setInitialValues, values) => dispatch(setInitialValues(values)),
  onAddAvailabilityException: params => dispatch(requestAddAvailabilityException(params)),
  onRequestFetchAvailabilityExceptions: params =>
    dispatch(requestFetchAvailabilityExceptions(params)),
  onDeleteAvailabilityException: params => dispatch(requestDeleteAvailabilityException(params)),
});

const MyCalendarPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(MyCalendarPageComponent);
MyCalendarPage.loadData = loadData;

export default MyCalendarPage;
