import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ExternalLink, NamedLink } from '../../components';

import css from './TermsOfService.module.css';
import { FormattedMessage } from 'react-intl';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>

      <p>
        The proLed.app web site (the “Site”) is open to both clients and professional trainers.
        The purpose of the Site is to provide an efficient process for scheduling training sessions
        between clients and professional trainers. By joining our community, clients will be able to learn
        about professional trainers in their area, schedule training sessions, schedule speaker sessions, as
        well as gain insight on valuable promotions and offerings. Professional trainers will be able to
        advertise their services, acquire client bookings, as well as promote their own expertise in the
        industry. For the purpose of this Terms of Use Agreement, both clients and trainers shall be
        referred to as “you” or “your.”
      </p>
      <p>
        Please understand that, by joining our platform and accessing information on the Site,
        you are acknowledging that you have read, understood, and agree to comply with the terms and
        conditions stated within this Terms of Use Agreement (this “Agreement”), which shall constitute
        a binding agreement between you, as a user of the Site, and Servient Corporation (“Servient”).
        For the purpose of this Agreement, the term “Site” shall also include any mobile application
        offered by Servient. This Agreement is an electronic contract that sets out the legally binding
        terms of your use and membership of the Site. If there is any conflict between this Agreement
        and the terms of any other agreement that you have entered with Servient, those terms will
        supersede the terms of this Agreement.
      </p>

      <h2>1. How to Use our Service</h2>
      <p>
        The service is available to both professional trainers and clients, so that they may advertise and schedule
        sessions. To enjoy the service, trainers must register a profile and input their locations and availability into
        the scheduling software. This will allow clients to select times that meet the trainer’s availability.
        The clients may then register on the Site and begin to research trainers in their area. Then, the client may
        schedule appointments with the trainer of his or her choice.
      </p>

      <h2>2. Registering on the Site</h2>
      <p>
        Both clients and trainers must register with the Site, in order to use the service that Prolead is offering.
        To register, clients and professional trainers must provide their full name, state of residence, zip code, phone
        number, date of birth, email address, and create a password. Trainers may also upload photos and create bios
        that provide information about their experience and location.
      </p>
      <p>
        You agree that any information that you supply during the registration process will be accurate, truthful, and
        complete. You also agree not to (i) select, register, or attempt to register, or use a name of another person
        with the intention of impersonating that person; (ii) use a name of anyone else without authorization; or (iii)
        use any content, names, data, or other information that is in violation of the intellectual property rights of
        any person or that Prolead considers to be offensive or adverse to the spirit and purpose of the Site. Prolead
        reserves the right to reject or terminate any registration that, in its judgment, it deems offensive or
        otherwise in violation of this Agreement.
      </p>
      <p>
        You will be responsible for preserving the confidentiality of your password and will notify Prolead of any known
        or suspected unauthorized use of your account. Further, you agree that you are responsible for all statements
        made and acts or omissions that occur on your account while your password is being used. If you believe someone
        has used your password or account without your authorization, you must notify Prolead immediately. Prolead
        reserves the right to access and disclose any information including, without limitation, usernames of accounts
        and other information to comply with applicable laws and lawful government requests. You must be at least 13
        years old to register on the Site.
      </p>
      <p>
        Please inform Prolead if there is a change in the information you provided at the time of your initial
        registration, including any change of address or name, by contacting our representatives at&nbsp;
        <ExternalLink href="mailto:support@proled.app?subject=General Inquiry" data-content="support@proled.app" data-type="mail" className={css.link}>
          <FormattedMessage id="Footer.goToEmail" />
        </ExternalLink>
        .
      </p>

      <h2>3. Proprietary Rights to Content</h2>
      <p>
        All materials contained on the Site are protected by copyright law except where explicitly noted otherwise.
        Prolead reserves all rights in this content.
      </p>
      <p>
        You acknowledge and agree that content, including but not limited to text, software, photographs, video, design,
        recordings, music, graphics, or other material contained on the Site (the “Content”) is protected by copyrights,
        trademarks, service marks, patents, or other proprietary rights and applicable law. You agree not to copy,
        reproduce, distribute, or create derivative works from the Content or otherwise use, transmit, rebroadcast,
        publish, or distribute the Content in any form other than as expressly authorized by this Agreement without
        Prolead’ prior written consent. You understand and agree that you are permitted to make one copy of the Content
        for personal use only, provided you:
        <ul className={css.styleList}>
          <li style={{listStyle:'disc'}}>Keep all copyright and other proprietary notices on each copy you make</li>
          <li style={{listStyle:'disc'}}>Use the material in a manner consistent with this Agreement</li>
          <ul className={css.innerList}>
          <li style={{listStyle:'circle'}}>Understand that we are neither transferring ownership of the materials directly or by
            implication, nor granting any license or right to the trademarks, tradenames, or copyrights of
              any party</li>
          </ul>
        </ul>
        Using any of our materials for a commercial purpose without our express written consent-violates our copyrights
        and other proprietary rights.
      </p>
      <p>
        You may not use any data mining, robots, scraping, or similar data gathering and extraction tools on the
        Content, frame or scrape data from any portion of the Site or Content, or reproduce, reprint, copy, store,
        publicly display, broadcast, transmit, modify, translate, publish, sublicense, assign, transfer, sell, loan, or
        otherwise distribute the Content without our prior written consent. You may not circumvent any mechanisms
        included in the Content for preventing the unauthorized reproduction or distribution of the Content. You also
        are prohibited from taking any action that imposes or may impose (in our sole discretion) an unreasonable or
        disproportionately large load on our infrastructure. Finally, you may not utilize any device, software, or
        routine that will interfere or attempt to interfere with the functionality of the Site.
      </p>
      <h2>4. User Conduct</h2>
      <p>
        You agree that all the information that you access on the Site will be used only for your own personal purposes.
        You will not make any other unauthorized use of the Site or any interactive features available on the Site or
        otherwise act in a manner that is disruptive to the purpose and intent of the Site. You may not engage in any
        conduct or action that is prohibited by any applicable law.
      </p>

      <h2>5. Privacy</h2>
      <p>
        Prolead collects information about the users of the Site. Collection of this information is governed by our
        Privacy Policy, which may be accessed at&nbsp;
        <NamedLink
          name="PrivacyPolicyPage"
          className={css.policyLink}
          target="_blank" rel="noopener noreferrer"
        >
          proled.app/privacy-policy
        </NamedLink>
      </p>

      <h2>6. No Show Policy</h2>
      <p>
        Prolead is committed to providing effective scheduling services to both clients and professional trainers. We
        understand, however, that a situation may arise where either a client or trainer is forced to cancel an
        appointment. If such a situation arises, we ask that you cancel your reservation online and/or contact the
        client/trainer directly.
      </p>
      <p>
        If a client is unable to make a session and fails to cancel at least forty-eight hours prior to the scheduled
        session, the client will be charged for the session. Prolead will send that client an email letting him or her
        know that we have listed him or her as a no-show for the relevant session. A client’s account will be suspended
        if he or she is a no-show for three sessions within the same six-month period.
      </p>
      <p>
        If a trainer is unable to make a session and fails to cancel at least twenty-four hours prior to the scheduled
        session, the trainer will be required to reschedule the appointment with the client. Prolead will send that
        trainer an email letting him or her know that we have listed him or her as a no-show for the relevant session
        reservation. A trainer’s account will be suspended if he or she is a no-show for three sessions within the same
        six-month period.
      </p>
      <p>
        You agree that all final no-show determination will be made by Prolead in its sole discretion.
      </p>

      <h2>7. Waiver</h2>
      <p>
        You acknowledge that training can be dangerous. The facilities at which a session takes place may contain
        hazards that could result in your injury or death or damage to your property. The equipment used at a session
        could cause your injury or death or damage to your property. Your client or professional trainer could cause
        your injury or death or damage to your property. You assume all risk of injury, death, and property damage
        related to all sessions scheduled through the Site. Prolead does not inspect or maintain any facilities at which
        any lesson takes place, does not provide any equipment used at any session, and is not responsible for the
        behavior of any client or trainer. By scheduling a session, you are agreeing that Prolead has no liability
        whatsoever for any injury, death, or property damage suffered by you in connection with such session.
      </p>

      <h2>8. Corporate Identification and Trademarks</h2>
      <p>
        All registered and unregistered trademarks and service marks (collectively, “Marks”) used or referred to on the
        Site are the property of Prolead or its affiliate, unless otherwise noted. You may not use, copy, reproduce,
        republish, upload, post, transmit, distribute, or modify these Marks in any way without Prolead’ prior written
        permission. The use of Prolead’ Marks on any other web site, without authorization, is prohibited.
      </p>

      <h2>9. Public Areas of the Site; IP Warranty and Grant</h2>
      <p>
        Certain areas of the Site may allow both professional trainers and clients to post their own Content (as defined
        in Paragraph 3), which can be accessed and viewed by others, including the public in general. For example,
        professional trainers may upload photos and biographical information that is created by the professional trainer
        for the purpose of publication on the Site. Please know that you may only post such Content to public areas on
        the Site that you created or that you have permission to post. You may not post any Content that violates these
        Terms of Use.
      </p>
      <p>
        We do not claim ownership in any Content (as defined above) that you may post. However, by submitting such
        Content to public areas of the Site, you hereby warrant that you own the appropriate rights in the Content, so
        as not to violate any third party’s intellectual property or proprietary rights. Further, you grant to Prolead a
        worldwide, royalty-free, perpetual, irrevocable, non-exclusive right and license to use, reproduce, modify,
        adapt, publish, translate, create derivative works from, distribute, perform, and display such Content,
        including any message or any e-mail sent by you to us or posted on the Site (in whole or in part), and/or to
        incorporate it in other works in any form, media, or technology now known or later developed without the need to
        attributed authorship.
      </p>
      <p>
        To be clear, you understand and agree that you may not upload, post, or otherwise make available on the Site any
        Content protected by copyright, trademark, or other proprietary right without the express permission of the
        owner of the copyright, trademark, or other proprietary right. You are responsible for determining that such
        material is not protected by copyright, trademark, or other proprietary right. You shall be solely liable for
        any damages resulting from any infringement of copyright, trademark, or other proprietary right, or any other
        harm resulting from any uploading, posting or submission.
      </p>

      <h2>10. Prohibited Conduct</h2>
      <p>
        By using the Site you agree not to submit, post, or transmit any content or otherwise to engage in any conduct,
        that violates any of the following rules:
        <ul className={css.styleList}>
          <li style={{listStyle:'disc'}}>You may not attempt to harm, disrupt, or otherwise engage in activity that impairs,
            the Site. You may not post any content on the Site that (a) violates or encourages others to violate any applicable
            law or regulation, or which would give rise to civil liability; (b) is fraudulent, false, misleading, or deceptive;
            (c) is defamatory, pornographic, obscene, vulgar, or offensive; (d) promotes bigotry, racism, hatred,
            harassment, or harm against any individual or group; or (e) is abusive or threatening.
          </li>
          <li style={{listStyle:'disc'}}>You may not attempt to interfere with any other person’s use of the Site or
            the services offered on the Site.
          </li>
          <li style={{listStyle:'disc'}}>You may not misrepresent your identity or impersonate any person.
          </li>
          <li style={{listStyle:'disc'}}>You may not access, descramble, deactivate, remove, impair bypass, or
            circumvent any technological measure that we, our partners, or a third party have implemented to
            protect the Site.
          </li>
          <li style={{listStyle:'disc'}}>You may not attempt to gain access to any account, computers or networks related
            to or used in connection with the Site, without authorization, or otherwise tamper with any aspect of the Site,
            or use any robot, spider, data mining tool, web tool, engine, software, device, or mechanism to access data on
            the Site, unless we provided you with such tool and authorized you to use it for the specific purpose(s) in
            which you have used it
          </li>
          <li style={{listStyle:'disc'}}>You may not attempt to obtain any data through any means from the Site, except if we
            intend to provide or make it available to you.
          </li>
          <li style={{listStyle:'disc'}}>You may not use the Site to participate in pyramid schemes or chain letters.
          </li>
          <li style={{listStyle:'disc'}}>You may not use the Site to send, either directly or indirectly, any unsolicited
            bulk email or communications or unsolicited commercial email or communications.
          </li>
          <li style={{listStyle:'disc'}}>You may not use the Site to post, display, send or otherwise make available or use, any material protected by
              intellectual property laws unless you own or control all necessary rights to such material or have received
              all necessary authorization.
          </li>
          <li style={{listStyle:'disc'}}>You may not use the Site to send or otherwise make available any material that contains viruses, Trojan
              horses, worms, corrupted files, or any other similar software that may damage the operation of any computer
              or property.
          </li>
          <li style={{listStyle:'disc'}}>You may not use the Site to download any material sent by another user of the Site that you know, or
              reasonably should know, cannot be legally distributed in such manner.
          </li>
          <li style={{listStyle:'disc'}}>You may not use the Site in a manner that violates this Agreement, or any code of conduct or other guidelines
              which may be applicable to the Site.
          </li>
          <li style={{listStyle:'disc'}}>You may not use the Site to harvest or otherwise collect information about others, including without
              limitation email addresses.
          </li>
          <li style={{listStyle:'disc'}}>You may not attempt to modify, translate, adapt, edit, copy, decompile, disassemble, or reverse engineer any
              software used or provided by us in connection with the Site.
          </li>
          <li style={{listStyle:'disc'}}>You may not use the Site in a manner that results in excessive bandwidth usage, as determined solely by us.
          </li>
        </ul>
            We have the right to make all judgments concerning any of the above prohibitions in our sole, exclusive, and
            complete discretion. We reserve the right, also in our sole discretion, to determine whether and what action to
            take in response to any violation or potential violation of this Agreement, and any action or inaction in a
            particular instance shall not dictate or limit our response to a future complaint or situation.
      </p>

      <h2>11. Right to Terminate</h2>
      <p>
        We may, in our sole discretion, terminate the registration of any user or trainer who violates the terms of this
        Agreement.
      </p>

      <h2>12. Breach</h2>
      <p>
        In the event of a breach of this Agreement, Prolead may terminate your ability to use the Site and prohibit you
        from any future access of the Site. Prolead reserves the right to take any further action, as allowed by
        applicable law.
      </p>

      <h2>13. Links to Third Party Sites</h2>
      <p>
        At times, the Site may contain links to third-party web sites, which are not under the control of Prolead.
        Prolead makes no representations whatsoever about any other web site to which you may have access through the
        Site. When you access another web site, you do so at your own risk and acknowledge that Prolead is not
        responsible or liable for any content, advertising, services, products, or other materials available from such
        third-party web sites. You also agree that Prolead shall not be liable for any loss or damage of any sort
        incurred as the result of using any third party’s website. Mention of third-party companies and web sites on the
        Site is for informational purposes only and does not constitute an endorsement or recommendation.
      </p>

      <h2>14. Email Policy</h2>
      <p>
        You may receive periodic emails from Prolead. If you would rather not receive email from Prolead, please send an
        email to&nbsp;
        <ExternalLink href="mailto:support@proled.app?subject=General Inquiry" data-content="support@proled.app" data-type="mail" className={css.link}>
          <FormattedMessage id="Footer.goToEmail" />
        </ExternalLink>
        and you will be unsubscribed from receiving further mailings. You acknowledge
        and agree, however, that you will still receive session confirmation emails, no-show confirmation emails,
        session change confirmation emails, session cancellation confirmation emails, and other emails relating to any
        sessions that are booked through the Site, even if you have opted not to receive periodic email from Prolead.
      </p>

      <h2>15. Limitation of Liability</h2>
      <p>
        IN NO EVENT SHALL PROLEAD BE LIABLE FOR ANY INJURY, LOSS, CLAIM, OR DAMAGES (INCLUDING INDIRECT, SPECIAL,
        EXEMPLARY, PUNITIVE, INCIDENTAL, OR CONSEQUENTIAL DAMAGES) OF ANY KIND, WHETHER BASED IN CONTRACT, TORT, OR
        OTHERWISE, WHICH ARISES OUT OF OR IS ANY WAY CONNECTED WITH (I) ANY USE OF THE SERVICES, THE SITE, OR ITS
        CONTENT, (II) ANY FAILURE OR DELAY (INCLUDING, BUT NOT LIMITED TO, THE USE OR INABILITY TO USE ANY COMPONENT OF
        THE SERVICES OR THE SITE FOR SCHEDULING PURPOSES), OR (III) THE PERFORMANCE OR NON-PERFORMANCE OF ANY TRAINER OR
        CLIENT IN CONNECTION WITH THE SERVICES, EVEN IF PROLEAD HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </p>

      <h2>16. Disclaimer of Warranties</h2>
      <p>
        Prolead makes no warranty that the Site will be uninterrupted, timely, secure, or error free. Prolead makes no
        warranty as to the accuracy of the information on the Site.
      </p>
      <p>
        UNLESS EXPRESSLY STATED OTHERWISE, PROLEAD PROVIDES THE CONTENT ON THE SITE “AS IS” AND WITHOUT WARRANTIES OF
        ANY KIND, EITHER EXPRESS OR IMPLIED, TO THE FULLEST EXTENT ALLOWABLE BY APPLICABLE LAW, INCLUDING THE IMPLIED
        WARRANTIES OF MERCHANTABILITY, NONINFRINGEMENT OF INTELLECTUAL PROPERTY, AND FITNESS FOR A PARTICULAR PURPOSE.
      </p>

      <h2>17. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Prolead, its officers, directors, employees, agents,
        affiliates, distributors, and licensees from and against any judgment, losses, deficiencies, damages,
        liabilities, costs, and expenses (including reasonable attorneys’ fees and expenses) incurred in connection with
        or arising from any claim, demand, suit, action, or proceeding arising out of any breach of this Agreement by
        you or in connection with your use of the Site or any service (or product) related thereto.
      </p>

      <h2>18. Right to Modify or Change</h2>
      <p>
        Prolead reserves the right to modify this Agreement periodically at its sole discretion. When it makes any
        modification to this Agreement, it will update the date referenced at the end of this page. Your continued use
        of the Site constitutes acceptance of the terms and conditions stated at the time of use.
      </p>

      <h2>19. Governing Law</h2>
      <p>
        This Agreement and the relationship between Prolead and you shall be governed by and construed in accordance
        with the laws of the State of Delaware. Any controversy or claim arising out of or relating to this Agreement or
        relating to use of this web site and the material contained in this web site shall be resolved in a court in the
        State of Delaware.
      </p>

      <h2>20. Electronic Signature</h2>
      <p>
        The Terms of Use Agreement is an electronic contract that governs your use of and access to the Site and
        Services. Upon agreeing to the Terms of Use when enrolling for the professional trainer application and customer
        checkout, you acknowledge that you understand and agree to be legally bound by the Terms of Use Agreement and
        the terms, conditions and notices contained or referenced herein. Checking the box creates an electronic
        signature that has the same legal force and effect as a handwritten signature.
      </p>

      <h2>Waiver/Severability</h2>
      <p>
        The waiver by either party of a breach or right under this Agreement will not constitute a waiver of any
        subsequent breach or right. If any provision of this Agreement is found to be invalid or unenforceable by a
        court of competent jurisdiction, such provision shall be severed from the remainder of this Agreement, which
        will otherwise remain in full force and effect.
      </p>
      <p className={css.lastUpdated}>Last updated: June 7, 2020</p>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
