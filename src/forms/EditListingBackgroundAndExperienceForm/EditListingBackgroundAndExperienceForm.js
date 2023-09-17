import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import {
  Button,
  Form,
  FieldTextInput,
  Footnote,
  FieldCheckboxGroup,
  FieldCheckbox,
  FieldRadioButton,
  LocationAutocompleteInputField,
} from '../../components';
import {
  required,
  composeValidators,
  maxLengthWords,
  autocompleteSearchRequired,
  autocompletePlaceSelected,
  autocompletePlaceOptionalSelected,
} from '../../util/validators';
import { compose } from 'redux';

import css from './EditListingBackgroundAndExperienceForm.module.css';

const identity = v => v;

const ABOUT_MAX_LENGTH = 250;

const EditListingBackgroundAndExperienceFormComponent = props => (
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
        values,
        invalid,
      } = formRenderProps;

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const activities = {
        fitness: [
          'Personal training',
          'Football',
          'Basketball',
          'Swimming',
          'Tennis',
          'Weightlifting',
          'Running',
          'Combat Sports',
          'Volleyball',
          'Badminton',
          'Other',
        ],
        creative: [
          'Musical instruments',
          'Visual arts',
          'Dance',
          'Production',
          'Music Theory',
          'Other',
        ],
        education: [
          'Academics',
          'Leadership',
          'Management',
          'Mentorship',
          'Languages',
          'Mathematics',
          'Sciences',
          'Humanities',
          'Leadership Coaching',
          'Professional Skills',
          'Other',
        ],
      };

      const footnote = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.footnote',
      });
      const hearedAboutRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.hearedAboutRequiredMessage',
      });
      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingBackgroundAndExperienceForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingBackgroundAndExperienceForm.showListingFailed" />
        </p>
      ) : null;

      const sportsMessage = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.sportsMessage',
      });

      const sportsPlaceholderMessage = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.sportsPlaceholderMessage',
      });

      const sportsRequiredMessage = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.sportsRequiredMessage',
      });

      const achievementsMessage = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.achievementsMessage',
      });

      const achievementsPlaceholderMessage = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.achievementsPlaceholderMessage',
      });

      const achievementsRequiredMessage = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.achievementsRequiredMessage',
      });

      const aboutMessage = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.aboutMessage',
      });

      const aboutPlaceholderMessage = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.aboutPlaceholderMessage',
      });

      const aboutRequiredMessage = intl.formatMessage({
        id: 'EditListingBackgroundAndExperienceForm.aboutRequiredMessage',
      });

      const aboutMaxLengthMessage = intl.formatMessage(
        { id: 'EditListingBackgroundAndExperienceForm.aboutMaxLengthMessage' },
        {
          maxLength: ABOUT_MAX_LENGTH,
        }
      );

      const virtualTrainingLabel = intl.formatMessage({
        id: 'EditListingTrainingPreferencesForm.virtualTrainingLabel',
      });

      const virtualTrainingLabelYes = intl.formatMessage({
        id: 'EditListingTrainingPreferencesForm.virtualTrainingLabelYes',
      });

      const virtualTrainingLabelNo = intl.formatMessage({
        id: 'EditListingTrainingPreferencesForm.virtualTrainingLabelNo',
      });

      const convenientAreaMessage = intl.formatMessage({
        id: 'EditListingTrainingPreferencesForm.convenientAreaMessage',
      });

      const convenientAreaPlaceholderMessage = intl.formatMessage({
        id: 'EditListingTrainingPreferencesForm.convenientAreaPlaceholderMessage',
      });

      const convenientAreaRequiredMessage = intl.formatMessage({
        id: 'EditListingTrainingPreferencesForm.convenientAreaRequiredMessage',
      });

      const distanceMessage = intl.formatMessage({
        id: 'EditListingTrainingPreferencesForm.distanceMessage',
      });

      const distancePlaceholderMessage = intl.formatMessage({
        id: 'EditListingTrainingPreferencesForm.distancePlaceholderMessage',
      });

      const distanceRequiredMessage = intl.formatMessage({
        id: 'EditListingTrainingPreferencesForm.distanceRequiredMessage',
      });

      const rulesLabelMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.rulesLabel',
      });
      const rulesPlaceholderMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.rulesPlaceholder',
      });

      const achieveMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.achieveLabel',
      });

      const achievePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.achievePlaceholder',
      });

      ///address phrases

      const addressPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressPlaceholder',
      });
      const addressRequiredMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressRequired',
      });
      const addressNotRecognizedMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressNotRecognized',
      });

      const buildingMessage = (
        <span>
          <FormattedMessage id="EditListingLocationForm.building" />
          <span className={css.optional}>
            <FormattedMessage id="EditListingWizard.optional" />
          </span>
        </span>
      );
      const buildingPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLocationForm.buildingPlaceholder',
      });

      const titleRequiredMessage = intl.formatMessage({ id: 'EditListingLocationForm.address' });

      const addressTitle = intl.formatMessage({ id: 'EditListingLocationForm.addressTitle' });

      const addressSubTitle = intl.formatMessage({ id: 'EditListingLocationForm.addressSubtitle' });

      const address2Label = (
        <span>
          <FormattedMessage id="EditListingLocationForm.address2Label" />
          <span className={css.optional}>
            <FormattedMessage id="EditListingWizard.optional" />
          </span>
        </span>
      );
      const address3Label = (
        <span>
          <FormattedMessage id="EditListingLocationForm.address3Label" />
          <span className={css.optional}>
            <FormattedMessage id="EditListingWizard.optional" />
          </span>
        </span>
      );

      //

      const maxLength250Message = maxLengthWords(aboutMaxLengthMessage, ABOUT_MAX_LENGTH);

      const specializationOptions = [
        { key: 'Endurance', label: 'Endurance' },
        { key: 'Flexibility', label: 'Flexibility' },
        { key: 'Strength and Conditioning', label: 'Strength and Conditioning' },
        { key: 'Group Exercise', label: 'Group Exercise' },
        { key: 'Fitness', label: 'Fitness' },
        { key: 'Senior Fitness', label: 'Senior Fitness' },
        { key: 'Youth Fitness', label: 'Youth Fitness' },
        { key: 'Weight Loss Transformation', label: 'Weight Loss Transformation' },
        { key: 'Bodybuilding', label: 'Bodybuilding' },
        { key: 'Corrective Exercise', label: 'Corrective Exercise' },
        { key: 'Health Coaching', label: 'Health Coaching' },
        { key: 'Dribbling', label: 'Dribbling' },
        { key: 'Shooting Accuracy ', label: 'Shooting Accuracy ' },
        { key: 'Running Form', label: 'Running Form' },
        { key: 'Explosiveness', label: 'Explosiveness' },
        { key: 'Core', label: 'Core' },
        { key: 'Balance', label: 'Balance' },
        { key: 'Goalie Training', label: 'Goalie Training' },
        {
          key: 'General Body Strength and Endurance',
          label: 'General Body Strength and Endurance',
        },
      ];

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          {/* <div className={css.specializations}>
            {'What are your specializations?'}
            <FieldCheckboxGroup
              className={css.features}
              id="specializations"
              name="specializations"
              options={specializationOptions}
            />
          </div> */}
          {aboutMessage}
          <div className={css.aboutInfo}>
            <FieldTextInput
              id="about"
              name="about"
              className={css.about}
              type="textarea"
              label={
                <FormattedMessage id="EditListingBackgroundAndExperienceForm.aboutMessageSubtitle" />
              }
              placeholder={aboutPlaceholderMessage}
              validate={composeValidators(required(aboutRequiredMessage), maxLength250Message)}
            />
          </div>
          <div className={css.categories}>
            {'What category are you coaching in?'}
            <div>
              <FieldRadioButton
                id="category-fitness"
                name="category"
                className={css.usCitizen}
                label={'Fitness'}
                value="fitness"
              />
              <FieldRadioButton
                id="category-professional-skills"
                name="category"
                className={css.usCitizen}
                label={'Education'}
                value="education"
              />
              <FieldRadioButton
                id="category-creative"
                name="category"
                className={css.usCitizen}
                label={'Creative'}
                value="creative"
              />
            </div>
            {/* <FieldCheckbox
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
              label={'Education'}
              value="education"
            />
            <FieldCheckbox
              id="category-creative"
              name="category"
              className={css.usCitizen}
              label={'Creative'}
              value="creative"
            /> */}
          </div>
          <div className={css.activities}>
            {values?.category && 'Choose your activity'}
            {/* {values?.category === 'fitness' ? (
              <>
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
                  value="other fitness"
                />
                {values?.activity?.some(value => value === 'other fitness') && (
                  <FieldTextInput
                    id="fitnessOther"
                    name="fitnessOther"
                    className={css.certificate}
                    type="textarea"
                    placeholder={'Specify your fitness activity'}
                    // value="activityOther"
                    validate={composeValidators(required(hearedAboutRequiredMessage))}
                    //
                    label={'Other activities'}
                  />
                )}
              </>
            ) : null}

            {values?.category === 'education' ? (
              <>
                <h4>Education</h4>
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
                <FieldCheckbox
                  id="other-education"
                  name="activity"
                  className={css.consentStripeAgreement}
                  label={'Other'}
                  value="other education"
                />
                {values?.activity?.some(value => value === 'other education') && (
                  <FieldTextInput
                    id="educationOther"
                    name="educationOther"
                    className={css.certificate}
                    type="textarea"
                    placeholder={'Specify your education activity'}
                    // value="activityOther"
                    validate={composeValidators(required(hearedAboutRequiredMessage))}
                    //
                    label={'Other activities'}
                  />
                )}
              </>
            ) : null}

            {values?.category === 'creative' ? (
              <>
                <h4>Creative</h4>
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
                <FieldCheckbox
                  id="other-creative"
                  name="activity"
                  className={css.consentStripeAgreement}
                  label={'Other'}
                  value="other creative"
                />
                {values?.activity?.some(value => value === 'other creative') && (
                  <FieldTextInput
                    id="creativeOther"
                    name="creativeOther"
                    className={css.certificate}
                    type="textarea"
                    placeholder={'Specify your creative activity'}
                    // value="activityOther"
                    validate={composeValidators(required(hearedAboutRequiredMessage))}
                    //
                    label={'Other activities'}
                  />
                )}
              </>
            ) : null} */}

            {activities[values?.category]?.map(activity => {
              return (
                <FieldCheckbox
                  id={activity}
                  name="activity"
                  className={css.consentStripeAgreement}
                  label={activity}
                  value={activity.toLowerCase()}
                />
              );
            })}
            {values?.activity?.some(value => value === 'other') && (
              <FieldTextInput
                id={`${values?.category}Other`}
                name={`${values?.category}Other`}
                className={css.certificate}
                type="textarea"
                placeholder={'Specify your activity'}
                // value="activityOther"
                validate={composeValidators(required(hearedAboutRequiredMessage))}
                //
                label={'Other activities'}
              />
            )}
          </div>
          <div className={css.ageGroups}>
            {'What age groups do you specialise in?'}
            <FieldCheckbox
              id="seniorAge"
              name="ageCategory"
              className={css.isInfoCorrect}
              label={'Senior (55+ years)'}
              value="senior"
            />

            <FieldCheckbox
              id="adultAge"
              name="ageCategory"
              className={css.consentPayThroughProlead}
              label={'Adult (19 - 54 years)'}
              value="adult"
            />

            <FieldCheckbox
              id="teenAge"
              name="ageCategory"
              className={css.consentProleadsPolicy}
              label={'Teen (13 - 18 years)'}
              value="teen"
            />

            <FieldCheckbox
              id="kidsAge"
              name="ageCategory"
              className={css.consentStripeAgreement}
              label={'Kids (6-12 years)'}
              value="kids"
            />
          </div>
          {rulesLabelMessage}
          <div className={css.rules}>
            <FieldTextInput
              id="rules"
              name="rules"
              className={css.policy}
              type="textarea"
              label={<FormattedMessage id="EditListingPoliciesForm.rulesSubtitle" />}
              placeholder={rulesPlaceholderMessage}
            />
          </div>
          {achieveMessage}
          <div className={css.rules}>
            <FieldTextInput
              id="achieve"
              name="achieve"
              className={css.policy}
              type="textarea"
              placeholder={achievePlaceholderMessage}
            />
          </div>
          <div className={css.virtualTrainingBlock}>
            {virtualTrainingLabel}
            <div>
              <FieldRadioButton
                id="virtualTraining-yes"
                name="virtualTraining"
                className={css.virtualTraining}
                label={virtualTrainingLabelYes}
                value="yes"
              />
              <FieldRadioButton
                id="virtualTraining-no"
                name="virtualTraining"
                className={css.virtualTraining}
                label={virtualTrainingLabelNo}
                value="no"
              />
            </div>
          </div>
          {/* <div className={css.area}>
            <FieldTextInput
              id="convenientArea"
              name="convenientArea"
              className={css.convenientArea}
              type="text"
              label={convenientAreaMessage}
              placeholder={convenientAreaPlaceholderMessage}
              validate={composeValidators(required(convenientAreaRequiredMessage))}
            />
          </div> */}
          <div className={css.virtualTrainingBlock}>
            {distanceMessage}
            <div>
              <FieldRadioButton
                id="travelYes"
                name="travelWilling"
                className={css.virtualTraining}
                label="Yes"
                value="yes"
              />
              <FieldRadioButton
                id="travelNo"
                name="travelWilling"
                className={css.virtualTraining}
                label="No"
                value="no"
              />
            </div>
          </div>
          {/* <div className={css.distanceBlock}>
            <FieldTextInput
              id="distance"
              name="distance"
              className={css.distance}
              S
              type="number"
              min={0}
              label={distanceMessage}
              placeholder={distancePlaceholderMessage}
              validate={composeValidators(required(distanceRequiredMessage))}
            />
          </div> */}
          {addressTitle}
          <h4 className={css.addressSubtitle}>{addressSubTitle}</h4>
          <p>
            <FormattedMessage id="EditListingLocationForm.primaryLocation" />
          </p>
          <LocationAutocompleteInputField
            className={css.locationAddress}
            inputClassName={css.locationAutocompleteInput}
            iconClassName={css.locationAutocompleteInputIcon}
            predictionsClassName={css.predictionsRoot}
            validClassName={css.validLocation}
            autoFocus
            name="location"
            label={titleRequiredMessage}
            placeholder={addressPlaceholderMessage}
            useDefaultPredictions={false}
            format={identity}
            valueFromForm={values.location}
            validate={composeValidators(
              autocompleteSearchRequired(addressRequiredMessage),
              autocompletePlaceSelected(addressNotRecognizedMessage)
            )}
          />
          <FieldTextInput
            className={css.building}
            type="text"
            name="building"
            id="building"
            label={buildingMessage}
            placeholder={buildingPlaceholderMessage}
          />
          <p>
            <FormattedMessage id="EditListingLocationForm.secondaryLocation" />
          </p>
          <LocationAutocompleteInputField
            className={css.locationAddress}
            inputClassName={css.locationAutocompleteInput}
            iconClassName={css.locationAutocompleteInputIcon}
            predictionsClassName={css.predictionsRoot}
            validClassName={css.validLocation}
            name="location2"
            label={address2Label}
            placeholder={addressPlaceholderMessage}
            useDefaultPredictions={false}
            format={identity}
            valueFromForm={values.address2}
            // validate={composeValidators(
            //   autocompletePlaceOptionalSelected(addressNotRecognizedMessage)
            // )}
          />
          <FieldTextInput
            className={css.building}
            type="text"
            name="buildingAddress2"
            id="buildingAddress2"
            label={buildingMessage}
            placeholder={buildingPlaceholderMessage}
          />
          <p>
            <FormattedMessage id="EditListingLocationForm.tertiaryLocation" />
          </p>
          <LocationAutocompleteInputField
            className={css.locationAddress}
            inputClassName={css.locationAutocompleteInput}
            iconClassName={css.locationAutocompleteInputIcon}
            predictionsClassName={css.predictionsRoot}
            validClassName={css.validLocation}
            name="location3"
            label={address3Label}
            placeholder={addressPlaceholderMessage}
            useDefaultPredictions={false}
            format={identity}
            valueFromForm={values.address3}
            // validate={composeValidators(
            //   autocompletePlaceOptionalSelected(addressNotRecognizedMessage)
            // )}
          />
          <FieldTextInput
            className={css.building}
            type="text"
            name="buildingAddress3"
            id="buildingAddress3"
            label={buildingMessage}
            placeholder={buildingPlaceholderMessage}
          />
          {/* <FieldTextInput
            id="sports"
            name="sports"
            className={css.sports}
            type="textarea"
            label={sportsMessage}
            placeholder={sportsPlaceholderMessage}
            validate={composeValidators(required(sportsRequiredMessage))}
          />
          <FieldTextInput
            id="achievements"
            name="achievements"
            className={css.achievements}
            type="textarea"
            label={achievementsMessage}
            placeholder={achievementsPlaceholderMessage}
            validate={composeValidators(required(achievementsRequiredMessage))}
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

EditListingBackgroundAndExperienceFormComponent.defaultProps = {
  rootClassName: null,
  selectedPlace: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingBackgroundAndExperienceFormComponent.propTypes = {
  rootClassName: string,
  intl: intlShape.isRequired,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
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

const EditListingBackgroundAndExperienceForm = EditListingBackgroundAndExperienceFormComponent;

export default compose(injectIntl)(EditListingBackgroundAndExperienceForm);
