import React, { forwardRef } from 'react';
import { bool, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { OwnListingLink, NamedLink } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearchLocation,
  faCalendarAlt,
  faLongArrowAltRight,
  faClipboardCheck,
  faClipboardList,
  faUserEdit,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import image from '../../assets/device.png';

import css from './SectionHowBecomeCoach.module.css';

const SectionHowBecomeCoach = forwardRef(function(props, ref) {
  const {
    rootClassName,
    className,
    currentUserListing,
    currentUserListingFetched,
    buttonLinkName,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.container} ref={ref}>
        <div className={css.steps}>
          <div className={css.title}>
            <FormattedMessage id="How do I become a " />
            <span className={css.titleBlue}>
              <FormattedMessage id="PRO" />
            </span>
            ?
            <br />
          </div>
          <div className={css.step}>
            <div className={css.iconWrapper}>
              <FontAwesomeIcon className={css.icon} icon={faUserEdit} size={'2x'} />
            </div>
            <div className={css.textWrapper}>
              <h2 className={css.stepTitle}>
                <FormattedMessage id="Sign up for free (10 minutes)" />
              </h2>
              <p className={css.stepSubtitle}>
                <FormattedMessage id="Set up your profile, schedule your availabilities, list your price and submit your profile. Our team will review your profile within 24 hours." />
              </p>
            </div>
          </div>

          <div className={css.step}>
            <div className={css.iconWrapper}>
              <FontAwesomeIcon className={css.icon} icon={faCalendarAlt} size={'3x'} />
            </div>
            <div className={css.textWrapperAligned}>
              <h2 className={css.stepTitle}>
                <FormattedMessage id="Host your session" />
              </h2>
              <p className={css.stepSubtitle}>
                <FormattedMessage id="Get notified via email when a learner reaches out to you and chat on our platform to discuss session details." />
              </p>
            </div>
          </div>

          <div className={css.step}>
            <div className={css.iconWrapper}>
              {/* <IconUser className={css.icon} /> */}
              <FontAwesomeIcon className={css.icon} icon={faFileInvoiceDollar} size={'3x'} />
            </div>
            <div className={css.textWrapper}>
              <h2 className={css.stepTitle}>
                <FormattedMessage id="Get Paid" />
              </h2>
              <p className={css.stepSubtitle}>
                <FormattedMessage id="Clients can pay through Apple Pay, Pay Now, and Card payments, with the total amount deposited directly into your bank account." />
              </p>
            </div>
          </div>
        </div>
        <div className={css.imageContainer}>
          <img className={css.img} src={image} alt={'device'} />
        </div>
      </div>
      {/* <div className={css.buttonWrapper}>
        <NamedLink
          name={buttonLinkName ? buttonLinkName : 'SearchPage'}
          className={css.startButton}
        >
          <FormattedMessage id="SectionHowItWorks.getStarted" />
        </NamedLink>
      </div> */}
      {/* {currentUserListing ? (
        <div className={css.createListingLink}>
          <OwnListingLink listing={currentUserListing} listingFetched={currentUserListingFetched}>
            <FormattedMessage id="SectionHowItWorks.createListingLink" />
          </OwnListingLink>
        </div>
      ) : null} */}
    </div>
  );
});

SectionHowBecomeCoach.defaultProps = {
  rootClassName: null,
  className: null,
  currentUserListing: null,
  currentUserListingFetched: false,
  buttonLinkName: null,
};

SectionHowBecomeCoach.propTypes = {
  rootClassName: string,
  className: string,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  buttonLinkName: string,
};

export default SectionHowBecomeCoach;
