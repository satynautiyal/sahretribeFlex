import React, { useRef, useState } from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { propTypes } from '../../util/types';
import config from '../../config';
import {
  Page,
  SectionHero,
  SectionBanner,
  SectionProtected,
  // SectionHowItWorks,
  SectionLocations,
  SignupBar,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SectionFindPersonal,
  SectionFindGroup,
  SectionFindVirtual,
  FieldTextInput,
  PrimaryButton,
} from '../../components';
import { TopbarContainer } from '../../containers';
import { AuthButton } from '../../components';

import facebookImage from '../../assets/proleadFacebook.jpeg';
import twitterImage from '../../assets/proleadTwitter.jpeg';
import css from './LandingPage.module.css';
import { parse } from '../../util/urlHelpers';
import { createResourceLocatorString } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import { EmailSubscriptionForm } from '../../forms';
import * as validators from '../../util/validators';
import classNames from 'classnames';
import axios from 'axios';

export const LandingPageComponent = props => {
  const {
    history,
    intl,
    location,
    scrollingDisabled,
    rootClassName,
    className,
    currentUserListing,
    currentUserListingFetched,
    currentUser,
  } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;

  // email
  const emailLabel = intl.formatMessage({
    id: 'LoginForm.emailLabel',
  });
  const emailPlaceholder = intl.formatMessage({
    id: 'LoginForm.emailPlaceholder',
  });
  const emailRequiredMessage = intl.formatMessage({
    id: 'LoginForm.emailRequired',
  });
  const emailRequired = validators.required(emailRequiredMessage);
  const emailInvalidMessage = intl.formatMessage({
    id: 'LoginForm.emailInvalid',
  });
  const emailValid = validators.emailFormatValid(emailInvalidMessage);

  const classes = classNames(rootClassName || css.root, className);
  // const submitInProgress = inProgress;
  // const submitDisabled = invalid || submitInProgress;
  // const submitDisabled = invalid;

  const [email, setEmail] = useState('');
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { mobilemenu, mobilesearch, address, origin, bounds } = parse(location.search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });
  const sub = () => {
    fetch('https://api.apispreadsheets.com/data/u1Lz1GbxtNAm7QYA/', {
      method: 'POST',
      body: JSON.stringify({ data: { email: email } }),
    }).then(res => {
      if (res.status === 201) {
        console.log('succcc');
        setEmail('');
        // SUCCESS
      } else {
        // ERROR
        console.log('errror');
      }
    });
  };

  const ref = useRef();
  const handleScroll = () => ref.current?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = values => {
    const { currentSearchParams } = props;
    const { history } = props;

    if (values.location.search_type == 'keyword') {
      const pub_cat =
        values.location.search == 'fitness' ||
        values.location.search == 'education' ||
        values.location.search == 'creative';
      const age_cat =
        values.location.search == 'senior' ||
        values.location.search == 'adult' ||
        values.location.search == 'teen' ||
        values.location.search == 'child';

      const options = [
        { key: 'personal training', label: 'Personal training' },
        { key: 'football', label: 'Football' },
        { key: 'basketball', label: 'Basketball' },
        { key: 'swimming', label: 'Swimming' },
        { key: 'tennis', label: 'Tennis' },

        { key: 'combat sports', label: 'Combat Sports' },
        { key: 'volleyball', label: 'Volleyball' },
        { key: 'badminton', label: 'Badminton' },

        { key: 'academics', label: 'Academics' },
        { key: 'leadership', label: 'Leadership' },
        { key: 'tools', label: 'Tools' },
        { key: 'mentorship', label: 'Mentorship' },

        { key: 'languages', label: 'Languages' },
        { key: 'mathematics', label: 'Mathematics' },
        { key: 'sciences', label: 'Sciences' },
        { key: 'humanities', label: 'Humanities' },
        { key: 'leadership coaching', label: 'Leadership Coaching' },
        { key: 'professional skills', label: 'Professional Skills' },

        { key: 'dance', label: 'Dance' },
        { key: 'musical instruments', label: 'Musical instruments' },
        { key: 'visual arts', label: 'Visual arts' },

        { key: 'music theory', label: 'Music Theory' },
        { key: 'production', label: 'Production' },

        { key: 'other', label: 'Other' },
      ];

      const available_option = options.filter(
        option => values.location.search.toLowerCase() == option.key
      );

      const searchParamsk = {
        ...currentSearchParams,
        // ...originMaybe,
        // address: search,
        // bounds,

        pub_category: pub_cat ? `has_any:${values.location.search.toLowerCase()}` : null,
        pub_activity:
          !pub_cat && !age_cat && available_option?.length > 0
            ? `${values.location.search.toLowerCase()}`
            : null,
        pub_ageCategory: age_cat ? `has_any:${values.location.search.toLowerCase()}` : null,
        keywords:
          !pub_cat && !age_cat && available_option?.length === 0
            ? `${values.location.search.toLowerCase()}`
            : null,
      };
      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParamsk)
      );
    }
    // else{
    //   const { search, selectedPlace } = values.location;
    //   const { origin, bounds } = selectedPlace;
    //   const originMaybe = config.sortSearchByDistance ? { origin } : {};
    //   const searchParams = {
    //     ...currentSearchParams,
    //     ...originMaybe,
    //     address: search,
    //     bounds,
    //   };
    //   history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));

    // }
  };

  // Only render current search if full place object is available in the URL params
  const locationFieldsPresent = config.sortSearchByDistance
    ? address && origin && bounds
    : address && bounds;
  const initialSearchFormValues = {
    location: locationFieldsPresent
      ? {
          search: address,
          selectedPlace: { address, origin, bounds },
        }
      : null,
  };

  //Make CategoriesPage to be the landing page for authorized users
  if (currentUser?.id) {
    history.push(createResourceLocatorString('CategoriesPage', routeConfiguration(), {}));
  }

  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
      ]}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage],
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.heroContainer}>
            <SectionHero
              className={css.hero}
              history={history}
              location={location}
              onSearchSubmit={handleSubmit}
              initialSearchFormValues={initialSearchFormValues}
            />
          </div>
          <div className={css.sectionContent}>
            <SectionFindPersonal ref={ref} />
            <SectionFindGroup />
            <SectionFindVirtual />
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <div className={css.emailSection}>
            <div className={css.emailForm}>
              <div className={css.leftEmailSection}>
                <h2 className={css.emailSectionHeader}>Stay updated</h2>
                <p>Subscribe to our mailing list to get updates on our latest promos and news.</p>
              </div>
              {/* <FieldTextInput
              type="email"
              id="subscriptionEmail"
              name="email"
              autoComplete="email"
              label={emailLabel}
              placeholder={emailPlaceholder}
              validate={validators.composeValidators(emailRequired, emailValid)}
            /> */}
              <div className={css.rightEmailSection}>
                <div>
                  <p className={css.emailLabel}>
                    Email<span className={css.red}>*</span>
                  </p>
                  <input
                    className={css.emailSectionInput}
                    value={email}
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                  ></input>
                </div>
                <PrimaryButton
                  className={css.emailButton}
                  onClick={sub}
                  inProgress={submitInProgress}
                  // disabled={submitDisabled}
                >
                  <FormattedMessage id="Submit" />
                </PrimaryButton>
              </div>
            </div>
            {/* </div> */}
          </div>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

LandingPageComponent.defaultProps = {
  currentUserListing: null,
  currentUserListingFetched: false,
};

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,

  // from withRouter
  history: object.isRequired, //what's purpose of this?
  location: object.isRequired, //what's purpose of this?

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUserListing, currentUserListingFetched, currentUser } = state.user;

  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUserListing,
    currentUserListingFetched,
    currentUser,
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(withRouter, connect(mapStateToProps), injectIntl)(LandingPageComponent);

export default LandingPage;
