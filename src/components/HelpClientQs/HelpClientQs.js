import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import css from './HelpClientQs.module.css';
import { ExternalLink } from '../index';

const HelpClientQs = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <div className={css.faqTitle}>
        <h2>Finding a PRO</h2>
      </div>
      <div className={css.faqContent}>
        <div className={css.faqQ}>
          <input id="q1" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q1" className={css.panelTitle}>Is it possible to schedule a session for tomorrow?</label>
          <div className={css.panelContent}>It is possible if the PRO agrees to provide a lesson
            during your suggested time, but we do not guarantee if the times will be available.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q2" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q2" className={css.panelTitle}>Can I book more than one PRO?</label>
          <div className={css.panelContent}>Learners are allowed to schedule sessions with
            as many PROs as they would like. 
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q3" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q3" className={css.panelTitle}>Can I book a PRO for services other than training or teaching?</label>
          <div className={css.panelContent}>ProLed does not allow the facilitation of services other than provided on the PRO's page. If you have
            questions about your specific request, please email us at support@proled.app or at&nbsp;
            <ExternalLink href="mailto:support@proled.app?subject=General Inquiry" data-content="support@proled.app" data-type="mail" className={css.contactUsLink}>
              <FormattedMessage id="Footer.goToEmail" />
            </ExternalLink>.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q4" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q4" className={css.panelTitle}>Can ProLed PROs offer in-home training? </label>
          <div className={css.panelContent}>Many PROs that are listed on our platform have the necessary equipment and
            are happy to provide in-home sessions. If you are interested in having an in-home training just ask the PRO directly.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q5" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q5" className={css.panelTitle}><FormattedMessage id="HelpClientQs.placeQuestionTitle" /></label>
          <div className={css.panelContent}><FormattedMessage id="HelpClientQs.placeQuestionContent" />
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q6" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q6" className={css.panelTitle}><FormattedMessage id="HelpClientQs.howToMessageQuestionTitle" /></label>
          <div className={css.panelContent}><FormattedMessage id="HelpClientQs.howToMessageQuestionContent" />
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q7" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q7" className={css.panelTitle}>How are ProLed PROs vetted?</label>
          <div className={css.panelContent}>All PROs are checked against the national sex offender list, answer questions concerning their criminal history, their
            certifications are cross-referenced with the certifying body in question, and are personally vetted by our PRO hiring team. The criteria to
            qualify to be a ProLed PRO varies case by case basis.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q8" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q8" className={css.panelTitle}>How does ProLed's Platform work?</label>
          <div className={css.panelContent}>ProLed helps you find and book personal or group
            sessions led by PROs who act as your instructors. Simply create
            an account and you are ready to browse listed freelancers in Fitness, Education, and Creative fields.
            Next, select a PRO that you would like to book, check their availability, and schedule a session.
            Then the PRO will contact you via in-web messaging to finalize the details of the session such as location and training needs.
            Once the details are set, you are ready for the session. Enjoy!
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q9" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q9" className={css.panelTitle}>Why can't I share an email address or phone number with my PRO?</label>
          <div className={css.panelContent}>To protect you under our Terms of Use, including your personal information, all written
            correspondence with the PRO should be conducted within ProLed in-app/in-web messages. We help with any problems that
            may arise while you are booking a session, when things like scheduling, pricing, cancellations, or any payment disputes arise.
          </div>
        </div>
        <div className={css.faqTitle}>
          <h2>Payment</h2>
        </div>
        <div className={css.faqQ}>
          <input id="q10" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q10" className={css.panelTitle}><FormattedMessage id="HelpClientQs.paymentTypeQuestionTitle" /></label>
          <div className={css.panelContent}><FormattedMessage id="HelpClientQs.paymentTypeQuestionContent" />
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q11" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q11" className={css.panelTitle}>When will I be charged for my session? </label>
          <div className={css.panelContent}>All sessions are prepaid. This means you will be charged once a PRO confirms your booking request.
          </div>
        </div>

        <div className={css.faqTitle}>
          <h2>Account</h2>
        </div>
        <div className={css.faqQ}>
          <input id="q12" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q12" className={css.panelTitle}>How do I close my account?</label>
          <div className={css.panelContent}> Please email us at&nbsp; <ExternalLink href="mailto:support@proled.app?subject=General Inquiry" data-content="support@proled.app" data-type="mail" className={css.contactUsLink}>
            <FormattedMessage id="Footer.goToEmail" />
          </ExternalLink>. We will first make sure that there are no
            outstanding payments to be made and then will respond to your request within 48 hours to confirm that your account has been closed.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q13" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q13" className={css.panelTitle}>How do I edit my account?</label>
          <div className={css.panelContent}>Click on LEARNER dashboard and then "edit my profile". 
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q14" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q14" className={css.panelTitle}>How do I manage or update my payment information?</label>
          <div className={css.panelContent}>This information can be managed under "Settings" -> "Payment Methods".
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q15" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q15" className={css.panelTitle}>How do I reset my password?</label>
          <div className={css.panelContent}>In the case you forgot your password, during the "Sign in" process please
            click on "Forgot Password?". You will receive an email with a link on how to reset your password.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q16" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q16" className={css.panelTitle}>My account has been closed. How can I reopen it?</label>
          <div className={css.panelContent}>Please email us at&nbsp; <ExternalLink href="mailto:support@proled.app?subject=General Inquiry" data-content="support@proled.app" data-type="mail" className={css.contactUsLink}>
            <FormattedMessage id="Footer.goToEmail" />
          </ExternalLink> and we will get back to you within 48 hours.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q20" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q20" className={css.panelTitle}>Why do I have to add payment information?</label>
          <div className={css.panelContent}>By adding your payment information you make it easy to process your payments
            as well as it ensures that PROs that are listed on ProLed are only being contacted by clients who are ready for sessions.
          </div>
        </div>
        <div className={css.faqTitle}>
          <h2>Sessions</h2>
        </div>
        <div className={css.faqQ}>
          <input id="q17" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q17" className={css.panelTitle}>Can I get a refund for a session?</label>
          <div className={css.panelContent}>If you do not like your first session, then we will switch
            you to a new PRO at no additional cost (Note: the PRO has to have the same hourly
            rate as the one you booked previously). We may provide a refund if we are unable to switch you to a new PRO.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q18" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q18" className={css.panelTitle}>How long does it take to process a refund? </label>
          <div className={css.panelContent}> Refunds will usually appear in your bank account within 2-3 business days.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q19" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q19" className={css.panelTitle}>How long does each session last?</label>
          <div className={css.panelContent}>Each session typically lasts exactly 1 hour. If you prefer to train longer hours,
            please discuss it with your PRO and then purchase one of the bundles to save more money on your sessions.
          </div>
        </div>
      </div>
    </div>
  );
};

HelpClientQs.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HelpClientQs.propTypes = {
  rootClassName: string,
  className: string,
};

export default HelpClientQs;
