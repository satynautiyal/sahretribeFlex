import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './AboutPage.module.css';
import image from './proleadcir.png';

const AboutPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Prolead',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <h1 className={css.pageTitle}>Become Better Together</h1>
            </div>

            <div className={css.contentMain}>
              <h2>
                Prolead is a platform designed to elevate you to the next level. Whether it relates to athletics or mentorship,
                we can help you become the best version of yourself. With Prolead, you will learn from the best leaders in your field about
                what it takes to perform according to the highest standards.
              </h2>
              <h2>
                All three of our founders understand the importance of proper training and mentorship when working to accomplish your goals.
                The brains behind our brand are former top NCAA Division 1 athletes, who saw the need for promising, young talent to have
                direct access to professionals and semi-professionals. Prolead serves as the bridge that connects you with local experts
                who will help identify and master your goals. With Prolead, no goal is too high because you will have those who achieved it
                guiding you in the right direction.
              </h2>
              <div className={css.logoWrapper}>
                <img className={css.logo} src={image} alt="Prolead Logo" />
              </div>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
