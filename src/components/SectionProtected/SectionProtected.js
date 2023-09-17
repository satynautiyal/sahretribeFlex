import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import css from './SectionProtected.module.css';
import image from './heart_hands.svg';

const SectionProtected = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes} id={css.section}>
      <div className={css.handIcon}>
        <img className={css.logo} src={image} alt="Prolead Logo" />
      </div>
      <div className={css.title}>
        <FormattedMessage id="SectionProtected.title" />
        <br />
      </div>
      <div className={css.sectionContainer}>
        <p className={css.sectionInfo}>
          <FormattedMessage id="SectionProtected.statement" />
        </p>
      </div>
    </div>
  );
};

SectionProtected.defaultProps = {
  rootClassName: null,
  className: null,
};

SectionProtected.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionProtected;
