import React from 'react';
import { string, func, object } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import { TopbarSearchForm } from '../../forms';

import css from './SectionHero.module.css';

const SectionHero = props => {
  const { rootClassName, className, initialSearchFormValues, onSearchSubmit } = props;

  const classes = classNames(rootClassName || css.root, className);

  const searchMobile = (
    <TopbarSearchForm
      className={css.searchLinkMobile}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
      isMobile={true}
    />
  );
  const search = (
    <TopbarSearchForm
      className={css.searchLink}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
    />
  );

  return (
    <div className={classes}>
      <div className={css.mobileHero}>
        <h1 className={css.mobileTitle}>
          <div>
            <FormattedMessage id="SectionHero.title1" />
            <span className={css.proSpan}>
              <FormattedMessage id="SectionHero.title2" />{' '}
            </span>
            <div className={css.carousel}>
              {/* <div className={css.pre}>I'm a </div> */}
              <div className={css.change_outer}>
                <div className={css.change_inner}>
                  <div className={css.element}>Music</div>
                  <div className={css.element}>Dance</div>
                  <div className={css.element}>Arts</div>
                  <div className={css.element}>Education</div>
                  <div className={css.element}>Sports</div>
                  <div className={css.element}>Fitness</div>
                </div>
              </div>
            </div>
          </div>
          {searchMobile}
        </h1>
        {/* <div className={css.mobileImg}>
          <img className={css.mobileSlides} src={image} alt="Homepage Slideshow" />
        </div> */}
      </div>
      <div className={css.heroContent}>
        <div className={css.contentLeft}>
          <h1 className={css.heroMainTitle}>
            <div className={css.titleContainer}>
              <FormattedMessage id="SectionHero.title1" />
              <span className={css.proSpan}>
                <FormattedMessage id="SectionHero.title2" />
              </span>{' '}
              <div className={css.carousel}>
                {/* <div className={css.pre}>I'm a </div> */}
                <div className={css.change_outer}>
                  <div className={css.change_inner}>
                    <div className={css.element}>Music</div>
                    <div className={css.element}>Dance</div>
                    <div className={css.element}>Arts</div>
                    <div className={css.element}>Education</div>
                    <div className={css.element}>Sports</div>
                    <div className={css.element}>Fitness</div>
                  </div>
                </div>
              </div>
            </div>
            {search}
          </h1>
          {/* {search} */}
          {/* <h2 className={css.heroSubTitle}>
            <FormattedMessage id="SectionHero.subTitle" />
          </h2> */}

          <div className={css.buttonsContainer}>
            <NamedLink
              name="SearchPage"
              to={{
                search: 'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873',
              }}
              className={css.searchButton}
            >
              <FormattedMessage id="SectionHero.findProButton" />
            </NamedLink>
            <NamedLink name="HowWorksPage" className={css.heroButton}>
              <FormattedMessage id="SectionHero.browseButton" />
            </NamedLink>
          </div>
        </div>
        {/* <div className={css.contentRight}>
          <img className={css.homeSlides} src={image} alt="Homepage Slideshow" />
        </div> */}
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null, initialSearchFormValues: {} };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
  initialSearchFormValues: object,
  onSearchSubmit: func.isRequired,
};

export default SectionHero;
