import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import css from './HelpTrainerQs.module.css';

const HelpTrainerQs = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <div className={css.faqContent}>
        <div className={css.faqTitle}>
          <h2>General Trainer Inquiries</h2>
        </div>
        <div className={css.faqQ}>
          <input id="q20" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q20" className={css.panelTitle}>Can I use the email linked to my learner profile to become a PRO?</label>
          <div className={css.panelContent}>Absolutely! When you become a PRO, you'll enjoy a seamless experience with access to both your learner dashboard and pro dashboard within the same login account. To get started, log in through your Learner profile and access your profile menu located on your profile icon in the top right corner. This will reveal a drop-down menu with the option to "Become a Pro." Click on this option, and it will guide you through filling out the application form to become a PRO. Once your application is approved, you'll be able to effortlessly switch between your learner and pro accounts, maximizing your opportunities and managing your sessions with ease.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q0" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q0" className={css.panelTitle}>Do I need to be certified to sign up with ProLed?</label>
          <div className={css.panelContent}>No certification is required to sign up as a PRO on ProLed. We believe that everyone has valuable skills to share, whether it's a passion or a profession. While certifications and extensive experience can attract more clients, we welcome all skilled individuals to join our platform and showcase their expertise. Your unique talents are highly valued, and we're excited to help you connect with learners who are eager to learn from you.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q1" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q1" className={css.panelTitle}>Where can I host sessions with my clients?</label>
          <div className={css.panelContent}>We recommend indicating locations that are easily accessible to you or places where you have previously conducted sessions. This could include public tracks, parks, gyms, studios, and more. If you're open to traveling to your learners' preferred locations, do mention that in your profile! Providing this information will help learners make informed decisions and book sessions more quickly.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q2" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q2" className={css.panelTitle}>How many clients do ProLed PROs usually receive?</label>
          <div className={css.panelContent}>
          The number of clients you receive as a ProLed PRO depends on various factors, with your profile playing a significant role. To maximize your potential, keep these tips in mind when creating your profile:
            <ol className={css.faqList}>
              <li>Show Your Best Side: Use a warm and professional photo with your smiling face to make a friendly first impression.</li>
              <li>Showcase Your Skills: Share pictures of you in action, demonstrating the skill you offer – it adds a personal touch!
</li>
              <li>Tell Your Story: Craft an engaging Bio with your key achievements related to the skill you're sharing. Let your passion shine through!
</li>
              <li>Keep It Current: Update your calendar regularly to make the booking process super easy for interested clients.</li>
              <li>Collect Reviews: After sessions, kindly ask clients to leave reviews and ratings. Positive feedback boosts your chances of landing even more clients!
