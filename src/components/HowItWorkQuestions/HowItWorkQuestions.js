import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import css from './HowItWorkQuestions.module.css';

const HowItWorkQuestions = props => {
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
            <FormattedMessage id="HelpClientQs.placeQuestionTitle" />
          </label>
          <div className={css.panelContent}>
            <FormattedMessage id="HelpClientQs.placeQuestionContent" />
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q5" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q5" className={css.panelTitle}><FormattedMessage id="HelpClientQs.paymentTypeQuestionTitle" /></label>
          <div className={css.panelContent}>
            <FormattedMessage id="HelpClientQs.paymentTypeQuestionContent" />
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q1" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q1" className={css.panelTitle}><FormattedMessage id="HelpClientQs.howToMessageQuestionTitle" /></label>
          <div className={css.panelContent}><FormattedMessage id="HelpClientQs.howToMessageQuestionContent" />
          </div>
        </div>
      </div>
    </div>
  );
};

HowItWorkQuestions.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HowItWorkQuestions.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowItWorkQuestions;
