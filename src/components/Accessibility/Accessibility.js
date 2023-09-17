import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Accessibility.module.css';
import { ExternalLink } from '../index';
import { FormattedMessage } from 'react-intl';

const Accessibility = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p>
        Prolead is committed to developing our website and its content to be accessible and user-friendly to every visitor.
        If you are having difficulties navigating or viewing the content on any of our pages that you believe is not fully accessible
        to people with disabilities, please don't hesitate to contact us at&nbsp;
        <ExternalLink href="mailto:support@proled.app?subject=General Inquiry" data-content="support@proled.app" data-type="mail" className={css.contactLink}>
          <FormattedMessage id="Footer.goToEmail" />
        </ExternalLink>
      </p>
      <p>
        We take your feedback very seriously and will come up with ways to accommodate all of our accessibility policies.
        Additionally, while we do not control any other website on the web, we do encourage all digital content creators to provide
        content that is accessible and user friendly to all users out there.
      </p>
    </div>
  );
};

Accessibility.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

Accessibility.propTypes = {
  rootClassName: string,
  className: string,
};

export default Accessibility;
