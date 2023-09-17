import React from 'react';
import { bool, func, node, number, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './SearchFiltersPrimary.module.css';
import { LocationSearchForm, TopbarSearchForm } from '../../forms';
import { FilterPopup, Form, LocationAutocompleteInput } from '../../components';
import { createResourceLocatorString } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import { useState } from 'react';
import FilterComponent from '../../containers/SearchPage/FilterComponent';

const SearchFiltersPrimaryComponent = props => {
  const {
    rootClassName,
    className,
    children,
    sortByComponent,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    isSecondaryFiltersOpen,
    toggleSecondaryFiltersOpen,
    selectedSecondaryFiltersCount,
    history,
    values,
    ...rest
  } = props;

  const [showSearcLocation, setShowSearchLocation] = useState(false);

  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, className);

  const toggleSecondaryFiltersOpenButtonClasses =
    isSecondaryFiltersOpen || selectedSecondaryFiltersCount > 0
      ? css.searchFiltersPanelOpen
      : css.searchFiltersPanelClosed;
  const toggleSecondaryFiltersOpenButton = toggleSecondaryFiltersOpen ? (
    <button
      className={toggleSecondaryFiltersOpenButtonClasses}
      onClick={() => {
        toggleSecondaryFiltersOpen(!isSecondaryFiltersOpen);
      }}
    >
      <FormattedMessage
        id="SearchFiltersPrimary.moreFiltersButton"
        values={{ count: selectedSecondaryFiltersCount }}
      />
    </button>
  ) : null;

  const handleSearchSubmit = values => {
    const { search, selectedPlace } = values.location;
    const { origin, bounds } = selectedPlace;
    const searchParams = { address: search, origin, bounds };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
    setShowSearchLocation(false);
  };

  return (
    <div className={classes}>
      <div className={css.filters}>
        <div className={css.filterButtons}>
          {children}

          <FilterPopup
            className={css.locationSearch}
            //rootClassName={rootClassName}
            popupClassName={css.popupSize}
            name={'location'}
            label={'Location'}
            isSelected={values}
            id={`$popup`}
            showAsPopup={true}
            labelMaxWidth={550}
            contentPlacementOffset={'-14px'}
            showButtons={true}
            onSubmit={() => {}}
            initialValues={{}}
            // keepDirtyOnReinitialize
            {...rest}
          >
            {/* <FieldTextInput
              // className={css.field}
              name={'name'}
              id={`-input`}
              type="text"
              label={'filterText'}
              placeholder={'placeholder'}
              autoComplete="off"
              ///
            /> */}
            <LocationSearchForm className={css.input} onSubmit={handleSearchSubmit} />
          </FilterPopup>

          {/* <div className={css.search}>
            <button
              onClick={() => setShowSearchLocation(!showSearcLocation)}
              // className={classNames(labelStyles, labelMaxWidthStyles)}
              // style={labelMaxWidthMaybe}
              // onClick={() => this.toggleOpen()}
              className={css.label}
            >
              {'label'}
            </button>
            {showSearcLocation && (
              <LocationSearchForm className={css.searchForm} onSubmit={handleSearchSubmit} />
            )}
          </div> */}

          {sortByComponent}
        </div>
        {toggleSecondaryFiltersOpenButton}
      </div>

      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFiltersPrimary.noResults" />
        </div>
      ) : null}

      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFiltersPrimary.loadingResults" />
        </div>
      ) : null}
      <br />
      <div className={css.searchOptions}>
        {!!resultsCount &&
          (listingsAreLoaded ? (
            <div className={css.searchResultSummary}>
              <span className={css.resultsFound}>
                <FormattedMessage
                  id="SearchFiltersPrimary.foundResults"
                  values={{ count: resultsCount }}
                />
              </span>
            </div>
          ) : null)}
      </div>
    </div>
  );
};

SearchFiltersPrimaryComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchInProgress: false,
  isSecondaryFiltersOpen: false,
  toggleSecondaryFiltersOpen: null,
  selectedSecondaryFiltersCount: 0,
  sortByComponent: null,
};

SearchFiltersPrimaryComponent.propTypes = {
  rootClassName: string,
  className: string,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchInProgress: bool,
  isSecondaryFiltersOpen: bool,
  toggleSecondaryFiltersOpen: func,
  selectedSecondaryFiltersCount: number,
  sortByComponent: node,
};

const SearchFiltersPrimary = SearchFiltersPrimaryComponent;

export default SearchFiltersPrimary;
