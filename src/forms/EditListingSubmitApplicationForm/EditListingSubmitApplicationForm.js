import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, Form, FieldTextInput, FieldCheckbox } from '../../components';
import { required, composeValidators } from '../../util/validators';
import { compose } from 'redux';

import css from './EditListingSubmitApplicationForm.module.css';

const EditListingSubmitApplicationFormComponent = props => (
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

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
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

      const consentStripeAgreementLabel = (
        <FormattedMessage
          id="EditListingSubmitApplicationForm.consentStripeAgreementLabel"
          values={{
            stripeServiceAgreementLink: (
              <a href="https://stripe.com/ssa" target="_blank">
                Stripe Service Agreement
              </a>
            ),
          }}
        />
      );

      const consentGrantProleadLicenseLabel = intl.formatMessage({
        id: 'EditListingSubmitApplicationForm.consentGrantProleadLicenseLabel',
      });

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <FieldCheckbox
            id="isInfoCorrect"
            name="isInfoCorrect"
            className={css.isInfoCorrect}
            label={isInfoCorrectLabel}
            value="true"
            required
          />

          <FieldCheckbox
            id="consentPayThroughProlead"
            name="consentPayThroughProlead"
            className={css.consentPayThroughProlead}
            label={consentPayThroughProleadLabel}
            value="true"
            required
          />

          <FieldCheckbox
            id="consentProleadsPolicy"
            name="consentProleadsPolicy"
            className={css.consentProleadsPolicy}
            label={consentProleadsPolicyLabel}
            value="true"
            required
          />

          <FieldCheckbox
            id="consentStripeAgreement"
            name="consentStripeAgreement"
            className={css.consentStripeAgreement}
            label={consentStripeAgreementLabel}
            value="true"
            required
          />

          <FieldCheckbox
            id="consentGrantProleadLicense"
            name="consentGrantProleadLicense"
            className={css.consentGrantProleadLicense}
            label={consentGrantProleadLicenseLabel}
            value="true"
            required
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
        </Form>
      );
    }}
  />
);

EditListingSubmitApplicationFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingSubmitApplicationFormComponent.propTypes = {
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

const EditListingSubmitApplicationForm = EditListingSubmitApplicationFormComponent;

export default compose(injectIntl)(EditListingSubmitApplicationForm);
