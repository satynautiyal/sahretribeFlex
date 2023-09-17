import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionBanner.module.css';

const SectionBanner = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <div className={css.contentLeft}>
          <h2 className={css.heroMainTitle}>
            <FormattedMessage id="SectionBanner.title" />
          </h2>
          {/* <NamedLink
            name="AboutPage"
            className={css.heroButton}
          >
            <FormattedMessage id="SectionBanner.learnButton" />
          </NamedLink> */}
        </div>
      </div>
    </div>
  );
};

SectionBanner.defaultProps = { rootClassName: null, className: null };

SectionBanner.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionBanner;
