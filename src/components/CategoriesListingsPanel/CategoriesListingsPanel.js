import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { ListingCard, NamedLink, PaginationLinks } from '..';
import css from './CategoriesListingsPanel.module.css';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CategoriesListingsPanel = props => {
  const {
    className,
    rootClassName,
    listings,
    pagination,
    search,
    setActiveListing,
    origin,
    urlQueryParams,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const fitnessListings = listings.filter(
    listing => listing.attributes.publicData.category[0] === 'fitness'
  );
  const educationListings = listings.filter(
    listing => listing.attributes.publicData.category[0] === 'education'
  );
  const creativeListings = listings.filter(
    listing => listing.attributes.publicData.category[0] === 'creative'
  );

  const paginationLinks =
    pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="SearchPage"
        pageSearchParams={search}
        pagination={pagination}
      />
    ) : null;

  // Panel width relative to the viewport
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');

  return (
    <div className={classes}>
      {!urlQueryParams?.pub_category &&
      !urlQueryParams?.pub_activity &&
      !urlQueryParams?.keywords ? (
        <>
          <div className={css.categorieHeaderContainer}>
            <h2 className={css.subheader}>Fitness & Sports</h2>
            <NamedLink
              name="CategoriesPage"
              to={{
                search:
                  'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&pub_category=fitness',
              }}
              className={css.legalLink}
            >
              <FormattedMessage id="See all" />
              <FontAwesomeIcon className={css.icon} icon={faChevronRight} />
            </NamedLink>
          </div>
          <div className={css.listingCards}>
            {fitnessListings.slice(0, 6).map(l => (
              <ListingCard
                className={css.listingCard}
                key={l.id.uuid}
                listing={l}
                renderSizes={cardRenderSizes}
                setActiveListing={setActiveListing}
                origin={origin}
              />
            ))}
            {props.children}
          </div>

          <div className={css.categorieHeaderContainer}>
            <h2 className={css.subheader}>Education & Skills</h2>
            <NamedLink
              name="CategoriesPage"
              to={{
                search:
                  'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&pub_category=education',
              }}
              className={css.legalLink}
            >
              <FormattedMessage id="See all" />
              <FontAwesomeIcon className={css.icon} icon={faChevronRight} />
            </NamedLink>
          </div>
          <div className={css.listingCards}>
            {educationListings.slice(0, 6).map(l => (
              <ListingCard
                className={css.listingCard}
                key={l.id.uuid}
                listing={l}
                renderSizes={cardRenderSizes}
                setActiveListing={setActiveListing}
                origin={origin}
              />
            ))}
            {props.children}
          </div>
          <div className={css.categorieHeaderContainer}>
            <h2 className={css.subheader}>Arts, Dance, & Music</h2>
            <NamedLink
              name="CategoriesPage"
              to={{
                search:
                  'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&pub_category=creative',
              }}
              className={css.legalLink}
            >
              <FormattedMessage id="See all" />
              <FontAwesomeIcon className={css.icon} icon={faChevronRight} />
            </NamedLink>{' '}
          </div>
          <div className={css.listingCards}>
            {creativeListings.slice(0, 6).map(l => (
              <ListingCard
                className={css.listingCard}
                key={l.id.uuid}
                listing={l}
                renderSizes={cardRenderSizes}
                setActiveListing={setActiveListing}
                origin={origin}
              />
            ))}
            {props.children}
          </div>
        </>
      ) : (
        <div className={css.listingCards}>
          {!!listings.length ? (
            <>
              {listings.map(l => (
                <ListingCard
                  className={css.listingCard}
                  key={l.id.uuid}
                  listing={l}
                  renderSizes={cardRenderSizes}
                  setActiveListing={setActiveListing}
                  origin={origin}
                />
              ))}
              {props.children}
            </>
          ) : (
            <h2>Nothing was found</h2>
          )}
        </div>
      )}
      {/* {paginationLinks} */}
    </div>
  );
};

CategoriesListingsPanel.defaultProps = {
  children: null,
  className: null,
  listings: [],
  pagination: null,
  rootClassName: null,
  search: null,
};

const { array, node, object, string } = PropTypes;

CategoriesListingsPanel.propTypes = {
  children: node,
  className: string,
  listings: array,
  pagination: propTypes.pagination,
  rootClassName: string,
  search: object,
};

export default CategoriesListingsPanel;
