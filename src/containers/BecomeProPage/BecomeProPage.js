import React, { useRef } from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SectionBecomeProIntro,
  HelpTrainerQs,
  SectionWhyProled,
  SectionHowBecomeCoach,
  BecomeProQuestions,
} from '../../components';

import css from './BecomeProPage.module.css';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

const BecomeProPage = () => {
  const user = useSelector(state => state.user.currentUser);
  const isUserLoggedIn = !!user?.id;

  const ref = useRef();
  const handleScroll = () => ref.current?.scrollIntoView({ behavior: 'smooth' });

  const description = 'Join our community of skilled freelancers in Singapore';
  const title = 'Become a PRO | ProLed';

  return (
    <StaticPage
      description={description}
      title={title}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'BecomeProPage',
        description: { description },
        name: { title },
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <SectionBecomeProIntro
            handleScroll={handleScroll}
            className={css.header}
            isUserLoggedIn={isUserLoggedIn}
          />
          {/* <div className={css.sectionContentFirstChild}> <SectionWhyProled ref={ref} /></div> */}
          <ul className={css.sections}>
            <li className={css.section}></li>
            <li className={css.section}>
              <div className={css.sectionContent}>
                {
                  <SectionHowBecomeCoach
                    ref={ref}
                    buttonLinkName={isUserLoggedIn ? 'NewListingPage' : 'SignupPage'}
                  />
                }
              </div>
            </li>
            <li className={css.section}>
              <div className={css.sectionContent}>
                <div className={css.title}>
                  <FormattedMessage id="Your questions answered" />
                </div>

                <div className={css.subTitle}>
                  <FormattedMessage id="Answers to commonly asked questions about Proled" />
                </div>
                <br />
                <BecomeProQuestions />
              </div>
            </li>
          </ul>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default BecomeProPage;
