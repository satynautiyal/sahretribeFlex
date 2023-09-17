import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { NamedLink } from '../../components';

import css from './SectionFindGroup.module.css';
import image from '../../assets/group.jpeg';

const SectionFindGroup = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.steps}>
        <div className={css.stepLeft}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionFindGroup.title" />
          </h2>
          <p>
            <FormattedMessage id="SectionFindGroup.subtitle" />
          </p>
          <div className={css.buttonWrapper}>
            <NamedLink
              name="SearchPage"
              to={{
                search:
                  'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&pub_category=has_any%3Aeducation',
              }}
              className={css.startButton}
            >
              <FormattedMessage id="SectionFindGroup.action" />
            </NamedLink>
          </div>
        </div>
        <div className={css.stepRight}>
          <div className={css.imgWrapper}>
            <img className={css.imgs} src={image} />
          </div>
        </div>
      </div>
    </div>
  );
};

SectionFindGroup.defaultProps = {
  rootClassName: null,
  className: null,
};

SectionFindGroup.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionFindGroup;
