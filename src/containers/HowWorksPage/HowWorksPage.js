import React, { useRef } from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  SectionHowItWorks,
  SectionFindPersonal,
  SectionFindGroup,
  SectionFindVirtual,
  SectionHowIntro,
  // SectionProtected,
  LayoutWrapperFooter,
  Footer,
  HowItWorkQuestions,
} from '../../components';

import css from './HowWorksPage.module.css';
import { FormattedMessage } from 'react-intl';

const HowWorksPage = () => {
  const ref = useRef();
  const handleScroll = () => ref.current?.scrollIntoView({ behavior: 'smooth' });
  // prettier-ignore
  return (
    <StaticPage
      title="How It Works"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'HowWorksPage',
        description: 'How It Works | Prolead',
        name: 'How It Works Page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
          {/* <div className={css.containerMobile}>
            <div className={css.titleMobile}>
              <FormattedMessage id="SectionHowIntro.title" />
            </div>
          </div> */}
          <div className={css.headerContainer}>
            <SectionHowIntro className={css.header} handleScroll={handleScroll}/>
          </div>
          <ul className={css.sections}>
            <li className={css.section}>
              <div className={css.sectionContentFirstChild}>
                <SectionFindPersonal ref={ref}/>
                <SectionFindGroup/>
                <SectionFindVirtual/>
              </div>
            </li>
            {/* <li className={css.section}>
              <div className={css.sectionContent}>
                <SectionHowItWorks/>
              </div>
            </li> */}
            
            {/*<li className={css.section}>*/}
            {/*  <div className={css.sectionContent}>*/}
            {/*    <SectionProtected />*/}
            {/*  </div>*/}
            {/*</li>*/}
            <li className={css.section}>
              <div className={css.sectionContent}>
                <div className={css.title}>
                  <FormattedMessage id="Your questions answered" />
                </div>

                <div className={css.subTitle}>
                  <FormattedMessage id="Answers to commonly asked questions about Proled" />
                </div>
                <br />
                <HowItWorkQuestions />
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

export default HowWorksPage;
