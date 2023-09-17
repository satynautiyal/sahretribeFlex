import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { TopbarContainer } from '../../containers';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  HelpGeneralQs,
} from '../../components';
import config from '../../config';

import css from './HelpGeneralPage.module.css';

const HelpGeneralPageComponent = props => {
  const { scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: intl.formatMessage({ id: 'HelpGeneralPage.generalTab' }),
      selected: true,
      linkProps: {
        name: 'HelpGeneralPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'HelpGeneralPage.clientTab' }),
      selected: false,
      linkProps: {
        name: 'HelpClientPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'HelpGeneralPage.trainerTab' }),
      selected: false,
      linkProps: {
        name: 'HelpTrainerPage',
      },
    },
  ];
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'HelpGeneralPage.schemaTitle' }, { siteTitle });
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  return (
    <Page title={schemaTitle} scrollingDisabled={scrollingDisabled} schema={schema}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="AccessibilityPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="HelpGeneralPage.heading" />
            </h1>
            <HelpGeneralQs />
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

const { bool } = PropTypes;

HelpGeneralPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const HelpGeneralPage = compose(connect(mapStateToProps), injectIntl)(HelpGeneralPageComponent);

export default HelpGeneralPage;
