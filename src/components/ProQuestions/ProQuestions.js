import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import css from './ProQuestions.module.css';

const ProQuestions = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <div className={css.faqContent}>
        <div className={css.faqQ}>
          <input id="q0" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q0" className={css.panelTitle}>Do I need to be certified to sign up with Prolead?</label>
          <div className={css.panelContent}>You do not need to be certified to sign up to coach on Prolead.
            At Prolead we believe that if you have been playing sports at an elite level for the majority of your
            life - you are able to train people by showing your routines and helping people get to the next level.
            With that being said, having a certification will most likely lend you even more clients.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q5" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q5" className={css.panelTitle}>I am not a US resident. Can I still apply to coach on Prolead Platform?</label>
          <div className={css.panelContent}>
            At this time, we are not an international company and therefore can not process payments outside of the United States. With that
            being said, please do let us know where you are based, as we would love to provide service in your area as soon as possible. You can do so by email us at support@proled.app.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q1" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q1" className={css.panelTitle}>Where can I train my clients?</label>
          <div className={css.panelContent}>	You are responsible for adding training locations and/or facilities
            to your profile where you are able to train your clients. The locations can include but not limited
            to tracks, parks, gyms, studios, etc. We encourage you to also include the miles you are willing
            to travel from your location to a client as there are many clients who already have a facility or location in mind.
          </div>
        </div>
      </div>
    </div>
  );
};

ProQuestions.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

ProQuestions.propTypes = {
  rootClassName: string,
  className: string,
};

export default ProQuestions;
