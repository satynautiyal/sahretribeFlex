import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink, ExternalLink } from '../../components';

import css from './PrivacyPolicy.module.css';
import { FormattedMessage } from 'react-intl';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>

      <p>
        Thank you for visiting the <NamedLink name="LandingPage" target="_blank" className={css.siteLink} rel="noopener noreferrer">proLed.app</NamedLink>
        &nbsp;web site (the “Site”). The Site is owned and operated by Prolead Inc. and this Privacy
        Policy contains information about Prolead’s commitment to the privacy of the users of
        the Site, who are both clients and personal trainers. For the purposes of this Privacy
        Policy, both clients and personal trainers shall be referred to as “you” or “your.”
      </p>
      <p>
        <span style={{textDecoration:'underline'}}>Note:</span> This Privacy Policy only applies to the collection and use of data by Prolead. This
          Privacy Policy does not apply to the web sites of other companies, individuals, or
          organizations to which we may provide links. These websites may have different policies
          relating to your privacy and information they collect about you. Visitors should consult
          other sites’ privacy policies, as Prolead has no control over information that is submitted
          to, or collected by, third parties.
      </p>

      <h2>Information Collection</h2>
      <p>
        The Site collects two kinds of information from you: (1) personal information
        that you submit to us, and (2) non-personal information, such as the pages you
        visited on the Site and your IP address. To learn how to opt out of receiving
        further information from Prolead, see the Section "Non-Personally Identifiable Information" below.

        <ul className={css.styleList}>
          <li style={{listStyle:'disc'}}>
            Personal Information. We collect and use personal information about you in the following ways:
          </li>
          <ul className={css.innerList}>
            <li style={{listStyle:'circle'}}>
              Registering on the Site. You may supply Prolead with your personal
              information when you register on the Site. For example, a client who
              registers on the Site must provide a full name, state of residence,
              email address, date of birth and password. For a personal trainer to
              register on the Site, he or she must provide full name, state of
              residence, email address, date of birth, username, password, home
              address, contact number, court locations, weekly schedule availability,
              instructor bio, photo, and Social Security Number (For a criminal
              background check). Prolead may, from time to time, change the
              information that it requests from the visitors to the Site.
            </li>
            <li style={{listStyle:'circle'}}>
              Training Session Scheduling. You may supply Prolead with further
              personal information, including your home address and credit card
              information, when you schedule a training session on the Site. We use
              a third party company to process credit card transactions, but we may
              have access to this data.
            </li>
            <li style={{listStyle:'circle'}}>
              E-mail. If you submit feedback, questions, or requests for information
              about Prolead services, we may request your name, mailing address,
              telephone number, and e-mail address in order to respond to your
              inquiries. Prolead may collect and store the information you choose to
              provide us to send you information about Prolead from time to time.
            </li>
            <li style={{listStyle:'circle'}}>
              Surveys and Promotions.
            </li>
            <li style={{listStyle:'circle'}}>
              Loyalty Programs and Promotional Services. We may gather
              information from you when you sign up for any loyalty program or
              other promotional offer made via the Site. As part of those services
              you may be required to provide personal contact information such as
              your name, shipping address, phone number, or e-mail address. This
              information may be used to contact users with further information
              about Prolead services, to fulfill the terms of any scheduling, or to
              monitor or improve use and satisfaction of the Site.
            </li>
            <li style={{listStyle:'circle'}}>
              Mobile Applications. We also may collect any of the above
              information from users of mobile devices; in such an instance, when
              the collection is occurring by Prolead, the terms of this Privacy Policy
              shall control, unless otherwise noted at the time of collection.
            </li>
          </ul>
          <li style={{listStyle:'disc'}}>
            Non-Personally Identifiable Information. We collect and use non-
            personally identifiable information about you in the following ways:
          </li>
          <ul className={css.innerList}>
            <li style={{listStyle:'circle'}}>
              Cookies. A “cookie” is a small text file that may be used to collect
              information about your activity on the Site. For example, when
              someone visits a page within the Site, a cookie is placed on the user’s
              machine (if the user accepts cookies) or is read if the user has visited
              the Site previously. You may set most browsers to notify you if you
              receive a cookie, or you may choose to block cookies with your
              browser, but if you do, you may not be able to take advantage of the
              personalized features enjoyed by other users to our Site. Some of the
              cookies we use may be flash cookies or Adobe cookies. While they
              are harmless, they may contain demographic information and,
              depending on your browser, these cookies may not normally be
              deleted when your cookies are deleted. Please check your browser to
              determine where these types of cookies are stored and how they may
              be deleted.
            </li>
            <li style={{listStyle:'circle'}}>
              Referrers, IP Addresses, and Environmental Variables. Prolead also
              may collect information through referrers, IP addresses, and various
              environmental variables. A referrer is information the web browser
              passes along to the Prolead web server that references the URL from
              which you came. An IP address is a number used by computers on a
              network to identify your computer so that data can be transmitted to
              you. An environmental variable may include, among other things, the
              domain from which you access the Internet, the time you accessed the
              Site, the type of web browser and operating system or platform used,
              the Internet address or the web site you left to visit the Site, the pages
              you visit while at the Site, and the Internet address of the web site you
              then visit. Prolead may collect IP address information in order to
              administer the Site and to gather broad demographic information.
            </li>
            <li style={{listStyle:'circle'}}>
              Behavioral Advertising Information. We may use tracking devices and
              cookies to collect non-personal information about the users of our
              Site. The information collected may help us provide recommendations
              to you, serve you with advertisements or direct you to a product or
              service that we believe may be of interest to you. The purpose of this
              data collection is to optimize your experience on our Site and to
              ensure that the advertisements offered to you are relevant. We take
              steps to ensure that the information we collect and share for
              advertising purposes remains anonymous. For more information about
              this type of advertising and to opt-out of receiving targeted
              advertisements from certain advertisers, please visit&nbsp;
              <ExternalLink href="https://optout.networkadvertising.org/" data-content="https://optout.networkadvertising.org/" className={css.optLink}>
                optout.networkadvertising.org
              </ExternalLink>.
            </li>
            <li style={{listStyle:'circle'}}>
              Geolocation Data. We may also collect your location if you choose to
              allow our Site to track your location or if your personal or non-
              personal information indicates a certain geographic location. This
              information may help us provide recommendations to you based on
              your location, serve you with advertisements or direct you to a
              product or service that we believe may be of interest to you and that is
              marketed to people near your location.
            </li>
          </ul>
        </ul>
      </p>

      <h2>Information Use</h2>
      <p>
        Use of Personal Information Collected Via the Site. We use your personal
        information that is collected on the Site primarily for the following purposes:
        <ul className={css.styleList}>
          <li style={{listStyle:'disc'}}>
            To deliver the services that you requested via the Site, such as training
            sessions or other appointments
          </li>
          <li style={{listStyle:'disc'}}>
            To deliver you information, alerts, or newsletters that you request, or that we
            believe may be of interest to you
          </li>
          <li style={{listStyle:'disc'}}>
            To alert you to special offers, updated information, and other new services
            from Prolead, or other third parties, or to forward promotional materials
          </li>
          <li style={{listStyle:'disc'}}>
            To complete a transaction or service requested by you
          </li>
          <li style={{listStyle:'disc'}}>
            To fulfill the terms of a promotion
          </li>
          <li style={{listStyle:'disc'}}>
            To ensure the Site is relevant to your needs
          </li>
          <li style={{listStyle:'disc'}}>
            To notify you about a material change to this Privacy Policy or the Terms of
            Use Agreement, if necessary
          </li>
          <li style={{listStyle:'disc'}}>
            To allow you access to limited-entry areas of the Site
          </li>
        </ul>
        Use of Non-Personal Information. We use non-personal information in the
        ways described above, either alone or in combination with personal information.
        We also may use non-personal information in other ways as permitted by
        applicable law.
        <h3>Information Sharing</h3>
        Disclosure of Personal Information. Prolead will share the personal information in the following ways:
        <ul className={css.styleList}>
          <li style={{listStyle:'disc'}}>
            To fulfill a service to you. For example, we will share the personal
            information of clients with the personal trainer(s) that they have selected.
            Similarly, Prolead will share the personal information of instructors with
            clients. By registering with the Site, you agree to allow your data to be
            shared in this manner. If you do not want your data shared in this manner,
            please do not use the Site.
          </li>
          <li style={{listStyle:'disc'}}>
            To respond to your request or enter you into a promotion. If you email us
            a question, we may use your email address to process your request and
            respond to your question. Also, if you are entering a sweepstakes or
            contest, we may use your personal information in order to fulfill the
            terms of that promotion. This means that we may share the information
            for prize fulfillment purposes or with mail carriers. We also may share
            your information with the co-sponsor of that promotion.
          </li>
          <li style={{listStyle:'disc'}}>
            To affiliates, strategic partners, agents, third party marketers, or other
            unaffiliated parties who are offering products or services that we believe
            may be of interest to you or who require your name, contact information
            or any behavioral or geolocation data that we have collected from you,
            for research, administrative, and/or internal business purposes. These
            parties may use this information to contact you with an offer or
            advertisement related to a product or service, or they may use such
            information for their own research, administration, or business purposes.
            If you do not want us to share this type of information in this manner,
            please do not provide us with this information.
          </li>
          <li style={{listStyle:'disc'}}>
            To unaffiliated third-party service providers, agents, or independent
            contractors who help us maintain the Site and provide other
            administrative services to us (including, but not limited to, order
            processing and fulfillment, providing customer service, maintaining and
            analyzing data, sending customer communications on our behalf, and
            entry collection, winner selection, and prize fulfillment for contests,
            sweepstakes, and other promotions). We seek to ensure that these
            unaffiliated third parties will not use the personal information for any
            other purpose than to provide the administrative services for which they
            are responsible. Because such unaffiliated third-party service providers
            that help us administer the Site will have access to users’ personal
            information, if you do not wish for our unaffiliated third-party service
            providers to have access to your information, please do not register or
            submit any personal information to us.
          </li>
          <li style={{listStyle:'disc'}}>
            To comply with applicable law, or in the good faith belief that such
            action is necessary in order to conform to the requirements of applicable
            law or comply with the legal process served on us; protect and defend our
            rights or property; or act in urgent circumstances to protect the personal
            safety of our end users.
          </li>
          <li style={{listStyle:'disc'}}>
            To third parties as part of any corporate reorganization process including,
            but not limited to, mergers, acquisitions, and sales of all or substantially
            all of our assets.
          </li>
          <li style={{listStyle:'disc'}}>
            To track and analyze non-identifying and aggregate usage and volume
            statistical information from our visitors, clients, and instructors and
            provide such information to third parties.
          </li>
          <li style={{listStyle:'disc'}}>
            To protect against potential fraud, we may verify with third parties the
            information collected from the Site. In the course of such verification, we
            may receive personal information about you from such services. For
            example, we may be required to use card authorization and fraud
            screening services to verify that your credit card information and address
            matches the information that you supplied to secure a registration via the
            Site.
          </li>
          <li style={{listStyle:'disc'}}>
            Finally, in the unlikely event that all or substantially all of our assets
            relating to this Site is sold or transferred to another party, your personal
            identifiable information may be transferred to this acquiring entity.
          </li>
        </ul>
        Except as described in this Privacy Policy or at the time we request the
        information, we do not otherwise use, share, or otherwise disclose your personally
        identifiable information to any third parties.
        <ul className={css.styleList}>
          <li style={{listStyle:'disc'}}>
            Disclosure of Non-Personal Information. We use non-personal
            information collected on the Site in the manner described in Sections B.2
            and C.1
          </li>
          <li style={{listStyle:'disc'}}>
            Rights Reserved.
          </li>
        </ul>
      </p>

      <h2>Third Party Links</h2>
      <p>
        This Site may contain links to other sites. Additionally, third parties may from time
        to time link to the Site. PLEASE BE AWARE THAT WE ARE NOT
        RESPONSIBLE FOR THE CONTENT OR PRACTICES OF ANY OTHERWEBSITES.
        We encourage our users to read the privacy statements of each and
        every web site that they visit.
      </p>

      <h2>Choice</h2>
      <p>
        We communicate with users who subscribe to our services on a regular basis
        via email. For example, we may use your email address to confirm a scheduling
        request, to send you notice of changes to your scheduling request, to send you
        information about changes to our services, and to send notices and other
        disclosures as required by applicable law. Generally, users cannot opt out of these
        communications, but they will be primarily informational in nature rather than
        promotional.
      </p>
      <p>
        However, we may provide you the opportunity to exercise an opt-out choice
        if you do not want to receive other types of communication from us, such as emails
        or updates from us regarding new services and products offered on the Site. The
        opt-out choice will be provided in the emails that we send to you, when required to
        comply with applicable law. If you choose to opt-out of any email correspondence,
        we will process your unsubscribe as soon as possible, but please be aware that in
        some circumstances you may receive a few more messages until the unsubscribe is
        processed.
      </p>

      <h2>Notification of Changes</h2>
      <p>
        If we decide to change our Privacy Policy, we will post those changes on our
        Privacy Policy page so you will always be aware of what information we collect,
        how we use it, and under what circumstances we disclose it. If at any point we
        decide to use personal information in a manner materially different from that stated
        at the time it was collected, we will notify you by way of email. You will then have
        a choice as to whether or not we may use your information in this manner. We will
        use information in accordance with the Privacy Policy under which the information
        was collected.
      </p>
      <p style={{fontWeight:'500'}}>
        Special Policy Regarding Information from Children Under Age Thirteen
      </p>
      <p>
        Prolead is not targeted to children under the age of 13, and we do not knowingly
        collect personal information from any child under the age of 13 without parental
        consent. When we do receive such information, we delete it as soon as we discover
        it and we do not use it or share it with third parties.
      </p>

      <h2>Security</h2>
      <p>
        We make an effort to have reasonable security procedures in place to protect
        the loss, misuse, or alteration of information under our control, including using
        Secure Sockets Layer (SSL) technology to collect and transmit your information. If
        you have any questions about the security of the Site, please contact&nbsp;
        <ExternalLink href="mailto:support@proled.app?subject=General Inquiry" data-content="support@proled.app" data-type="mail" className={css.contactUsLink}>
          <FormattedMessage id="Footer.goToEmail" />
        </ExternalLink>.
      </p>

      <h2>Insolvency</h2>
      <p>
        In the unlikely event that Prolead ever becomes insolvent and seeks
        protection under applicable bankruptcy law, Prolead may share your personal
        information and non-personal information with a third party that intends to
        continue business subject to this Privacy Policy, as it may be amended from time to
        time.
      </p>

      <h2>Governing Law</h2>
      <p>
        This Privacy Policy and the relationship between Prolead and you shall be governed by and
        construed in accordance with the laws of the State of Delaware. Any controversy or claim
        arising out of or relating to this Privacy Policy or relating to use of this web site and
        the material contained in this web site shall be resolved in a court in the state of Delaware.
      </p>

      <h2>Waiver/Severability</h2>
      <p>
        The waiver by either party of a breach or right under this Privacy Policy will not constitute
        a waiver of any subsequent breach or right. If any provision of this Privacy Policy is found
        to be invalid or unenforceable by a court of competent jurisdiction, such provision shall be
        severed from the remainder of this Privacy Policy, which will otherwise remain in full force and effect.
      </p>
      <br />
        <p className={css.lastUpdated}>Effective Date: June 7th, 2020</p>
        <p className={css.lastUpdated}>Last Modified: June 7th, 2020</p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
