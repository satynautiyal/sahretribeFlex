import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import css from './Footnote.module.css';

const Footnote = props => {
  const { rootClassName, className, intl, message } = props;
  const classes = classNames(rootClassName || css.root, className);

  return <div className={classes}>{message}</div>;
};

Footnote.defaultProps = {
  rootClassName: null,
  className: null,
};

Footnote.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

export default injectIntl(Footnote);
