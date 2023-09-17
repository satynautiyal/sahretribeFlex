import React from 'react';
import { bool, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { OwnListingLink, NamedLink } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearchLocation,
  faCalendarAlt,
  faLongArrowAltRight,
  faClipboardCheck,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';

import css from './SectionHowItWorks.module.css';

const SectionHowItWorks = props => {
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
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.titleLineOne" />
        <br />
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          <div className={css.iconWrapper}>
            <FontAwesomeIcon icon={faSearchLocation} size={'3x'} />
          </div>
          <h2 className={css.stepTitle}>
            <NamedLink
              name="SearchPage"
              to={{
                search: 'bounds=43.39822896%2C-113.50162824%2C30.08037779%2C-125.21679913',
              }}
              className={css.link}
            >
              <FormattedMessage id="SectionHowItWorks.part1Title" />
            </NamedLink>
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.part1Text" />
          </p>
        </div>

        <div className={css.step}>
          <div className={css.iconWrapper}>
            <FontAwesomeIcon icon={faCalendarAlt} size={'3x'} />
          </div>
          <h2 className={css.stepTitle}>
            <NamedLink
              name="SearchPage"
              to={{
                search: 'bounds=43.39822896%2C-113.50162824%2C30.08037779%2C-125.21679913',
              }}
              className={css.link}
            >
              <FormattedMessage id="SectionHowItWorks.part2Title" />
            </NamedLink>
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.part2Text" />
          </p>
        </div>

        <div className={css.step}>
          <div className={css.iconWrapper}>
            <FontAwesomeIcon icon={faClipboardList} size={'3x'} />
            &nbsp;
            <FontAwesomeIcon icon={faLongArrowAltRight} size={'3x'} />
            &nbsp;
            <FontAwesomeIcon icon={faClipboardCheck} size={'3x'} />
          </div>
          <h2 className={css.stepTitle}>
            <NamedLink
              name="SearchPage"
              to={{
                search: 'bounds=43.39822896%2C-113.50162824%2C30.08037779%2C-125.21679913',
              }}
              className={css.link}
            >
              <FormattedMessage id="SectionHowItWorks.part3Title" />
            </NamedLink>
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.part3Text" />
          </p>
        </div>
      </div>
      <div className={css.buttonWrapper}>
        <NamedLink
          name={buttonLinkName ? buttonLinkName : 'SearchPage'}
          className={css.startButton}
        >
          <FormattedMessage id="SectionHowItWorks.getStarted" />
        </NamedLink>
      </div>
      {currentUserListing ? (
        <div className={css.createListingLink}>
          <OwnListingLink listing={currentUserListing} listingFetched={currentUserListingFetched}>
            <FormattedMessage id="SectionHowItWorks.createListingLink" />
          </OwnListingLink>
        </div>
      ) : null}
    </div>
  );
};

SectionHowItWorks.defaultProps = {
  rootClassName: null,
  className: null,
  currentUserListing: null,
  currentUserListingFetched: false,
  buttonLinkName: null,
};

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  buttonLinkName: string,
};

export default SectionHowItWorks;
