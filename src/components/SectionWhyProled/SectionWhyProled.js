import React, { forwardRef } from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { NamedLink } from '..';

import css from './SectionWhyProled.module.css';
import personalImage from '../../assets/personal.jpeg';
import groupImage from '../../assets/group.jpeg';
import virtualImage from '../../assets/virtual.jpeg';

const SectionWhyProled = forwardRef(function(props, ref) {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <>
      <div className={classes} ref={ref}>
        <div className={css.title}>
          <FormattedMessage id="Why Proled?" />
          <br />
        </div>
        <div className={css.steps}>
          <div className={css.stepLeft}>
            <div className={css.imgWrapper}>
              <img className={css.imgs} src={personalImage} alt={'Personal training'} />
            </div>
          </div>
          <div className={css.stepRight}>
            <h2 className={css.stepTitle}>
              <FormattedMessage id="Reach new clients" />
            </h2>
            <p>
              <FormattedMessage id="Athletes and parents will message you and book training." />
            </p>
          </div>
        </div>
      </div>

      <div className={classes}>
        <div className={css.steps}>
          <div className={css.stepLeft}>
            <h2 className={css.stepTitle}>
              <FormattedMessage id="Manage your business" />
            </h2>
            <p>
              <FormattedMessage id="Set your own rates, manage your schedule, and receive payments." />
            </p>
          </div>
          <div className={css.stepRight}>
            <div className={css.imgWrapper}>
              <img className={css.imgs} src={groupImage} alt={'Group training'} />
            </div>
          </div>
        </div>
      </div>

      <div className={classes}>
        <div className={css.steps}>
          <div className={css.stepLeft}>
            <div className={css.imgWrapper}>
              <img className={css.imgs} src={virtualImage} alt={'Virtual training'} />
            </div>
          </div>
          <div className={css.stepRight}>
            <h2 className={css.stepTitle}>
              <FormattedMessage id="No fees to join" />
            </h2>
            <p>
              <FormattedMessage id="Your profile is free. There's no membership fees and no subscription fees. We only take 10% commission per training. We do not get paid unless you do!" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

SectionWhyProled.defaultProps = {
  rootClassName: null,
  className: null,
};

SectionWhyProled.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionWhyProled;
