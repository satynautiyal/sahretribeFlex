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
  FieldCheckbox,
  FieldRadioButton,
  Footnote,
} from '../../components';
import { required, composeValidators } from '../../util/validators';
import { compose } from 'redux';

import css from './EditListingTrainingPreferencesForm.module.css';

const EditListingTrainingPreferencesFormComponent = props => (
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
      } = formRenderProps;

      const footnote = intl.formatMessage({ id: 'EditListingTrainingPreferencesForm.footnote' });
      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingTrainingPreferencesForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingTrainingPreferencesForm.showListingFailed" />
        </p>
      ) : null;

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

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <div className={css.virtualTrainingContainer}>
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

          <FieldTextInput
            id="convenientArea"
            name="convenientArea"
            className={css.convenientArea}
            type="text"
            label={convenientAreaMessage}
            placeholder={convenientAreaPlaceholderMessage}
            validate={composeValidators(required(convenientAreaRequiredMessage))}
          />

          <FieldTextInput
            id="distance"
            name="distance"
            className={css.distance}
            type="number"
            min={0}
            label={distanceMessage}
            placeholder={distancePlaceholderMessage}
            validate={composeValidators(required(distanceRequiredMessage))}
          />

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

EditListingTrainingPreferencesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingTrainingPreferencesFormComponent.propTypes = {
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

const EditListingTrainingPreferencesForm = EditListingTrainingPreferencesFormComponent;

export default compose(injectIntl)(EditListingTrainingPreferencesForm);
