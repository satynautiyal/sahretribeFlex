import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { twitterPageURL } from '../../util/urlHelpers';
import config from '../../config';
import {
  IconSocialMediaInstagram,
  IconSocialMediaTwitter,
  IconSocialMediaFacebook,
  Logo,
  ExternalLink,
  NamedLink,
} from '../../components';
import startupLogo from '../../assets/startupLogo.png';

import css from './Footer.module.css';

const renderSocialMediaLinks = intl => {
  const { siteInstagramPage, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });
  const goToFacebook = intl.formatMessage({ id: 'Footer.goToFacebook' });

  // const goToTwitter = intl.formatMessage({ id: 'Footer.goToTwitter' });

  // const twitterLink = siteTwitterPage ? (
  //   <ExternalLink
  //     key="linkToTwitter"
  //     href={siteTwitterPage}
  //     className={css.icon}
  //     title={goToTwitter}
  //   >
  //     <IconSocialMediaTwitter />
  //   </ExternalLink>
  // ) : null;

  const instragramLink = siteInstagramPage ? (
    <ExternalLink
      key="linkToInstagram"
      href={siteInstagramPage}
      className={css.icon}
      title={goToInsta}
    >
      <IconSocialMediaInstagram />
    </ExternalLink>
  ) : null;

  const facebookLink = siteFacebookPage ? (
    <ExternalLink
      key="linkToFacebook"
      href={siteFacebookPage}
      className={css.icon}
      title={goToFacebook}
    >
      <IconSocialMediaFacebook />
    </ExternalLink>
  ) : null;
  return [instragramLink, facebookLink].filter(v => v != null);
};

const Footer = props => {
  const { rootClassName, className, intl } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.links}>
            <div className={css.infoLinks}>
              <div>
                <h4 className={css.listHeader}>
                  <FormattedMessage id="Footer.company" />
                </h4>
                <ul className={css.list}>
                  <li className={css.listItem}>
                    <NamedLink name="HowWorksPage" className={css.link}>
                      <FormattedMessage id="Footer.toHowWorksPage" />
                    </NamedLink>
                  </li>
                  <li className={css.listItem}>
                    <NamedLink
                      name="SearchPage"
                      to={{
                        search: 'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873',
                      }}
                      className={css.link}
                    >
                      <FormattedMessage id="Footer.toFindLink" />
                    </NamedLink>
                  </li>
                  <br />
                </ul>
              </div>
              <div>
                <h4 className={css.listHeader}>
                  <FormattedMessage id="Footer.support" />
                </h4>
                <ul className={css.list}>
                  <li className={css.listItem}>
                    <NamedLink name="HelpGeneralPage" className={css.link}>
                      <FormattedMessage id="Footer.helpCenter" />
                    </NamedLink>
                  </li>
                  <li className={css.listItem}>
                    <ExternalLink
                      href="mailto:support@proled.app?subject=General Inquiry"
                      data-content="support@proled.app"
                      data-type="mail"
                      className={css.link}
                    >
                      <FormattedMessage id="Footer.toContactPage" />
                    </ExternalLink>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={css.listHeader}>
                  <FormattedMessage id="Footer.legal" />
                </h4>
                <ul className={css.list}>
                  <li className={css.listItem}>
                    <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                      <FormattedMessage id="Footer.termsOfUse" />
                    </NamedLink>
                  </li>
                  <li className={css.listItem}>
                    <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.privacyPolicy" />
                    </NamedLink>
                  </li>
                  <li className={css.listItem}>
                    <NamedLink name="AccessibilityPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.accessibility" />
                    </NamedLink>
                  </li>
                </ul>
              </div>
              <div className={css.extraLinks}>
                <div className={css.organization} id="organization">
                  <ExternalLink href="https://www.startupsg.gov.sg/profiles/44660">
                    <img src={startupLogo} className={css.startupLogo} />
                  </ExternalLink>
                </div>
              </div>
            </div>
            <div className={css.extraLinks}>
              <div className={css.organization} id="organization">
                <NamedLink name="LandingPage" className={css.logoLink}>
                  <Logo
                    format="desktop"
                    className={css.logo}
                    alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
                    footerLogo={true}
                  />
                </NamedLink>
                <div className={css.someLinks}>{socialMediaLinks}</div>
                <div className={css.organizationInfo}>
                  <p className={css.organizationCopyright}>
                    <FormattedMessage id="Footer.copyright" />
                  </p>
                </div>
              </div>
            </div>

            <div className={css.someLinksMobile}>
              <div className={css.emailLink}>
                <ExternalLink
                  href="https://www.startupsg.gov.sg/profiles/44660"
                  className={css.mobileStartupLogoLink}
                >
                  <img src={startupLogo} className={css.startupLogo} />
                </ExternalLink>
                <NamedLink name="LandingPage" className={css.logoLink}>
                  <Logo
                    format="desktop"
                    className={css.logo}
                    alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
                    footerLogo={true}
                  />
                </NamedLink>
                <div className={css.someLinksContainer}>
                  <div className={css.someLinks}>{socialMediaLinks}</div>
                </div>
                <div className={css.organizationInfo}>
                  <p className={css.organizationCopyright}>
                    <FormattedMessage id="Footer.copyright" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