</li>
            </ol>
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q3" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q3" className={css.panelTitle}>Do you share my contact information with potential and current clients?</label>
          <div className={css.panelContent}>
          We prioritize your privacy and do not share your contact details with potential or current clients. The only information that is shared is what you choose to include on your profile. By keeping communication within ProLed's platform, we ensure that your personal information remains confidential and protected. Your peace of mind is essential to us, and we want to create a secure environment for both you and the learners.

          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q4" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q4" className={css.panelTitle}>I just submitted my application to become a PRO, how do I check on the status of my application?</label>
          <div className={css.panelContent}>
          After submitting your application, you'll receive a confirmation email within 24 hours, notifying you that your account is active – unless we require additional information from you. If, for any reason, you haven't received an email from us within this timeframe, please don't hesitate to reach out to us at support@proled.app
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q21" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q21" className={css.panelTitle}>Is there a minimum age requirement to become a PRO?</label>
          <div className={css.panelContent}>Absolutely! To conduct freelance work in Singapore and become a PRO on ProLed, you must meet the minimum age requirement of at least 17 years old. This ensures that all our PROs comply with legal regulations and guidelines. We encourage aspiring freelancers to showcase their skills and expertise once they meet the age requirement.

          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q5" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q5" className={css.panelTitle}>I am not a Singaporean or PR. Can I still apply to be a PRO on ProLed Platform?</label>
          <div className={css.panelContent}>
          As per legal requirements, freelancing in Singapore is restricted to Singaporean citizens or Permanent Residents (PRs). Currently, our platform operates exclusively within Singapore, processing payouts only within the country. However, we are excited about the possibility of expanding our services to other regions in the future! We would love to know where you are based so that we can prioritize our expansion efforts accordingly. Please feel free to register a PRO account or email us at support@proled.app to share your location with us. Your input is valuable, and we're committed to bringing ProLed to your area as soon as possible. 
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q6" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q6" className={css.panelTitle}>Can I offer any other services besides coaching/teaching on ProLed?</label>
          <div className={css.panelContent}>
          At the moment, ProLed PROs are exclusively allowed only to offer services related to teaching or coaching in their indicated area of expertise. However, you can conduct sessions in various formats, such as In-Person Sessions, Virtual Sessions, and even Group Sessions! Stay tuned for exciting updates as we continue to enhance our platform, with many more features to help scale your business on the horizon! 
          </div>
        </div>
        <div className={css.faqTitle}>
          <h2>Payment</h2>
        </div>
        <div className={css.faqQ}>
          <input id="q7" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q7" className={css.panelTitle}>How do I get paid?</label>
          <div className={css.panelContent}>All payments will be sent directly to your bank account via Stripe payment system account within 24 hours of session completion. It will take about 2-3 business days to be credited to your bank account. However, if you would like to receive money instantly, Stripe will charge you 3% fee for the service.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q8" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q8" className={css.panelTitle}>When do I get paid?</label>
          <div className={css.panelContent}>Payment is processed instantly after your complete your session. We understand the importance of timely payments, and to ensure your peace of mind, we'll send you an email on the day the payment is processed, confirming that your payment has been sent and processed successfully.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q9" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q9" className={css.panelTitle}>I haven't received my payment yet. What do I do?</label>
          <div className={css.panelContent}>
          If you did not receive your payment, please reach out to us at support@proled.app, and our dedicated support team will promptly investigate the matter and help resolve any payment issues.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q10" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q10" className={css.panelTitle}>How do I raise or lower my pricing?</label>
          <div className={css.panelContent}>To update your pricing on ProLed, simply log in to your account and navigate to the PRO Dashboard. Click on "Preview my Profile," and in the top right corner, select "Edit my PRO profile." From there, go to the "Pricing" section and enter your new hourly rate. Remember, this updated rate will be applicable for all future clients who sign up with you, but it will not affect your current clients. This flexibility allows you to adjust your rate according to your preferences and market demands. 
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q11" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q11" className={css.panelTitle}>If I update my rate, will it apply to bookings made before the update?</label>
          <div className={css.panelContent}>Nope! If you change your rate on ProLed, the new rate will only be applied to future clients who book sessions with you after the rate update. Your current clients who have already booked sessions at your original rate will continue to be charged at that rate. This ensures fairness and transparency for both you and your clients, allowing you to adjust your rate without affecting existing commitments.
          </div>
        </div>
        <div className={css.faqTitle}>
          <h2>Account</h2>
        </div>
        <div className={css.faqQ}>
          <input id="q13" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q13" className={css.panelTitle}>How do I change my availability?</label>
          <div className={css.panelContent}>Our user-friendly interface allows you to easily manage your availability based on your schedule and preferences. To adjust your availability on ProLed, start by logging into your account. Once logged in, click on "Preview my Profile" within the PRO Dashboard. Next, select "Edit my PRO profile" in the top right corner, and proceed to the "Availability" section. Within this section, you have the flexibility to click on the day of the week or hour to fill all the boxes in that row or column, or simply click on specific boxes to customize specific time slots.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q14" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q14" className={css.panelTitle}>Can I deactivate my account for 1 month?</label>
          <div className={css.panelContent}>
          We're happy to offer flexibility on our platform to accommodate your needs for as long as you require. If you need to take a break from freelancing, you have two options: either update your calendar availability to indicate your unavailability for a specific duration, or email us at support@proled.app to request deactivation of your account for a period of time. Rest assured, you can reactivate your account whenever you're ready to resume freelancing.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q15" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q15" className={css.panelTitle}>What happens if my application is rejected?</label>
          <div className={css.panelContent}>If, for any reason, your application is rejected, we'll notify you via email, providing you with the specific reason for the rejection. Common reasons could include insufficient information or not meeting certain legal requirements. Don't worry, though! You'll have the opportunity to log in to your account, make the necessary changes, and ensure all required information is provided. Be sure to save the changes, and once verified, we'll notify you through email once your profile is live and ready to go!
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q16" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q16" className={css.panelTitle}>What are star ratings and reviews?</label>
          <div className={css.panelContent}>Star ratings and reviews play a big role in enhancing your presence and reputation on ProLed. They provide valuable feedback from your clients, helping to improve your ranking and visibility within the platform. Positive feedback not only highlights your expertise but also attracts more eager learners.
            <br/>
            <br/>
            Clients can leave feedback in two ways:
            <ol className={css.faqList}>
              <li>Star Ratings: After a session, clients can rate how the session went and assess your performance as an instructor. The star ratings range from 1 (Poor) to 5 (Excellent). Your public profile displays your average star rating and the number of ratings you've received, giving potential clients insight into your overall performance.
