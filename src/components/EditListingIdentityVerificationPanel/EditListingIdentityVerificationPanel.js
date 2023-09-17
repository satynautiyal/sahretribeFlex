import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingIdentityVerificationForm } from '../../forms';
import { ListingLink } from '../../components';

import css from './EditListingIdentityVerificationPanel.module.css';

const IMAGES_LIMIT = 3;

class EditListingIdentityVerificationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identityVerificationImagesUrls: null,
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleUpload(url) {
    this.setState({
      identityVerificationImagesUrls: !this.state.identityVerificationImagesUrls
        ? [url]
        : [...this.state.identityVerificationImagesUrls, url],
    });
  }

  handleRemoveClick(e) {
    const currentListing = ensureListing(this.props.listing);
    const { publicData } = currentListing.attributes;
    const identityVerificationImagesUrls = publicData && publicData.identityVerificationImagesUrls;
    const targetUrl =
      e.target && e.target.closest('button') && e.target.closest('button').dataset
        ? e.target.closest('button').dataset.rmUrl
        : null;
    if (targetUrl && identityVerificationImagesUrls && identityVerificationImagesUrls.length) {
      const updatedUrls = identityVerificationImagesUrls.filter(url => url !== targetUrl);
      this.setState({
        identityVerificationImagesUrls: updatedUrls,
      });
    }
  }

  render() {
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
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const currentListing = ensureListing(listing);
    const { publicData } = currentListing.attributes;

    const isPublished =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
    const panelTitle = isPublished ? (
      <FormattedMessage id="EditListingIdentityVerificationPanel.title" />
    ) : (
      <FormattedMessage id="EditListingIdentityVerificationPanel.createListingTitle" />
    );

    const imagesLimitExceedError =
      this.state.identityVerificationImagesUrls &&
      this.state.identityVerificationImagesUrls.length > 3 ? (
        <span className={css.imagesLimitExceedError}>
          <FormattedMessage id="EditListingIdentityVerificationPanel.imagesLimitExceedError" />
        </span>
      ) : null;
    const identityVerificationImagesUrls = this.state.identityVerificationImagesUrls
      ? this.state.identityVerificationImagesUrls.slice(0, IMAGES_LIMIT)
      : publicData && publicData.identityVerificationImagesUrls;
    const initialValues = { identityVerificationImagesUrls };
    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>
        <EditListingIdentityVerificationForm
          className={css.form}
          name="identityVerification"
          initialValues={initialValues}
          onSubmit={values => {
            const { identityVerificationImagesUrls } = values;

            const updatedValues = {
              publicData: { identityVerificationImagesUrls },
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
          handleUpload={this.handleUpload}
          identityVerificationImagesUrls={this.state.identityVerificationImagesUrls}
          handleRemoveClick={this.handleRemoveClick}
          imagesLimitExceedError={imagesLimitExceedError}
        />
      </div>
    );
  }
}

EditListingIdentityVerificationPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingIdentityVerificationPanel.propTypes = {
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

export default EditListingIdentityVerificationPanel;
