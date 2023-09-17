import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, Form, Footnote, FieldTextInput } from '../../components';
import { required, composeValidators } from '../../util/validators';
import RemoveImageButton from '../../components/AddImages/RemoveImageButton';
import css from './EditListingIdentityVerificationForm.module.css';

class EditListingIdentityVerificationFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  uploadWidget(e) {
    const _this = this;
    e.preventDefault();
    window.cloudinary.openUploadWidget(
      { cloud_name: 'oneprolead', upload_preset: 'oneprolead' },
      function(error, result) {
        if (result && result.info && result.info.secure_url)
          _this.props.handleUpload(result.info.secure_url);
      }
    );
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={formRenderProps => {
          const {
            disabled,
            ready,
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
            imagesLimitExceedError,
          } = formRenderProps;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = disabled || submitInProgress;

          const { updateListingError, showListingsError } = fetchErrors || {};
          const { identityVerificationImagesUrls } = this.props.initialValues;
          const footnote = <FormattedMessage id="EditListingIdentityVerificationForm.footnote" />;

          const UploadIdentityVerificationMsg = (
            <FormattedMessage id="EditListingIdentityVerificationForm.UploadIdentityVerificationMsg" />
          );

          const errorMessage = updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingIdentityVerificationForm.updateFailed" />
            </p>
          ) : null;

          const errorMessageShowListing = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingIdentityVerificationForm.showListingFailed" />
            </p>
          ) : null;

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              {errorMessageShowListing}
              {imagesLimitExceedError}
              <h5>
                To ensure a reliable connection between learners and qualified PROs, we require a
                verification of identity for all PRO accounts. All information submitted is stored
                confidentially and in full compliance with our Terms and Conditions.
              </h5>
              {identityVerificationImagesUrls && identityVerificationImagesUrls.length > 0 ? (
                <div className={css.identityVerificationImagesContainer}>
                  <h2>
                    <FormattedMessage id="EditListingIdentityVerificationForm.identityVerificationImages" />
                  </h2>
                  <div className={css.identityVerificationImageContainer}>
                    {identityVerificationImagesUrls.map(vi => {
                      return (
                        <div className={css.imageWrapper}>
                          <img className={css.identityVerificationImage} src={vi} />
                          <RemoveImageButton
                            onClick={this.props.handleRemoveClick}
                            data={vi}
                            className={css.identityVerificationImageRemove}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <FieldTextInput
                name="identityVerificationImagesUrls"
                className={css.identityVerificationImagesUrlsField}
                type="hidden"
              />

              <div className={css.tip}>
                {/* <FormattedMessage id="EditListingIdentityVerificationForm.addImagesTip" /> */}
                Submission Criteria:
                <ul className={css.tip}>
                  <li className={css.tip}>
                    Copy of your Passport or NRIC
                    <ul>
                      <li className={css.tipInner}>
                        For NRIC, please submit 2 photos of the front and back{' '}
                      </li>
                    </ul>
                  </li>

                  <li className={css.tip}>The document be current and NOT expired </li>
                </ul>
              </div>

              <button className={css.UploadIdentityVerificationButton} onClick={this.uploadWidget}>
                {UploadIdentityVerificationMsg}
              </button>

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
  }
}

EditListingIdentityVerificationFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingIdentityVerificationFormComponent.propTypes = {
  rootClassName: string,
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

const EditListingIdentityVerificationForm = EditListingIdentityVerificationFormComponent;

export default EditListingIdentityVerificationForm;
