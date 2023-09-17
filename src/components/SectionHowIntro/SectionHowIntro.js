import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import css from './SectionHowIntro.module.css';
import image from '../../assets/howWorks.jpeg';
import NamedLink from '../NamedLink/NamedLink';

const SectionHowIntro = props => {
  const { rootClassName, className, handleScroll } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.introContainer}>
        <div className={css.containerLeft}>
          <div>
            <div className={css.title}>
              <FormattedMessage id="SectionHowIntro.title" />
              <br />
            </div>
            <div className={css.subtitle}>
              <p>
                <FormattedMessage id="SectionHowIntro.subtitle1" />
              </p>
              <p>
                <FormattedMessage id="SectionHowIntro.subtitle2" />
              </p>
              <div className={css.buttonWrapper}>
                <div>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search: 'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873',
                    }}
                    className={css.startButton}
                  >
                    <FormattedMessage id="Find a PRO" />
                  </NamedLink>
                </div>
                <div className={css.buttonStyles} onClick={handleScroll}>
                  <FormattedMessage id="Learn More" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={css.containerRight}>
          <div className={css.imgWrapper}>
            <img className={css.imgs} src={image} />
          </div>
        </div>
      </div>
    </div>
  );
};

SectionHowIntro.defaultProps = {
  rootClassName: null,
  className: null,
};

SectionHowIntro.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowIntro;
