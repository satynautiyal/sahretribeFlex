import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingBackgroundAndExperienceForm } from '../../forms';
import { ListingLink } from '../../components';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './EditListingBackgroundAndExperiencePanel.module.css';

const { LatLng } = sdkTypes;

const EditListingBackgroundAndExperiencePanel = props => {
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
  const { geolocation, publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingBackgroundAndExperiencePanel.title"
      values={{
        listingTitle: (
          <ListingLink listing={listing}>
            <FormattedMessage id="EditListingBackgroundAndExperiencePanel.listingTitle" />
          </ListingLink>
        ),
      }}
    />
  ) : (
    <FormattedMessage id="EditListingBackgroundAndExperiencePanel.createListingTitle" />
  );

  const locationFieldsPresent =
    publicData && publicData.location && publicData.location.address && geolocation;
  const location = publicData && publicData.location ? publicData.location : {};
  const location2FieldsPresent =
    publicData &&
    publicData.location2 &&
    publicData.location2.address &&
    publicData.location2.origin;
  const location2 = publicData && publicData.location2 ? publicData.location2 : {};
  const origin2 =
    publicData && publicData.location2 && publicData.location2.origin
      ? new LatLng(publicData.location2.origin.lat, publicData.location2.origin.lng)
      : {};

  const location3FieldsPresent =
    publicData &&
    publicData.location3 &&
    publicData.location3.address &&
    publicData.location3.origin;
  const location3 = publicData && publicData.location3 ? publicData.location3 : {};
  const origin3 =
    publicData && publicData.location3 && publicData.location3.origin
      ? new LatLng(publicData.location3.origin.lat, publicData.location3.origin.lng)
      : {};

  const { address, building } = location;
  const { buildingAddress2 } = location2;
  const { buildingAddress3 } = location3;

  const address2 = location2 && location2.address ? location2.address : null;
  const address3 = location3 && location3.address ? location3.address : null;

  const {
    sports,
    achievements,
    about,
    specializations,
    category,
    activity,
    virtualTraining,
    travelWilling,
    rules,
    achieve,
    fitnessOther,
    educationOther,
    creativeOther,
    convenientArea,
    ageCategory,
  } = publicData;
  const initialValues = {
    building,
    location: locationFieldsPresent
      ? {
          search: address,
          selectedPlace: { address, origin: geolocation },
        }
      : null,

    buildingAddress2,
    location2: location2FieldsPresent
      ? {
          search: address2,
          selectedPlace: { address: address2, origin: origin2 },
        }
      : null,
    buildingAddress3,
    location3: location3FieldsPresent
      ? {
          search: address3,
          selectedPlace: { address: address3, origin: origin3 },
        }
      : null,
    sports,
    achievements,
    about,
    specializations,
    category,
    activity,
    virtualTraining,
    travelWilling,
    rules,
    achieve,
    fitnessOther,
    educationOther,
    creativeOther,
    convenientArea,
    convenientArea,
    ageCategory,
  };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingBackgroundAndExperienceForm
        className={css.form}
        initialValues={initialValues}
        onSubmit={values => {
          const {
            sports,
            achievements,
            about,
            specializations,
            category,
            activity,
            virtualTraining,
            travelWilling,
            location,
            rules,
            achieve,
            fitnessOther,
            educationOther,
            creativeOther,
            convenientArea,
            ageCategory,
            building,
            buildingAddress2,
            location2,
            buildingAddress3,
            location3,
          } = values;

          const {
            selectedPlace: { address, origin },
          } = location;

          const address2 = location2 && location2.selectedPlace && location2.selectedPlace.address;
          const origin2 = location2 && location2.selectedPlace && location2.selectedPlace.origin;

          const address3 = location3 && location3.selectedPlace && location3.selectedPlace.address;
          const origin3 = location3 && location3.selectedPlace && location3.selectedPlace.origin;

          const updatedValues = {
            geolocation: origin,
            publicData: {
              sports,
              achievements,
              about,
              specializations,
              category,
              activity,
              virtualTraining,
              travelWilling,
              ageCategory,
              location: { address, building },
              location2: {
                address: address2,
                buildingAddress: buildingAddress2,
                origin: origin2,
              },
              location3: {
                address: address3,
                buildingAddress: buildingAddress3,
                origin: origin3,
              },
              rules,
              achieve,
              fitnessOther,
              educationOther,
              creativeOther,
              convenientArea,
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

EditListingBackgroundAndExperiencePanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingBackgroundAndExperiencePanel.propTypes = {
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

export default EditListingBackgroundAndExperiencePanel;
