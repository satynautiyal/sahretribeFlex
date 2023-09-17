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
  HelpTrainerQs,
} from '../../components';
import config from '../../config';

import css from './HelpTrainerPage.module.css';

const HelpTrainerPageComponent = props => {
  const { scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: intl.formatMessage({ id: 'HelpGeneralPage.generalTab' }),
      selected: false,
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
      selected: true,
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
          <TopbarContainer currentPage="HelpTrainerPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="HelpGeneralPage.trainerTab" />
            </h1>
            <HelpTrainerQs />
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

HelpTrainerPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const HelpTrainerPage = compose(connect(mapStateToProps), injectIntl)(HelpTrainerPageComponent);

export default HelpTrainerPage;
