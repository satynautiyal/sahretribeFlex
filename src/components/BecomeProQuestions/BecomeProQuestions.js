import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import css from './BecomeProQuestions.module.css';

const BecomeProQuestions = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <div className={css.faqContent}>
        <div className={css.faqQ}>
          <input id="q0" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q0" className={css.panelTitle}>
          How will clients discover my profile on ProLed?
          </label>
          <div className={css.panelContent}>
          Clients can easily locate you on ProLed using our user-friendly search function. This feature enables prospective learners to browse various profiles of PROs to identify the one that piques interest. Once they've found your profile, they have the option to directly schedule a session or get in touch with you. Rest assured, you'll receive email notifications whenever a potential learner initiates a booking request or sends a message via our platform.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q1" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q1" className={css.panelTitle}>Do I need to be certified to sign up with ProLed? </label>
          <div className={css.panelContent}>
          No certification is required to sign up as a PRO on ProLed. We believe that everyone has valuable skills to share, whether it's a passion or a profession. While certifications and extensive experience can attract more clients, we welcome all skilled individuals to join our platform and showcase their expertise. Your unique talents are highly valued, and we're excited to help you connect with learners who are eager to learn from you.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q2" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q2" className={css.panelTitle}>Does ProLed charge any fees?</label>
          <div className={css.panelContent}>Unlike agencies, we have no commission or referral fees. Creating your profile and listing your service is free. Plus, there's no membership or subscription fees. We only have a 10% service fee per booking transaction that you can take into account when setting your desired price.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q3" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q3" className={css.panelTitle}>When do I get paid?</label>
          <div className={css.panelContent}>Payment is processed instantly after your complete your session. We understand the importance of timely payments, and to ensure your peace of mind, we'll send you an email on the day the payment is processed, confirming that your payment has been sent and processed successfully.
          </div>
        </div>
      </div>
    </div>
  );
};

BecomeProQuestions.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

BecomeProQuestions.propTypes = {
  rootClassName: string,
  className: string,
};

export default BecomeProQuestions;
