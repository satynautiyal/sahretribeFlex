import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { NamedLink } from '..';

import css from './SectionBecomeProIntro.module.css';
import image from '../../assets/BecomePro.png';
import group from '../../assets/groupIcon.png';
import calendar from '../../assets/calendar.png';
import card from '../../assets/card.png';
import pay from '../../assets/pay.png';

const SectionBecomeProIntro = props => {
  const { rootClassName, className, isUserLoggedIn, handleScroll } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.steps}>
        <NamedLink
          name="SearchPage"
          to={{
            search: 'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873',
          }}
        >
          <img src={image} className={css.image} />
        </NamedLink>
        <div className={css.stepLeft}>
          <p className={css.stepText}>
            <h1 className={css.stepTitle}>
              Grow your freelancing business and attract more clients -{' '}
              <span className={css.stepTitleBold}>for free!</span>
            </h1>
            <p className={css.stepSubTitle}>
              Join our team of Fitness, Education, and Creative freelancers that grow and scale
              their careers with ProLed - Apply to be a PRO today.
            </p>
          </p>
          <div className={css.stepContainer}>
            <img src={group} className={css.icon} />
            <p className={css.stepText}>
              <span className={css.stepTextBold}>Targeted Audience:</span> Connect with learners
              ready to book a PRO.
            </p>
          </div>
          <div className={css.stepContainer}>
            <img src={calendar} className={css.icon} />
            <p className={css.stepText}>
              <span className={css.stepTextBold}>Full Autonomy:</span> Control your profile,
              schedule, pricing, and clients independently.
            </p>
          </div>
          <div className={css.stepContainer}>
            <img src={pay} className={css.icon} />
            <p className={css.stepText}>
              <span className={css.stepTextBold}>No Commission:</span> Keep your earnings, in return
              we charge a 10% service fee per booking to keep our platform running.
            </p>
          </div>
          <div className={css.stepContainer}>
            <img src={card} className={css.icon} />
            <p className={css.stepText}>
              <span className={css.stepTextBold}>Secure Payments:</span> Pre-payments for sessions,
              with direct transfer to your bank account post-session.
            </p>
          </div>

          <div className={css.buttonWrapper}>
            <div className={css.buttonContainer}>
              <div>
                <NamedLink name={'NewListingPage'} className={css.startButton}>
                  <FormattedMessage id="Become A Pro" />
                </NamedLink>
              </div>
              <div className={css.buttonStyles} onClick={handleScroll}>
                <FormattedMessage id="Learn More" />
              </div>
            </div>
          </div>
          {/* <div className={css.stepRight}>
          <div className={css.imgWrapper}>
            <img className={css.imgs} src={image} />
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

SectionBecomeProIntro.defaultProps = {
  rootClassName: null,
  className: null,
};

SectionBecomeProIntro.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionBecomeProIntro;
