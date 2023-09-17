import React, { Component } from 'react';
import { array, bool, func, number, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { FormattedMessage } from '../../util/reactIntl';
import { createResourceLocatorString } from '../../util/routes';
import { isAnyFilterActive } from '../../util/search';
import { propTypes } from '../../util/types';
import {
  SearchResultsPanel,
  SearchFiltersMobile,
  SearchFiltersPrimary,
  SearchFiltersSecondary,
  SortBy,
  CategoriesListingsPanel,
} from '../../components';

import FilterComponent from './FilterComponent';
import { validFilterParams } from './CategoriesPage.helpers';
import { parse } from '../../util/urlHelpers';

import css from './CategoriesPage.module.css';
import { TopbarSearchForm } from '../../forms';

// Primary filters have their content in dropdown-popup.
// With this offset we move the dropdown to the left a few pixels on desktop layout.
const FILTER_DROPDOWN_OFFSET = -14;

const cleanSearchFromConflictingParams = (searchParams, sortConfig, filterConfig) => {
  // Single out filters that should disable SortBy when an active
  // keyword search sorts the listings according to relevance.
  // In those cases, sort parameter should be removed.
  const sortingFiltersActive = isAnyFilterActive(
    sortConfig.conflictingFilters,
    searchParams,
    filterConfig
  );
  return sortingFiltersActive
    ? { ...searchParams, [sortConfig.queryParamName]: null }
    : searchParams;
};

/**
 * MainPanel contains search results and filters.
 * There are 3 presentational container-components that show filters:
 * SearchfiltersMobile, SearchFiltersPrimary, and SearchFiltersSecondary.
 * The last 2 are for desktop layout.
 */
class MainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { isSecondaryFiltersOpen: false, currentQueryParams: props.urlQueryParams };

    this.applyFilters = this.applyFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);

    this.initialValues = this.initialValues.bind(this);
    this.getHandleChangedValueFn = this.getHandleChangedValueFn.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    // SortBy
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  // Apply the filters by redirecting to SearchPage with new filters.
  applyFilters() {
    const { history, urlQueryParams, sortConfig, filterConfig } = this.props;
    const searchParams = { ...urlQueryParams, ...this.state.currentQueryParams };
    const search = cleanSearchFromConflictingParams(searchParams, sortConfig, filterConfig);

    history.push(createResourceLocatorString('CategoriesPage', routeConfiguration(), {}, search));
  }

  // Close the filters by clicking cancel, revert to the initial params
  cancelFilters() {
    this.setState({ currentQueryParams: {} });
  }

  // Reset all filter query parameters
  resetAll(e) {
    const { urlQueryParams, history, filterConfig } = this.props;
    const filterQueryParamNames = filterConfig.map(f => f.queryParamNames);

    // Reset state
    this.setState({ currentQueryParams: {} });

    // Reset routing params
    const queryParams = omit(urlQueryParams, filterQueryParamNames);
    history.push(
      createResourceLocatorString('CategoriesPage', routeConfiguration(), {}, queryParams)
    );
  }

  initialValues(queryParamNames) {
    // Query parameters that are visible in the URL
    const urlQueryParams = this.props.urlQueryParams;
    // Query parameters that are in state (user might have not yet clicked "Apply")
    const currentQueryParams = this.state.currentQueryParams;

    // Get initial value for a given parameter from state if its there.
    const getInitialValue = paramName => {
      const currentQueryParam = currentQueryParams[paramName];
      const hasQueryParamInState = typeof currentQueryParam !== 'undefined';
      return hasQueryParamInState ? currentQueryParam : urlQueryParams[paramName];
    };

    // Return all the initial values related to given queryParamNames
    // InitialValues for "amenities" filter could be
    // { amenities: "has_any:towel,jacuzzi" }
    const isArray = Array.isArray(queryParamNames);
    return isArray
      ? queryParamNames.reduce((acc, paramName) => {
          return { ...acc, [paramName]: getInitialValue(paramName) };
        }, {})
      : {};
  }

  handleSubmit(values) {
    // const { currentSearchParams } = this.props;
    const { history } = this.props;

    if (values.location.search_type == 'keyword') {
      const pub_cat =
        values.location.search == 'fitness' ||
        values.location.search == 'education' ||
        values.location.search == 'creative';
      const age_cat =
        values.location.search == 'senior' ||
        values.location.search == 'adult' ||
        values.location.search == 'teen' ||
        values.location.search == 'child';

      const options = [
        { key: 'personal training', label: 'Personal training' },
        { key: 'football', label: 'Football' },
        { key: 'basketball', label: 'Basketball' },
        { key: 'swimming', label: 'Swimming' },
        { key: 'tennis', label: 'Tennis' },

        { key: 'combat sports', label: 'Combat Sports' },
        { key: 'volleyball', label: 'Volleyball' },
        { key: 'badminton', label: 'Badminton' },

        { key: 'academics', label: 'Academics' },
        { key: 'leadership', label: 'Leadership' },
        { key: 'tools', label: 'Tools' },
        { key: 'mentorship', label: 'Mentorship' },

        { key: 'languages', label: 'Languages' },
        { key: 'mathematics', label: 'Mathematics' },
        { key: 'sciences', label: 'Sciences' },
        { key: 'humanities', label: 'Humanities' },
        { key: 'leadership coaching', label: 'Leadership Coaching' },
        { key: 'professional skills', label: 'Professional Skills' },

        { key: 'dance', label: 'Dance' },
        { key: 'musical instruments', label: 'Musical instruments' },
        { key: 'visual arts', label: 'Visual arts' },

        { key: 'music theory', label: 'Music Theory' },
        { key: 'production', label: 'Production' },

        { key: 'other', label: 'Other' },
      ];

      const available_option = options.filter(
        option => values.location.search.toLowerCase() == option.key
      );

      const searchParamsk = {
        ...this.props.currentSearchParams,
        // ...originMaybe,
        // address: search,
        // bounds,

        pub_category: pub_cat ? `has_any:${values.location.search.toLowerCase()}` : null,
        pub_activity:
          !pub_cat && !age_cat && available_option?.length > 0
            ? `${values.location.search.toLowerCase()}`
            : null,
        pub_ageCategory: age_cat ? `has_any:${values.location.search.toLowerCase()}` : null,
        keywords:
          !pub_cat && !age_cat && available_option?.length === 0
            ? `${values.location.search.toLowerCase()}`
            : null,
      };
      history.push(
        createResourceLocatorString('CategoriesPage', routeConfiguration(), {}, searchParamsk)
      );
    }
    // else{
    //   const { search, selectedPlace } = values.location;
    //   const { origin, bounds } = selectedPlace;
    //   const originMaybe = config.sortSearchByDistance ? { origin } : {};
    //   const searchParams = {
    //     ...currentSearchParams,
    //     ...originMaybe,
    //     address: search,
    //     bounds,
    //   };
    //   history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));

    // }
  }

  getHandleChangedValueFn(useHistoryPush) {
    const { urlQueryParams, history, sortConfig, filterConfig } = this.props;

    return updatedURLParams => {
      const updater = prevState => {
        const { address, bounds } = urlQueryParams;
        const mergedQueryParams = { ...urlQueryParams, ...prevState.currentQueryParams };

        // Address and bounds are handled outside of MainPanel.
        // I.e. TopbarSearchForm && search by moving the map.
        // We should always trust urlQueryParams with those.
        return {
          currentQueryParams: { ...mergedQueryParams, ...updatedURLParams, address, bounds },
        };
      };

      const callback = () => {
        if (useHistoryPush) {
          const searchParams = this.state.currentQueryParams;
          const search = cleanSearchFromConflictingParams(searchParams, sortConfig, filterConfig);
          history.push(
            createResourceLocatorString('CategoriesPage', routeConfiguration(), {}, search)
          );
        }
      };

      this.setState(updater, callback);
    };
  }

  handleSortBy(urlParam, values) {
    const { history, urlQueryParams } = this.props;
    const queryParams = values
      ? { ...urlQueryParams, [urlParam]: values }
      : omit(urlQueryParams, urlParam);

    history.push(
      createResourceLocatorString('CategoriesPage', routeConfiguration(), {}, queryParams)
    );
  }

  render() {
    const {
      className,
      rootClassName,
      urlQueryParams,
      listings,
      searchInProgress,
      searchListingsError,
      searchParamsAreInSync,
      onActivateListing,
      onManageDisableScrolling,
      onOpenModal,
      onCloseModal,
      onMapIconClick,
      pagination,
      searchParamsForPagination,
      showAsModalMaxWidth,
      filterConfig,
      sortConfig,
      origin,
      isAuthenticated,
    } = this.props;

    const primaryFilters = filterConfig.filter(f => f.group === 'primary');
    const secondaryFilters = filterConfig.filter(f => f.group !== 'primary');
    const hasSecondaryFilters = !!(secondaryFilters && secondaryFilters.length > 0);

    // Selected aka active filters
    const selectedFilters = validFilterParams(urlQueryParams, filterConfig);
    const selectedFiltersCount = Object.keys(selectedFilters).length;

    // Selected aka active secondary filters
    const selectedSecondaryFilters = hasSecondaryFilters
      ? validFilterParams(urlQueryParams, secondaryFilters)
      : {};
    const selectedSecondaryFiltersCount = Object.keys(selectedSecondaryFilters).length;

    const isSecondaryFiltersOpen = !!hasSecondaryFilters && this.state.isSecondaryFiltersOpen;
    const propsForSecondaryFiltersToggle = hasSecondaryFilters
      ? {
          isSecondaryFiltersOpen: this.state.isSecondaryFiltersOpen,
          toggleSecondaryFiltersOpen: isOpen => {
            this.setState({ isSecondaryFiltersOpen: isOpen });
          },
          selectedSecondaryFiltersCount,
        }
      : {};

    // With time-based availability filtering, pagination is NOT
    // supported. In these cases we get the pagination support info in
    // the response meta object, and we can use the count of listings
    // as the result count.
    //
    // See: https://www.sharetribe.com/api-reference/marketplace.html#availability-filtering
    const hasPaginationInfo = !!pagination && !pagination.paginationUnsupported;
    const listingsLength = listings ? listings.length : 0;
    const totalItems =
      searchParamsAreInSync && hasPaginationInfo ? pagination.totalItems : listingsLength;

    const listingsAreLoaded = !searchInProgress && searchParamsAreInSync;

    const sortBy = mode => {
      const conflictingFilterActive = isAnyFilterActive(
        sortConfig.conflictingFilters,
        urlQueryParams,
        filterConfig
      );

      const mobileClassesMaybe =
        mode === 'mobile'
          ? {
              rootClassName: css.sortBy,
              menuLabelRootClassName: css.sortByMenuLabel,
            }
          : {};
      return sortConfig.active ? (
        <SortBy
          {...mobileClassesMaybe}
          sort={urlQueryParams[sortConfig.queryParamName]}
          isConflictingFilterActive={!!conflictingFilterActive}
          onSelect={this.handleSortBy}
          showAsPopup
          contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
        />
      ) : null;
    };

    const classes = classNames(rootClassName || css.searchResultContainer, className);
    const { history, location } = this.props;

    const { mobilemenu, mobilesearch, address, bounds } = parse(location?.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const locationFieldsPresent = config.sortSearchByDistance
      ? address && origin && bounds
      : address && bounds;
    const initialSearchFormValues = {
      location: locationFieldsPresent
        ? {
            search: address,
            selectedPlace: { address, origin, bounds },
          }
        : null,
    };

    const search = (
      <TopbarSearchForm
        className={css.searchLink}
        desktopInputRoot={css.topbarSearchWithLeftPadding}
        onSubmit={this.handleSubmit}
        initialValues={initialSearchFormValues}
      />
    );

    const searchMobile = (
      <TopbarSearchForm
        className={css.searchMobileLink}
        desktopInputRoot={css.topbarSearchWithLeftPadding}
        onSubmit={this.handleSubmit}
        initialValues={initialSearchFormValues}
        isMobile={true}
      />
    );
    return (
      <div className={classes}>
        <div className={css.searchContainer}>
          {isAuthenticated && search}
          {isAuthenticated && searchMobile}
        </div>

        {/* show filters only for choosen category (if category presents in URL) */}
        {(urlQueryParams?.pub_category || urlQueryParams?.pub_activity) && (
          <>
            <SearchFiltersPrimary
              className={css.searchFiltersPrimary}
              sortByComponent={sortBy('desktop')}
              listingsAreLoaded={listingsAreLoaded}
              resultsCount={totalItems}
              searchInProgress={searchInProgress}
              searchListingsError={searchListingsError}
              history={this.props.history}
              {...propsForSecondaryFiltersToggle}
            >
              {primaryFilters.map((config, index) => {
                let newConfig = { ...config };

                // show activities depending on shoosen category
                if (urlQueryParams['pub_category'] === 'fitness' && index === 1) {
                  newConfig = { ...config, config: config['configFitness'] };
                }
                if (urlQueryParams['pub_category'] === 'education' && index === 1) {
                  newConfig = { ...config, config: config['configSkills'] };
                }
                if (urlQueryParams['pub_category'] === 'creative' && index === 1) {
                  newConfig = { ...config, config: config['configCreative'] };
                }
                return (
                  <FilterComponent
                    key={`SearchFiltersPrimary.${config.id}`}
                    idPrefix="SearchFiltersPrimary"
                    filterConfig={newConfig}
                    urlQueryParams={urlQueryParams}
                    initialValues={this.initialValues}
                    getHandleChangedValueFn={this.getHandleChangedValueFn}
                    showAsPopup
                    contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
                  />
                );
              })}
            </SearchFiltersPrimary>
            <SearchFiltersMobile
              className={css.searchFiltersMobile}
              urlQueryParams={urlQueryParams}
              sortByComponent={sortBy('mobile')}
              listingsAreLoaded={listingsAreLoaded}
              resultsCount={totalItems}
              searchInProgress={searchInProgress}
              searchListingsError={searchListingsError}
              showAsModalMaxWidth={showAsModalMaxWidth}
              onMapIconClick={onMapIconClick}
              onManageDisableScrolling={onManageDisableScrolling}
              onOpenModal={onOpenModal}
              onCloseModal={onCloseModal}
              resetAll={this.resetAll}
              selectedFiltersCount={selectedFiltersCount}
            >
              {filterConfig.map(config => {
                return (
                  <FilterComponent
                    key={`SearchFiltersMobile.${config.id}`}
                    idPrefix="SearchFiltersMobile"
                    filterConfig={config}
                    urlQueryParams={urlQueryParams}
                    initialValues={this.initialValues}
                    getHandleChangedValueFn={this.getHandleChangedValueFn}
                    liveEdit
                    showAsPopup={false}
                  />
                );
              })}
            </SearchFiltersMobile>
          </>
        )}
        {isSecondaryFiltersOpen ? (
          <div className={classNames(css.searchFiltersPanel)}>
            <SearchFiltersSecondary
              urlQueryParams={urlQueryParams}
              listingsAreLoaded={listingsAreLoaded}
              applyFilters={this.applyFilters}
              cancelFilters={this.cancelFilters}
              resetAll={this.resetAll}
              onClosePanel={() => this.setState({ isSecondaryFiltersOpen: false })}
            >
              {secondaryFilters.map(config => {
                return (
                  <FilterComponent
                    key={`SearchFiltersSecondary.${config.id}`}
                    idPrefix="SearchFiltersSecondary"
                    filterConfig={config}
                    urlQueryParams={urlQueryParams}
                    initialValues={this.initialValues}
                    getHandleChangedValueFn={this.getHandleChangedValueFn}
                    showAsPopup={false}
                  />
                );
              })}
            </SearchFiltersSecondary>
          </div>
        ) : (
          <div
            className={classNames(css.listings, {
              [css.newSearchInProgress]: !listingsAreLoaded,
            })}
          >
            {searchListingsError ? (
              <h2 className={css.error}>
                <FormattedMessage id="SearchPage.searchError" />
              </h2>
            ) : null}
            {/*  */}
            {/* <SearchResultsPanel
              className={css.searchListingsPanel}
              listings={listings}
              pagination={listingsAreLoaded ? pagination : null}
              search={searchParamsForPagination}
              setActiveListing={onActivateListing}
              origin={origin}
            /> */}
            <CategoriesListingsPanel
              className={css.searchListingsPanel}
              listings={listings}
              pagination={listingsAreLoaded ? pagination : null}
              search={searchParamsForPagination}
              setActiveListing={onActivateListing}
              origin={origin}
              urlQueryParams={urlQueryParams}
            />
          </div>
        )}
      </div>
    );
  }
}

MainPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listings: [],
  resultsCount: 0,
  pagination: null,
  searchParamsForPagination: {},
  filterConfig: config.custom.filters,
  sortConfig: config.custom.sortConfig,
};

MainPanel.propTypes = {
  className: string,
  rootClassName: string,

  urlQueryParams: object.isRequired,
  listings: array,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  searchParamsAreInSync: bool.isRequired,
  onActivateListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onOpenModal: func.isRequired,
  onCloseModal: func.isRequired,
  onMapIconClick: func.isRequired,
  pagination: propTypes.pagination,
  searchParamsForPagination: object,
  showAsModalMaxWidth: number.isRequired,
  filterConfig: propTypes.filterConfig,
  sortConfig: propTypes.sortConfig,

  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default MainPanel;
