import React from 'react';
import { bool, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { OwnListingLink, NamedLink } from '../../components';

import css from './SignupBar.module.css';

const SignupBar = props => {
  const { rootClassName, className, currentUserListing, currentUserListingFetched } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes} id={css.section}>
      <div className={css.steps}>
        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <NamedLink name="SignupPage" className={css.link}>
              <FormattedMessage id="SignupBar.client" />
            </NamedLink>
          </h2>
        </div>

        <div className={css.step}></div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <NamedLink name="NewListingPage" className={css.link}>
              <FormattedMessage id="SignupBar.trainer" />
            </NamedLink>
          </h2>
        </div>
      </div>
      <div className={css.createListingLink}>
        <OwnListingLink listing={currentUserListing} listingFetched={currentUserListingFetched}>
          <FormattedMessage id="SectionHowItWorks.createListingLink" />
        </OwnListingLink>
      </div>
    </div>
  );
};

SignupBar.defaultProps = {
  rootClassName: null,
  className: null,
  currentUserListing: null,
  currentUserListingFetched: false,
};

SignupBar.propTypes = {
  rootClassName: string,
  className: string,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
};

export default SignupBar;
