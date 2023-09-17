import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingLocationForm } from '../../forms';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './EditListingLocationPanel.module.css';

const { LatLng } = sdkTypes;

class EditListingLocationPanel extends Component {
  constructor(props) {
    super(props);

    this.getInitialValues = this.getInitialValues.bind(this);

    this.state = {
      initialValues: this.getInitialValues(),
    };
  }

  getInitialValues() {
    const { listing } = this.props;
    const currentListing = ensureOwnListing(listing);
    const { geolocation, publicData } = currentListing.attributes;

    // Only render current search if full place object is available in the URL params
    // TODO bounds are missing - those need to be queried directly from Google Places
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

    return {
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
    };
  }

  render() {
    const {
      className,
      rootClassName,
      listing,
      disabled,
      ready,
      onSubmit,
      onChange,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      errors,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const currentListing = ensureOwnListing(listing);

    const isPublished =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
    const panelTitle = isPublished ? (
      <FormattedMessage
        id="EditListingLocationPanel.title"
        values={{
          listingTitle: (
            <ListingLink listing={listing}>
              <FormattedMessage id="EditListingLocationPanel.listingTitle" />
            </ListingLink>
          ),
        }}
      />
    ) : (
      <FormattedMessage id="EditListingLocationPanel.createListingTitle" />
    );

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>
        <EditListingLocationForm
          className={css.form}
          initialValues={this.state.initialValues}
          onSubmit={values => {
            const {
              building = '',
              location,
              buildingAddress2 = '',
              location2,
              buildingAddress3 = '',
              location3,
            } = values;
            const {
              selectedPlace: { address, origin },
            } = location;

            const address2 =
              location2 && location2.selectedPlace && location2.selectedPlace.address;
            const origin2 = location2 && location2.selectedPlace && location2.selectedPlace.origin;

            const address3 =
              location3 && location3.selectedPlace && location3.selectedPlace.address;
            const origin3 = location3 && location3.selectedPlace && location3.selectedPlace.origin;

            const updateValues = {
              geolocation: origin,
              publicData: {
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
              },
            };
            this.setState({
              initialValues: {
                building,
                location: { search: address, selectedPlace: { address, origin } },
                buildingAddress2,
                location2: {
                  search: address2,
                  selectedPlace: { address: address2, origin: origin2 },
                },
                buildingAddress3,
                location3: {
                  search: address3,
                  selectedPlace: { address: address3, origin: origin3 },
                },
              },
            });
            onSubmit(updateValues);
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
  }
}

const { func, object, string, bool } = PropTypes;

EditListingLocationPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingLocationPanel.propTypes = {
  className: string,
  rootClassName: string,

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

export default EditListingLocationPanel;
