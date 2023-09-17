import React, { useEffect, useState } from 'react';
import { bool, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
  Page,
  UserNav,
} from '../../components';
import { EmergencyContactForm } from '../../forms';
import { TopbarContainer } from '..';

import { isScrollingDisabled } from '../../ducks/UI.duck';
import { saveContactDetails, saveContactDetailsClear } from './EmergencyContactPage.duck';
import css from './EmergencyContactPage.module.css';

export const EmergencyContactPageComponent = props => {
  const {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    currentUser,
    currentUserListing,
    contactDetailsChanged,
    onChange,
    scrollingDisabled,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
    onSubmitContactDetails,
    intl,
  } = props;

  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  const protectedData = user?.attributes?.profile?.protectedData || {};
  const currentPhoneNumber = protectedData?.emergencyPhoneNumber || '';
  const currentName = protectedData?.emergencyContactName || '';
  const currentcountrycode = protectedData?.emergencycountrycode || '+65';

  const contactInfoForm = user?.id ? (
    <EmergencyContactForm
      className={css.form}
      initialValues={{
        emergencyContactName: currentName,
        emergencyPhoneNumber: currentPhoneNumber,
        emergencycountrycode: currentcountrycode,
      }}
      savePhoneNumberError={savePhoneNumberError}
      currentUser={user}
      onSubmit={values => onSubmitContactDetails({ ...values, currentName, currentPhoneNumber })}
      onChange={onChange}
      inProgress={saveContactDetailsInProgress}
      ready={contactDetailsChanged}
    />
  ) : null;

  const title = intl.formatMessage({ id: 'EmergencyContactPage.title' });

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
          currentTab="EmergencyContactPage"
          userProfile={true}
          currentUser={user}
          isAvatar={true}
        />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="EmergencyContactPage.title" />
            </h1>
            {contactInfoForm}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

EmergencyContactPageComponent.defaultProps = {
  saveEmailError: null,
  savePhoneNumberError: null,
  currentUser: null,
  sendVerificationEmailError: null,
};

EmergencyContactPageComponent.propTypes = {
  saveEmailError: propTypes.error,
  savePhoneNumberError: propTypes.error,
  saveContactDetailsInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserListing: propTypes.ownListing,
  contactDetailsChanged: bool.isRequired,
  onChange: func.isRequired,
  onSubmitContactDetails: func.isRequired,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const { currentUser, currentUserListing } = state.user;
  const {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    contactDetailsChanged,
  } = state.EmergencyContactPage;
  return {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    currentUser,
    currentUserListing,
    contactDetailsChanged,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmitContactDetails: values => dispatch(saveContactDetails(values)),
});

const EmergencyContactPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(EmergencyContactPageComponent);

//EmergencyContactPage.loadData = loadData;
EmergencyContactPage.loadData = () => {
  // Since verify email happens in separate tab, current user's data might be updated
  return fetchCurrentUser();
};

export default EmergencyContactPage;
