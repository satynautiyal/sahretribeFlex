import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './SectionCustomFieldsMaybe.module.css';

const SectionCustomFieldsMaybe = props => {
  const { listing } = props;
  if (!listing) {
    return null;
  }

  const { privateData, publicData } = listing && listing.attributes;

  return (
    <div className={css.sectionCustomFields}>
      {publicData && publicData?.about ? (
        <div className={css.section}>
          <h3 className={css.title}>
            <FormattedMessage id="ListingPage.aboutTitle" />
          </h3>
          <div className={css.sectionAbout}>
            <div className={css.customFieldValue}>
              {publicData?.about.split('\n\n').map((paragraph, index) => (
                <h3 key={index}>{paragraph}</h3>
              ))}
              {/* <h3><pre>{publicData?.about}</pre></h3> */}
            </div>
          </div>
        </div>
      ) : null}

      {publicData && publicData?.rules ? (
        <div className={css.section}>
          <h3 className={css.title}>
            <FormattedMessage id="EditListingPoliciesForm.rulesLabel" />
          </h3>
          <div className={css.customFieldValue}>
            {publicData?.rules.split('\n\n').map((paragraph, index) => (
              <h3 key={index}>{paragraph}</h3>
            ))}
            {/* <h3><pre>{publicData?.rules}</pre></h3> */}
          </div>
        </div>
      ) : null}

      {publicData && publicData?.achieve ? (
        <div className={css.section}>
          <h3 className={css.title}>
            <FormattedMessage id="What will learners achieve from your session?" />
          </h3>
          <div className={css.customFieldValue}>
            {publicData?.achieve.split('\n\n').map((paragraph, index) => (
              <h3 key={index}>{paragraph}</h3>
            ))}
            {/* <h3><pre>{publicData?.achieve}</pre></h3> */}
          </div>
        </div>
      ) : null}

      {publicData && publicData?.ageCategory.length ? (
        <div className={css.section}>
          <h3 className={css.title}>
            <FormattedMessage id="What age groups do you specialise in?" />
          </h3>
          <div className={css.customFieldValue}>{publicData?.ageCategory.join(', ')}</div>
        </div>
      ) : null}

      {publicData && publicData?.virtualTraining ? (
        <div className={css.section}>
          <h3 className={css.title}>
            <FormattedMessage id="EditListingTrainingPreferencesForm.virtualTrainingLabel" />
          </h3>
          <div className={css.customFieldValue}>
            {publicData.virtualTraining.includes('yes') ? 'yes' : 'no'}
          </div>
        </div>
      ) : null}

      {publicData && publicData?.travelWilling ? (
        <div className={css.section}>
          <h3 className={css.title}>
            <FormattedMessage id="EditListingTrainingPreferencesForm.distanceMessage" />
          </h3>
          <div className={css.customFieldValue}>{publicData?.travelWilling}</div>
        </div>
      ) : null}

      {/* {publicData && publicData.distance ? (
        <div className={css.sectionDistance}>
          <h3 className={css.customFieldtitle}>
            <FormattedMessage id="ListingPage.distanceTitle" />
          </h3>
          <div className={css.customFieldValue}>{publicData.distance + ' miles'}</div>
        </div>
      ) : null} */}
    </div>
  );
};

export default SectionCustomFieldsMaybe;
