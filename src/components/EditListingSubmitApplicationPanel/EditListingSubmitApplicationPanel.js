import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingSubmitApplicationForm } from '../../forms';
import { ListingLink } from '../../components';

import css from './EditListingSubmitApplicationPanel.module.css';

const EditListingSubmitApplicationPanel = props => {
  const {
    rootClassName,
    className,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { privateData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingSubmitApplicationPanel.title"
      values={{
        listingTitle: (
          <ListingLink listing={listing}>
            <FormattedMessage id="EditListingSubmitApplicationPanel.listingTitle" />
          </ListingLink>
        ),
      }}
    />
  ) : (
    <FormattedMessage id="EditListingSubmitApplicationPanel.createListingTitle" />
  );

  const {
    isInfoCorrect,
    consentPayThroughProlead,
    consentProleadsPolicy,
    consentStripeAgreement,
    consentGrantProleadLicense,
  } = privateData;
  const initialValues = {
    isInfoCorrect,
    consentPayThroughProlead,
    consentProleadsPolicy,
    consentStripeAgreement,
    consentGrantProleadLicense,
  };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingSubmitApplicationForm
        className={css.form}
        initialValues={initialValues}
        onSubmit={values => {
          const {
            isInfoCorrect,
            consentPayThroughProlead,
            consentProleadsPolicy,
            consentStripeAgreement,
            consentGrantProleadLicense,
          } = values;

          const updatedValues = {
            privateData: {
              isInfoCorrect,
              consentPayThroughProlead,
              consentProleadsPolicy,
              consentStripeAgreement,
              consentGrantProleadLicense,
            },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditListingSubmitApplicationPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingSubmitApplicationPanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingSubmitApplicationPanel;
