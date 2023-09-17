import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import config from '../../config'; //unneccessary?
import MobileLogoImage from './proleadLogo.png';
import DesktopLogoImage from './proleadLogo.png';
import MobileLogoImageWhite from './whiteLogo.png';
import DesktopLogoImageWhite from './whiteLogo.png';
import css from './Logo.module.css';

const Logo = props => {
  const { className, format, footerLogo, ...rest } = props;
  const isMobile = format !== 'desktop';
  const classes = classNames(className, { [css.logoMobile]: isMobile });
  const logoImage = isMobile ? MobileLogoImage : DesktopLogoImage;
  const logoImageWhite = isMobile ? MobileLogoImageWhite : DesktopLogoImageWhite;

  return (
    <img
      className={classes}
      src={footerLogo ? logoImageWhite : logoImage}
      alt={config.siteTitle}
      {...rest}
    />
  );
};

const { oneOf, string, bool } = PropTypes; //redundant declaration?

Logo.defaultProps = {
  className: null,
  format: 'desktop',
  footerLogo: false,
};

Logo.propTypes = {
  className: string,
  format: oneOf(['desktop', 'mobile']),
  footerLogo: bool,
};

export default Logo;
