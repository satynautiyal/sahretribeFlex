import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import css from './HelpGeneralQs.module.css';
import { ExternalLink } from '../index';

const HelpGeneralQs = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <div className={css.faqContent}>
        <div className={css.faqQ}>
          <input id="q1" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q1" className={css.panelTitle}><FormattedMessage id="SectionProtected.questionTitle" /></label>
          <div className={css.panelContent}>
            <FormattedMessage id="SectionProtected.statement1" />
            <br/>
            <br/>
            <FormattedMessage id="SectionProtected.statement2" />
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q2" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q2" className={css.panelTitle}>How does it work?</label>
          <div className={css.panelContent}>Get started on ProLed in just 3 easy steps: <br/>
            <ol>
              <li><span className={css.secondTitle}>Discover Your Activity</span> - Use the search box to find what you want to learn, and select a PRO who matches your interests.</li>
              <li><span className={css.secondTitle}>Book Your Session</span> - Choose your preferred date and time, book your session, and chat with your PRO. </li>
              <li><span className={css.secondTitle}>Achieve Your Goals</span> - Enjoy your session with the PRO and watch your skills level up!</li>
            </ol>
              {/* <FormattedMessage id="HelpGeneralPage.heading" /> */}
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q3" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q3" className={css.panelTitle}>What are ProLed's policies?</label>
          <div className={css.panelContent}>
            <ul className={css.faqList}>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Accessibility</li>
              <li>LEARNER Agreement</li>
              <li>PRO Agreement</li>
            </ul>
            To learn more about our policies please reach out to us via&nbsp;
            <ExternalLink href="mailto:support@proled.app?subject=General Inquiry" data-content="support@proled.app" data-type="mail" className={css.link}>
              <FormattedMessage id="Footer.goToEmail" />
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
};

HelpGeneralQs.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HelpGeneralQs.propTypes = {
  rootClassName: string,
  className: string,
};

export default HelpGeneralQs;