</li>
              <li>Written Reviews: In addition to star ratings, clients can write detailed reviews about your personal training services. Our ProLed Team carefully monitors these reviews, ensuring they are relevant to personal training and contain appropriate content.</li>
            </ol>
          </div>
        </div>
        <div className={css.faqTitle}>
          <h2>Sessions</h2>
        </div>
        <div className={css.faqQ}>
          <input id="q17" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q17" className={css.panelTitle}>What does confirming a session mean?</label>
          <div className={css.panelContent}>Confirming a session means accepting and agreeing to conduct the session with the learner. It indicates that you are ready to proceed with the session, and the learner is also notified of this confirmation. Once the session is confirmed, ProLed will initiate the payment process, and the funds will be transferred to your bank account. It's an important step that ensures both you and the client are prepared for the session, and payment is on its way.
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q18" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q18" className={css.panelTitle}>What do I do when a client requests to book a session with me?</label>
          <div className={css.panelContent}>When a client requests a session time with you, they will typically send you a message with the proposed date, time, and location for the lesson. If you are available and would like to proceed with the session, you can simply guide your client to book the session through their dashboard. ProLed will notify you once your client has requested the lesson, and from there, you can accept the booking.
          <br/><br/>Please keep in mind that for any sessions to take place, the client must have their payment information on file. This ensures a smooth and hassle-free experience for both you and the client. 
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q22" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q22" className={css.panelTitle}>How do I reschedule a session?</label>
          <div className={css.panelContent}>If you have not confirmed a booking, you can provide the learner with alternative times and dates where you are available through the booking request message. Let them know you will need to cancel the request and for them to create a new booking request. If the session has already been confirmed, you must communicate with the learner directly using our messaging function and discuss and agree on a new date and time that works for both of you. Should you encounter any issues or need assistance, feel free to reach out to us at support@proled.app
          </div>
        </div>
        <div className={css.faqQ}>
          <input id="q19" type="checkbox" className={css.panel}/>
          <div className={css.plus}>+</div>
          <label htmlFor="q19" className={css.panelTitle}>How do I cancel a session</label>
          <div className={css.panelContent}>You can easily cancel a session from your dashboard by visiting your "Inbox" -> "coaching" and selecting the session you would like to cancel. Then, use ProLed's Messaging System to contact the client about your cancellation. Please confirm the cancellation with your client prior to removing this from your calendar.
          </div>
        </div>
      </div>
    </div>
  );
};

HelpTrainerQs.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HelpTrainerQs.propTypes = {
  rootClassName: string,
  className: string,
};

export default HelpTrainerQs;
