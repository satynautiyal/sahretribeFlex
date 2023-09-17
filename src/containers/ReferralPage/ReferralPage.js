import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from '../../util/reactIntl';
//import { fetchCurrentUser, sendVerificationEmail } from '../../ducks/user.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  UserNav,
  Avatar,
  BookingTimeInfo,
  NamedLink,
  NotificationBadge,
  Page,
  PaginationLinks,
  TabNav,
  LayoutWrapperSideNav,
  IconSpinner,
  UserDisplayName,
  AvatarLarge,
  Reviews,
} from '../../components';
import { TopbarContainer } from '..';

import { isScrollingDisabled } from '../../ducks/UI.duck';
import css from './ReferralPage.module.css';
import { referralScript } from '../../util/referal';
// import { loadData } from './ReferralPage.duck';

export const ReferralPageComponent = props => {
  const {} = props;

  const title = 'Referral page';

  // const [isShown, setIsShown] = useState(false);

  // useEffect(() => {
  //   const head = document.querySelector('head');

  //   // const script = document.createElement('script');
  //   // script.src = referralScript;
  //   // script.async = true;
  //   // head.appendChild(script);
  //   // return () => {
  //   //   // head.removeChild(script);
  //   // };
  //   // const script = document.createElement('script');
  //   // script.src = referralScript;
  //   // script.async = true;
  //   // head.appendChild(script);
  // }, []);

  // function handleLoadScript() {
  //   // import('../../util/referal')
  //   //   .then(({ referralScript }) => {
  //   //     // Use functionFromModule
  //   //     referralScript();
  //   //   })
  //   //   .catch(err => {
  //   //     // Handle failure
  //   //   });

  //   const script = document.createElement('script');

  //   script.src = referralScript;
  //   script.async = true;

  //   document.body.appendChild(script);
  // }
  // const scrollingDisabled = true;

  return (
    <Page title={title} scrollingDisabled={false}>
      {/* <LayoutSideNavigation> */}
      <LayoutWrapperTopbar>
        <TopbarContainer
          currentPage="ContactDetailsPage"
          desktopClassName={css.desktopTopbar}
          mobileClassName={css.mobileTopbar}
        />
      </LayoutWrapperTopbar>
      <LayoutWrapperMain>
        <div className={css.content}>
          <iframe
            id="refcandy-candyjar"
            data-id="hd0ejut5uckxjcs4icwk7emv5"
            data-height="900"
            data-width="100%"
            frameborder="0"
          ></iframe>
        </div>
      </LayoutWrapperMain>
      <LayoutWrapperFooter>
        <Footer />
      </LayoutWrapperFooter>
      {/* </LayoutSideNavigation> */}
    </Page>
  );
};

ReferralPageComponent.defaultProps = {};

ReferralPageComponent.propTypes = {};

const mapStateToProps = state => {
  // Topbar needs user info.
  const { userShowError } = state.ReviewsPage;

  return { userShowError };
};

const ReferralPage = compose(connect(mapStateToProps), injectIntl)(ReferralPageComponent);

// ReferralPage.loadData = loadData;

export default ReferralPage;
