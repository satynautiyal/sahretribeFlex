import React, { forwardRef } from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { NamedLink } from '../../components';

import css from './SectionFindPersonal.module.css';
import image from '../../assets/personal.jpeg';

const SectionFindPersonal = forwardRef(function(props, ref) {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes} ref={ref}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowIntro.title2" />
        <br />
      </div>
      <div className={css.steps}>
        <div className={css.stepLeft}>
          <div className={css.imgWrapper}>
            <img className={css.imgs} src={image} />
          </div>
        </div>
        <div className={css.stepRight}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionFindPersonal.title" />
          </h2>
          <p>
            <FormattedMessage id="SectionFindPersonal.subtitle" />
          </p>
          <div className={css.buttonWrapper}>
            <NamedLink
              name="SearchPage"
              to={{
                search:
                  'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&pub_category=has_any%3Afitness',
              }}
              className={css.startButton}
            >
              <FormattedMessage id="SectionFindPersonal.action" />
            </NamedLink>
          </div>
        </div>
      </div>
    </div>
  );
});

SectionFindPersonal.defaultProps = {
  rootClassName: null,
  className: null,
};

SectionFindPersonal.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionFindPersonal;
