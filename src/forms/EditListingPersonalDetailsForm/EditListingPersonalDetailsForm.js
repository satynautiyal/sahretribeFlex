import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Field, Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import {
  Form,
  Button,
  FieldTextInput,
  FieldCheckbox,
  FieldRadioButton,
  Footnote,
  FieldPhoneNumberInput,
} from '../../components';
import CustomCertificateSelectFieldMaybe from './CustomCertificateSelectFieldMaybe';

import css from './EditListingPersonalDetailsForm.module.css';

const TITLE_MAX_LENGTH = 60;

const EditListingPersonalDetailsFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        certificateOptions,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
      } = formRenderProps;

      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
      const footnote = intl.formatMessage({ id: 'EditListingDescriptionForm.footnote' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const phoneNumberTitleMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePhoneNumber',
      });

      const phoneNumberPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.phoneNumberPlaceholder',
      });

      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const sgCitizenLabel = intl.formatMessage({
        id: 'EditListingPersonalDetailsForm.singaporeCitizenLabel',
      });

      const usCitizenLabelYes = intl.formatMessage({
        id: 'EditListingDescriptionForm.usCitizenLabelYes',
      });

      const usCitizenLabelNo = intl.formatMessage({
        id: 'EditListingDescriptionForm.usCitizenLabelNo',
      });

      const allowedToWorkLabel = intl.formatMessage({
        id: 'EditListingPersonalDetailsForm.allowedToWorkLabel',
      });

      const allowedToWorkLabelYes = intl.formatMessage({
        id: 'EditListingDescriptionForm.allowedToWorkLabelYes',
      });

      const allowedToWorkLabelNo = intl.formatMessage({
        id: 'EditListingDescriptionForm.allowedToWorkLabelNo',
      });

      const convictedLabel = intl.formatMessage({
        id: 'EditListingDescriptionForm.convictedLabel',
      });

      const convictedLabelYes = intl.formatMessage({
        id: 'EditListingDescriptionForm.convictedLabelYes',
      });

      const convictedLabelNo = intl.formatMessage({
        id: 'EditListingDescriptionForm.convictedLabelNo',
      });

      // const grantProleadDiscretionLabel = intl.formatMessage({
      //   id: 'EditListingDescriptionForm.grantProleadDiscretionLabel',
      // });

      const grantProleadDiscretionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.grantProleadDiscretionRequiredMessage',
      });

      const hearedAboutMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.hearedAboutMessage',
      });

      const hearedAboutPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.hearedAboutPlaceholderMessage',
      });

      const hearedAboutRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.hearedAboutRequiredMessage',
      });

      const certificateLabel = (
        <span>
          <FormattedMessage id="EditListingDescriptionForm.certificateLabel" />
          <span className={css.optional}>
            <FormattedMessage id="EditListingWizard.optional" />
          </span>
        </span>
      );

      const certificatePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.certificatePlaceholderMessage',
      });

      const certificateRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.certificateRequiredMessage',
      });

      const maleGenderLabel = intl.formatMessage({
        id: 'EditListingDescriptionForm.maleGenderLabel',
      });

      const femaleGenderLabel = intl.formatMessage({
        id: 'EditListingDescriptionForm.femaleGenderLabel',
      });

      const otherGenderLabel = intl.formatMessage({
        id: 'EditListingDescriptionForm.otherGenderLabel',
      });

      const genderLabel = intl.formatMessage({
        id: 'EditListingDescriptionForm.genderLabel',
      });

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          <FieldPhoneNumberInput
            id="phoneNumber"
            name="phoneNumber"
            className={css.title}
            label={phoneNumberTitleMessage}
            placeholder={phoneNumberPlaceholderMessage}
          />

          <div className={css.genderContainer}>
            {genderLabel}
            <FieldRadioButton
              id="gender-male"
              name="gender"
              className={css.gender}
              label={maleGenderLabel}
              value="male"
            />

            <FieldRadioButton
              id="gender-female"
              name="gender"
              className={css.gender}
              label={femaleGenderLabel}
              value="female"
            />

            <FieldRadioButton
              id="gender-other"
              name="gender"
              className={css.gender}
              label={otherGenderLabel}
              value="other"
            />
          </div>

          {/* <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            ///
            validate={composeValidators(required(descriptionRequiredMessage))}
          />

          <div className={css.usCitizenContainer}>
            {'What category are you coaching in?'}
            <FieldCheckbox
              id="category-fitness"
              name="category"
              className={css.usCitizen}
              label={'Fitness'}
              value="fitness"
            />
            <FieldCheckbox
              id="category-professional-skills"
              name="category"
              className={css.usCitizen}
              label={'Professional skills'}
              value="professional skills"
            />
            <FieldCheckbox
              id="category-creative"
              name="category"
              className={css.usCitizen}
              label={'Creative'}
              value="creative"
            />
          </div>

          <br />

          <div className={css.usCitizenContainer}>
            {'Choose your activity'}
            <h4>Fitness activities</h4>
            <FieldCheckbox
              id="activity-personal-training"
              name="activity"
              className={css.isInfoCorrect}
              label={'Personal training'}
              value="personal training"
            />
            <FieldCheckbox
              id="activity-football"
              name="activity"
              className={css.consentPayThroughProlead}
              label={'Football'}
              value="football"
            />
            <FieldCheckbox
              id="activity-basketball"
              name="activity"
              className={css.consentProleadsPolicy}
              label={'Basketball'}
              value="basketball"
            />
            <FieldCheckbox
              id="activity-rugby"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Rugby'}
              value="rugby"
            />
            <FieldCheckbox
              id="activity-tennis"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Tennis'}
              value="tennis"
            />
            <FieldCheckbox
              id="activity-badminton"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Badminton'}
              value="badminton"
            />
            <FieldCheckbox
              id="activity-weightlifting"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Weightlifting'}
              value="weightlifting"
            />
            <FieldCheckbox
              id="activity-running"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Running'}
              value="running"
            />
            <FieldCheckbox
              id="otherActivity"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Other'}
              value="other"
            />
            {values?.activity?.some(value => value === 'other') && (
              <FieldTextInput
                id="activityOther"
                name="activityOther"
                className={css.certificate}
                type="textarea"
                placeholder={'Specify your fitness activity'}
                // value="activityOther"
                validate={composeValidators(required(hearedAboutRequiredMessage))}
                //
                label={'Other activities'}
              />
            )}

            <h4>Professional activities</h4>
            <FieldCheckbox
              id="activity-academics"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Academics'}
              value="academics"
            />
            <FieldCheckbox
              id="activity-leadership"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Leadership'}
              value="leadership"
            />
            <FieldCheckbox
              id="activity-management"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Management'}
              value="management"
            />
            <h4>Creativity</h4>
            <FieldCheckbox
              id="activity-musical-instruments"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Musical instruments'}
              value="musical instruments"
            />
            <FieldCheckbox
              id="activity-visual-arts"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Visual arts'}
              value="visual arts"
            />
            <FieldCheckbox
              id="activity-dance"
              name="activity"
              className={css.consentStripeAgreement}
              label={'Dance'}
              value="dance"
            />
          </div>

          <br />

          <div className={css.usCitizenContainer}>
            {'What group ages do you train?'}
            <FieldCheckbox
              id="seniorAge"
              name="ageCategory"
              className={css.isInfoCorrect}
              label={'Senior'}
              value="senior"
            />

            <FieldCheckbox
              id="adultAge"
              name="ageCategory"
              className={css.consentPayThroughProlead}
              label={'Adult'}
              value="adult"
            />

            <FieldCheckbox
              id="teenAge"
              name="ageCategory"
              className={css.consentProleadsPolicy}
              label={'Teen'}
              value="teen"
            />

            <FieldCheckbox
              id="childAge"
              name="ageCategory"
              className={css.consentStripeAgreement}
              label={'Child'}
              value="child"
            />
          </div> */}

          {/* <FieldTextInput
            id="certificate"
            name="certificate"
            className={css.certificate}
            type="textarea"
            label={certificateLabel}
            placeholder={certificatePlaceholderMessage}
          /> */}

          <div className={css.usCitizenContainer}>
            {sgCitizenLabel}
            <FieldRadioButton
              id="us-citizen-yes"
              name="usCitizen"
              className={css.usCitizen}
              label={usCitizenLabelYes}
              value="yes"
            />
            <FieldRadioButton
              id="us-citizen-no"
              name="usCitizen"
              className={css.usCitizen}
              label={usCitizenLabelNo}
              value="no"
            />
          </div>

          <div className={css.allowedToWorkContainer}>
            {allowedToWorkLabel}
            <FieldRadioButton
              id="allowed-to-work-yes"
              name="allowedToWork"
              className={css.allowedToWork}
              label={allowedToWorkLabelYes}
              value="yes"
            />
            <FieldRadioButton
              id="allowed-to-work-no"
              name="allowedToWork"
              className={css.allowedToWork}
              label={allowedToWorkLabelNo}
              value="no"
            />
          </div>

          <div className={css.convictedContainer}>
            {convictedLabel}
            <FieldRadioButton
              id="convicted-yes"
              name="convicted"
              className={css.convicted}
              label={convictedLabelYes}
              value="yes"
            />
            <FieldRadioButton
              id="convicted-no"
              name="convicted"
              className={css.convicted}
              label={convictedLabelNo}
              value="no"
            />
          </div>

          <FieldTextInput
            id="heared-about"
            name="hearedAbout"
            className={css.description}
            type="textarea"
            label={hearedAboutMessage}
            placeholder={hearedAboutPlaceholderMessage}
            validate={composeValidators(required(hearedAboutRequiredMessage))}
          />

          {/* <FieldCheckbox
            id="grant-prolead-discretion"
            name="grantProleadDiscretion"
            className={css.grantProleadDiscretion}
            label={grantProleadDiscretionLabel}
            value="yes"
            required
          /> */}

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
          <Footnote message={footnote} />
        </Form>
      );
    }}
  />
);

EditListingPersonalDetailsFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingPersonalDetailsFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  certificateOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingPersonalDetailsFormComponent);
