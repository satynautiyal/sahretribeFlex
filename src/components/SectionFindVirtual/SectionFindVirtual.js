import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { NamedLink } from '../../components';

import css from './SectionFindVirtual.module.css';
import image from '../../assets/virtual.jpeg';

const creditString = 'Computer photo created by master1305 - www.freepik.com';

const SectionFindVirtual = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.steps}>
        <div className={css.stepLeft}>
          <div className={css.imgWrapper}>
            <img className={css.imgs} src={image} alt={creditString} />
          </div>
        </div>
        <div className={css.stepRight}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionFindVirtual.title" />
          </h2>
          <p>
            <FormattedMessage id="SectionFindVirtual.subtitle" />
          </p>
          <div className={css.buttonWrapper}>
            <NamedLink
              name="SearchPage"
              to={{
                search:
                  'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&pub_category=has_any%3Acreative',
              }}
              className={css.startButton}
            >
              <FormattedMessage id="SectionFindVirtual.action" />
            </NamedLink>
          </div>
        </div>
      </div>
    </div>
  );
};

SectionFindVirtual.defaultProps = {
  rootClassName: null,
  className: null,
};

SectionFindVirtual.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionFindVirtual;
