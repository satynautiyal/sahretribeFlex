import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT, propTypes } from '../../util/types';
import config from '../../config';
import { Button, Form, FieldTextInput, FieldCheckbox, NamedLink } from '../../components';
import { required, composeValidators } from '../../util/validators';
import { compose } from 'redux';

import css from './EditListingReviewAndSubmitForm.module.css';
import { ensureListing, ensureOwnListing } from '../../util/data';

import {
  convertMoneyToNumber,
  ensureDotSeparator,
  ensureSeparator,
  truncateToSubUnitPrecision,
  unitDivisor,
} from '../../util/currency';
import { useSelector } from 'react-redux';
import SectionMapMaybe from '../../containers/ListingPage/SectionMapMaybe';

const EditListingReviewAndSubmitFormComponent = props => {
  const stripeConnectId = useSelector(state => state.stripeConnectAccount?.stripeAccount?.id?.uuid);
  const currentListing = ensureListing(props.listing);
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;

  return (
    <FinalForm
      {...props}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const {
          disabled,
          ready,
          intl,
          rootClassName,
          className,
          name,
          handleSubmit,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          fetchErrors,
          filterConfig,
          listing,
          values,
        } = formRenderProps;

        const currentListing = ensureOwnListing(listing);
        const {
          description,
          title,
          publicData,
          privateData,
          price,
          availabilityPlan,
          geolocation,
        } = currentListing.attributes;

        const classes = classNames(rootClassName || css.root, className);
        const submitReady = (updated && pristine) || ready;
        const submitInProgress = updateInProgress;
        const listingId = currentListing?.id?.uuid;
        const submitDisabled = disabled || submitInProgress;

        const { updateListingError, showListingsError } = fetchErrors || {};
        const errorMessage = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingSubmitApplicationForm.updateFailed" />
          </p>
        ) : null;

        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingSubmitApplicationForm.showListingFailed" />
          </p>
        ) : null;

        const isInfoCorrectLabel = intl.formatMessage({
          id: 'EditListingSubmitApplicationForm.isInfoCorrectLabel',
        });

        const consentPayThroughProleadLabel = intl.formatMessage({
          id: 'EditListingSubmitApplicationForm.consentPayThroughProleadLabel',
        });

        const consentProleadsPolicyLabel = intl.formatMessage({
          id: 'EditListingSubmitApplicationForm.consentProleadsPolicy',
        });

        const consentAgreementLabel = (
          <FormattedMessage
            id="EditListingReviewAndSubmitApplicationForm.agreement"
            values={{
              termsAndConditionsLinkText: (
                <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                  Terms of Use
                </NamedLink>
              ),
              privacyPolicyLinkText: (
                <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                  Privacy Policy
                </NamedLink>
              ),
            }}
          />
        );

        //fix this
        const initialValue = price.amount.toString();
        const last2 = initialValue.slice(-2);
        const firstPart = initialValue.slice(0, -2);
        const priceString = `${firstPart}.${last2}`;
        /////

        const consentGrantProleadLicenseLabel = intl.formatMessage({
          id: 'EditListingSubmitApplicationForm.consentGrantProleadLicenseLabel',
        });

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {errorMessage}
            {errorMessageShowListing}

            <div className={classes}>
              {stripeConnectId && !isPublished ? (
                <>
                  <p>Please click "Submit" button to complete your registration.</p>
                  <div className={css.submitButtonContainer}>
                    <Button
                      className={css.submitButton}
                      type="submit"
                      inProgress={submitInProgress}
                      disabled={submitDisabled}
                      ready={submitReady}
                    >
                      {saveActionMsg}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className={css.questionBlock}>
                    <p className={css.question}>
                      {' '}
                      <FormattedMessage id="EditListingDescriptionForm.title" />:
                    </p>
                    <p className={css.answer}>{title || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>Your gender:</p>
                    <p className={css.answer}>{publicData?.gender || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>Are you a Singaporean or PR?</p>
                    <p className={css.answer}>{publicData?.usCitizen || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>Are you legally allowed to work in Singapore?</p>
                    <p className={css.answer}>{publicData?.allowedToWork || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>Have you ever been convicted of a crime?</p>
                    <p className={css.answer}>{publicData?.convicted || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>How did you hear about PROLED?</p>
                    <p className={css.answer}>{privateData?.hearedAbout || '-'}</p>
                  </div>
                  {/* <div className={css.questionBlock}>
                <p className={css.question}>What are your specializations?</p>
                <p className={css.answer}>{publicData?.specializations?.join(', ') || '-'}</p>
              </div> */}
                  <div className={css.questionBlock}>
                    <p className={css.question}>Introduce yourself!</p>
                    <p className={css.answer}>{publicData?.about || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>What category are you coaching in?</p>
                    <p className={css.answer}>{publicData?.category || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>Choose your activity</p>
                    <p className={css.answer}>
                      {/* Here we get rid of "other" in showing results and replace it with "creativeOther", "fitnessOther" or "educationOther" */}
                      {publicData?.activity
                        ?.map(activityItem => {
                          if (
                            activityItem === 'other' &&
                            publicData[`${publicData?.category}Other`]
                          ) {
                            return publicData[`${publicData?.category}Other`].toLowerCase();
                          }
                          return activityItem;
                        })
                        .join(', ') || '-'}
                    </p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>What age groups do you specialise in?</p>
                    <p className={css.answer}>{publicData?.ageCategory.join(', ') || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>
                      <FormattedMessage id="EditListingPoliciesForm.rulesLabel" />
                    </p>
                    <p className={css.answer}>{publicData?.rules || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>What will learners achieve from your session?</p>
                    <p className={css.answer}>{publicData?.achieve || '-'}</p>
                  </div>
                  {/* <div className={css.questionBlock}>
                <p className={css.question}>
                  What area is most convenient for you to host a training session?
                </p>
                <p className={css.answer}>{publicData?.convenientArea || '-'}</p>
              </div> */}
                  <div className={css.questionBlock}>
                    <p className={css.question}>
                      Are you willing to travel to accommodate a client?
                    </p>
                    <p className={css.answer}>{publicData?.travelWilling || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>
                      What locations are most convenient for you to host a session?{' '}
                    </p>
                    <p className={css.answer}>{publicData?.location?.address || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>Apt, suite, building # (optional)</p>
                    <p className={css.answer}>{publicData?.location?.building || '-'}</p>
                    {geolocation?.lat && (
                      <SectionMapMaybe
                        className={css.mapTitle}
                        geolocation={geolocation}
                        listingId={listingId}
                      />
                    )}
                  </div>
                  {publicData?.location2?.address && (
                    <>
                      <div className={css.questionBlock}>
                        <p className={css.question}>Address 2 (optional)</p>
                        <p className={css.answer}>{publicData?.location2?.address || '-'}</p>
                      </div>
                      <div className={css.questionBlock}>
                        <p className={css.question}>Apt, suite, building # (optional)</p>
                        <p className={css.answer}>{publicData?.location2?.building || '-'}</p>
                      </div>
                    </>
                  )}

                  {publicData?.location3?.address && (
                    <>
                      <div className={css.questionBlock}>
                        <p className={css.question}>Address 3 (optional)</p>
                        <p className={css.answer}>{publicData?.location3?.address || '-'}</p>
                      </div>
                      <div className={css.questionBlock}>
                        <p className={css.question}>Apt, suite, building # (optional)</p>
                        <p className={css.answer}>{publicData?.location3?.building || '-'}</p>
                      </div>
                    </>
                  )}

                  <div className={css.questionBlock}>
                    <p className={css.question}>Price Per Hour (SGD)</p>
                    <p className={css.answer}>{priceString || '-'}</p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>Your availability</p>
                    <p className={css.answer}>
                      {availabilityPlan?.entries?.map(item => (
                        <p key={item.dayOfWeek}>
                          <span>{item.dayOfWeek}: </span>
                          <span>{`${item.startTime} - ${item.endTime}`}</span>
                        </p>
                      )) || '-'}
                      {/* {!!exceptions?.length && (
                    <>
                      <p>Exceptions</p>

                      <p></p>
                    </>
                  )} */}
                    </p>
                  </div>
                  <div className={css.questionBlock}>
                    <p className={css.question}>Profile photos</p>
                    <div className={css.photos}>
                      {currentListing?.images?.map(image => (
                        <img
                          key={image}
                          className={css.identityImage}
                          src={image?.attributes?.variants['landscape-crop']?.url}
                        ></img>
                      )) || '-'}
                    </div>
                  </div>
                  {/* <div className={css.questionBlock}>
                <p className={css.question}>Identity verification photos</p>
                <div className={css.photos}>
                  {publicData?.identityVerificationImagesUrls?.map(image => (
                    <img key={image} className={css.identityImage} src={image}></img>
                  )) || '-'}
                </div>
              </div> */}
                  {/* <FieldCheckbox
                id="grant-prolead-discretion"
                name="grantProleadDiscretion"
                className={css.grantProleadDiscretion}
                label={consentAgreementLabel}
                value="yes"
                required
              /> */}
                  <div className={css.submitButtonContainer}>
                    {consentAgreementLabel}
                    <Button
                      className={css.submitButton}
                      type="submit"
                      inProgress={submitInProgress}
                      disabled={submitDisabled}
                      ready={submitReady}
                    >
                      {saveActionMsg}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Form>
        );
      }}
    />
  );
};

EditListingReviewAndSubmitFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingReviewAndSubmitFormComponent.propTypes = {
  rootClassName: string,
  intl: intlShape.isRequired,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

const EditListingReviewAndSubmitForm = EditListingReviewAndSubmitFormComponent;

export default compose(injectIntl)(EditListingReviewAndSubmitForm);
