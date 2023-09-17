import React, { Component } from 'react';
import { array, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { nonEmptyArray, composeValidators } from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import { AddImages, Button, Form, ValidationError, Footnote } from '../../components';

import css from './EditListingPhotosForm.module.css';
import ImageComponent from './ImageComponent';
import EasyCrop from './ImageComponent';
import getCroppedImg from './cropImage';

const ACCEPT_IMAGES = 'image/*';

export class EditListingPhotosFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: { x: 0, y: 0 },
      zoom: 1,
      rotation: 0,
      croppedAreaPixels: null,
      croppedImage: null,
      selectedImage: '',
      imageUploadRequested: false,
    };
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.onCropDone = this.onCropDone.bind(this);
    this.setAllCropFeatures = this.setAllCropFeatures.bind(this);
    this.submittedImages = [];
  }

  setAllCropFeatures(data, section = 'crop') {
    this.setState({ [section]: data });
  }

  onImageUploadHandler(file) {
    if (file) {
      this.setState({ imageUploadRequested: true });
      this.props
        .onImageUpload({ id: `${file.name}_${Date.now()}`, file })
        .then(() => {
          this.setState({ imageUploadRequested: false });
        })
        .catch(() => {
          this.setState({ imageUploadRequested: false });
        });
    }
  }

  onCropDone(form, file) {
    form.change(`addImage`, file);
    form.blur(`addImage`);
    this.onImageUploadHandler(file);
    this.setState({ selectedImage: '' });
  }

  async showCroppedImage(form) {
    try {
      const croppedImage = await getCroppedImg(
        this.state.selectedImage,
        this.state.croppedAreaPixels,
        this.state.rotation
      );
      console.log('donee', { croppedImage });
      this.setState({ croppedImage });
      const myFile = new File([croppedImage], 'hello.png', {
        type: 'image/png',
      });
      this.onCropDone(form, myFile);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    {
      console.log('this.state.croppedImage', this.state.selectedImage);
    }
    return (
      <FinalForm
        {...this.props}
        onImageUploadHandler={this.onImageUploadHandler}
        imageUploadRequested={this.state.imageUploadRequested}
        initialValues={{ images: this.props.images }}
        render={formRenderProps => {
          const {
            form,
            className,
            fetchErrors,
            handleSubmit,
            images,
            imageUploadRequested,
            intl,
            invalid,
            onImageUploadHandler,
            onRemoveImage,
            disabled,
            ready,
            saveActionMsg,
            updated,
            updateInProgress,
          } = formRenderProps;

          const footnote = intl.formatMessage({ id: 'EditListingPhotosForm.footnote' });
          const chooseImageText = (
            <span className={css.chooseImageText}>
              <span className={css.chooseImage}>
                <FormattedMessage id="EditListingPhotosForm.chooseImage" />
              </span>
              <span className={css.imageTypes}>
                <FormattedMessage id="EditListingPhotosForm.imageTypes" />
              </span>
            </span>
          );

          const imageRequiredMessage = intl.formatMessage({
            id: 'EditListingPhotosForm.imageRequired',
          });

          const { publishListingError, showListingsError, updateListingError, uploadImageError } =
            fetchErrors || {};
          const uploadOverLimit = isUploadImageOverLimitError(uploadImageError);

          let uploadImageFailed = null;

          if (uploadOverLimit) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadOverLimit" />
              </p>
            );
          } else if (uploadImageError) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadFailed" />
              </p>
            );
          }

          // NOTE: These error messages are here since Photos panel is the last visible panel
          // before creating a new listing. If that order is changed, these should be changed too.
          // Create and show listing errors are shown above submit button
          const publishListingFailed = publishListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.publishListingFailed" />
            </p>
          ) : null;
          const showListingFailed = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.showListingFailed" />
            </p>
          ) : null;

          const submittedOnce = this.submittedImages.length > 0;
          // imgs can contain added images (with temp ids) and submitted images with uniq ids.
          const arrayOfImgIds = imgs =>
            imgs.map(i => (typeof i.id === 'string' ? i.imageId : i.id));
          const imageIdsFromProps = arrayOfImgIds(images);
          const imageIdsFromPreviousSubmit = arrayOfImgIds(this.submittedImages);
          const imageArrayHasSameImages = isEqual(imageIdsFromProps, imageIdsFromPreviousSubmit);
          const pristineSinceLastSubmit = submittedOnce && imageArrayHasSameImages;

          const submitReady = (updated && pristineSinceLastSubmit) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled =
            invalid || disabled || submitInProgress || imageUploadRequested || ready;

          const classes = classNames(css.root, className);

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedImages = images;
                handleSubmit(e);
              }}
            >
              {updateListingError ? (
                <p className={css.error}>
                  <FormattedMessage id="EditListingPhotosForm.updateFailed" />
                </p>
              ) : null}

              {this.state.selectedImage && (
                <ImageComponent onImageUploadHandler={onImageUploadHandler} />
              )}
              <>
                <AddImages
                  className={css.imagesField}
                  images={images}
                  thumbnailClassName={css.thumbnail}
                  savedImageAltText={intl.formatMessage({
                    id: 'EditListingPhotosForm.savedImageAltText',
                  })}
                  onRemoveImage={onRemoveImage}
                >
                  <Field
                    id="addImage"
                    name="addImage"
                    accept={ACCEPT_IMAGES}
                    form={null}
                    label={chooseImageText}
                    type="file"
                    disabled={imageUploadRequested}
                  >
                    {fieldprops => {
                      const { accept, input, label, disabled: fieldDisabled } = fieldprops;
                      const { name, type } = input;
                      const onChange = e => {
                        console.log(e.target.files[0], URL.createObjectURL(e.target.files[0]));
                        this.setState({
                          selectedImage: URL.createObjectURL(e.target.files[0]),
                          filePath: e.target.files[0],
                        });
                      };
                      const inputProps = { accept, id: name, name, onChange, type };
                      return (
                        <div>
                          <div className={css.addImageWrapper}>
                            <div className={css.aspectRatioWrapper}>
                              {this.state.selectedImage ? (
                                <>
                                  <button
                                    type="button"
                                    style={{
                                      border: 'unset',
                                      padding: '0 10px 10px',
                                      background: '#0532ff',
                                      color: '#fff',
                                      marginLeft: '3px',
                                      borderRadius: '30px',
                                      cursor: 'pointer',
                                      zIndex: 9999999,
                                      position: 'absolute',
                                      top: 0,
                                      right: 0,
                                    }}
                                    onClick={() => this.showCroppedImage(form)}
                                  >
                                    <svg
                                      style={{
                                        width: '100%',
                                        maxWidth: '21px',
                                        height: '100%',
                                        maxHeight: '22px',
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 50 50"
                                      width="50px"
                                      height="50px"
                                    >
                                      <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z" />
                                    </svg>
                                  </button>
                                  <EasyCrop
                                    others={{
                                      crop: this.state.crop,
                                      zoom: this.state.zoom,
                                      rotation: this.state.rotation,
                                      croppedAreaPixels: this.state.croppedAreaPixels,
                                      croppedImage: this.state.croppedImage,
                                    }}
                                    image={this.state.selectedImage}
                                    setAllCropFeatures={(data, section) =>
                                      this.setAllCropFeatures(data, section)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  {fieldDisabled ? null : (
                                    <input {...inputProps} className={css.addImageInput} />
                                  )}
                                  <label htmlFor={name} className={css.addImage}>
                                    {label}
                                  </label>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </Field>

                  <Field
                    component={props => {
                      const { input, meta } = props;
                      return (
                        <div className={css.imageRequiredWrapper}>
                          <input {...input} />
                          <ValidationError fieldMeta={meta} />
                        </div>
                      );
                    }}
                    name="images"
                    type="hidden"
                    validate={composeValidators(nonEmptyArray(imageRequiredMessage))}
                  />
                </AddImages>
              </>
              {uploadImageFailed}

              <p className={css.tip}>
                <FormattedMessage id="EditListingPhotosForm.addImagesTip" />
              </p>
              {publishListingFailed}
              {showListingFailed}

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

EditListingPhotosFormComponent.defaultProps = { fetchErrors: null, images: [] };

EditListingPhotosFormComponent.propTypes = {
  fetchErrors: shape({
    publishListingError: propTypes.error,
    showListingsError: propTypes.error,
    uploadImageError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  images: array,
  intl: intlShape.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
};

export default compose(injectIntl)(EditListingPhotosFormComponent);
