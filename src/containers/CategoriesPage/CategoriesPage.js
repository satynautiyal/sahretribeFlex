import React, { Component } from 'react';
import { array, bool, func, oneOf, object, shape, string } from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import unionWith from 'lodash/unionWith';
import classNames from 'classnames';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import { parse, stringify } from '../../util/urlHelpers';
import { propTypes } from '../../util/types';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import {
  SearchMap,
  ModalInMobile,
  LayoutWrapperFooter,
  Footer,
  Page,
  LayoutWrapperAccountSettingsSideNav,
  LayoutSideNavigation,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
} from '../../components';
import { TopbarContainer } from '..';

import { searchListings, searchMapListings, setActiveListing } from './CategoriesPage.duck';
import {
  pickSearchParamsOnly,
  validURLParamsForExtendedData,
  validFilterParams,
  createSearchResultSchema,
} from './CategoriesPage.helpers';
import MainPanel from './MainPanel';
import css from './CategoriesPage.module.css';
import { TopbarSearchForm } from '../../forms';
import { ConditionalWrapper } from '../../components/ConditionalWrapper/ConditionalWrapper';
import { apiBaseUrl } from '../../util/api';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 12 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 24;
const MODAL_BREAKPOINT = 768; // Search is in modal on mobile layout
const SEARCH_WITH_MAP_DEBOUNCE = 300; // Little bit of debounce before search is initiated.

export class CategoriesPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchMapOpenOnMobile: props.tab === 'map',
      isMobileModalOpen: false,
    };

    this.searchMapListingsInProgress = false;

    this.onMapMoveEnd = debounce(this.onMapMoveEnd.bind(this), SEARCH_WITH_MAP_DEBOUNCE);
    this.onOpenMobileModal = this.onOpenMobileModal.bind(this);
    this.onCloseMobileModal = this.onCloseMobileModal.bind(this);

    this.gl = this.gl.bind(this);
    this.scEv = this.scEv.bind(this);

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Callback to determine if new search is needed
  // when map is moved by user or viewport has changed
  onMapMoveEnd(viewportBoundsChanged, data) {
    const { viewportBounds, viewportMapCenter } = data;

    const routes = routeConfiguration();
    const searchPagePath = pathByRouteName('CategoriesPage', routes);
    const currentPath =
      typeof window !== 'undefined' && window.location && window.location.pathname;

    // When using the ReusableMapContainer onMapMoveEnd can fire from other pages than SearchPage too
    const isSearchPage = currentPath === searchPagePath;

    // If mapSearch url param is given
    // or original location search is rendered once,
    // we start to react to "mapmoveend" events by generating new searches
    // (i.e. 'moveend' event in Mapbox and 'bounds_changed' in Google Maps)
    if (viewportBoundsChanged && isSearchPage) {
      const { history, location, filterConfig } = this.props;

      // parse query parameters, including a custom attribute named certificate
      const { address, bounds, mapSearch, ...rest } = parse(location.search, {
        latlng: ['origin'],
        latlngBounds: ['bounds'],
      });

      // const viewportMapCenter = SearchMap.getMapCenter(map);
      const originMaybe = config.sortSearchByDistance ? { origin: viewportMapCenter } : {};

      const searchParams = {
        address,
        ...originMaybe,
        bounds: viewportBounds,
        mapSearch: true,
        ...validFilterParams(rest, filterConfig),
      };

      history.push(createResourceLocatorString('CategoriesPage', routes, {}, searchParams));
    }
  }

  gl = () => {
    const baseUrl = apiBaseUrl();
    window.location.href = `${baseUrl}/api/calendar-api`;
  };

  scEv = () => {
    const baseUrl = apiBaseUrl();
    window.location.href = `${baseUrl}/api/schedule-event`;
  };

  // handleSubmit(values) {
  //   // const { currentSearchParams } = this.props;
  //   const { history } = this.props;

  //   if (values.location.search_type == 'keyword') {
  //     const pub_cat =
  //       values.location.search == 'fitness' ||
  //       values.location.search == 'education' ||
  //       values.location.search == 'creative';
  //     const age_cat =
  //       values.location.search == 'senior' ||
  //       values.location.search == 'adult' ||
  //       values.location.search == 'teen' ||
  //       values.location.search == 'child';

  //     const options = [
  //       { key: 'personal training', label: 'Personal training' },
  //       { key: 'football', label: 'Football' },
  //       { key: 'basketball', label: 'Basketball' },
  //       { key: 'swimming', label: 'Swimming' },
  //       { key: 'tennis', label: 'Tennis' },

  //       { key: 'combat sports', label: 'Combat Sports' },
  //       { key: 'volleyball', label: 'Volleyball' },
  //       { key: 'badminton', label: 'Badminton' },

  //       { key: 'academics', label: 'Academics' },
  //       { key: 'leadership', label: 'Leadership' },
  //       { key: 'tools', label: 'Tools' },
  //       { key: 'mentorship', label: 'Mentorship' },

  //       { key: 'languages', label: 'Languages' },
  //       { key: 'mathematics', label: 'Mathematics' },
  //       { key: 'sciences', label: 'Sciences' },
  //       { key: 'humanities', label: 'Humanities' },
  //       { key: 'leadership coaching', label: 'Leadership Coaching' },
  //       { key: 'professional skills', label: 'Professional Skills' },

  //       { key: 'dance', label: 'Dance' },
  //       { key: 'musical instruments', label: 'Musical instruments' },
  //       { key: 'visual arts', label: 'Visual arts' },

  //       { key: 'music theory', label: 'Music Theory' },
  //       { key: 'production', label: 'Production' },

  //       { key: 'other', label: 'Other' },
  //     ];

  //     const available_option = options.filter(
  //       option => values.location.search.toLowerCase() == option.key
  //     );

  //     const searchParamsk = {
  //       ...urlQueryParams,
  //       // ...originMaybe,
  //       // address: search,
  //       // bounds,

  //       pub_category: pub_cat ? `has_any:${values.location.search.toLowerCase()}` : null,
  //       pub_activity:
  //         !pub_cat && !age_cat && available_option?.length > 0
  //           ? `${values.location.search.toLowerCase()}`
  //           : null,
  //       pub_ageCategory: age_cat ? `has_any:${values.location.search.toLowerCase()}` : null,
  //       keywords:
  //         !pub_cat && !age_cat && available_option?.length === 0
  //           ? `${values.location.search.toLowerCase()}`
  //           : null,
  //     };
  //     history.push(
  //       createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParamsk)
  //     );
  //   }
  //   // else{
  //   //   const { search, selectedPlace } = values.location;
  //   //   const { origin, bounds } = selectedPlace;
  //   //   const originMaybe = config.sortSearchByDistance ? { origin } : {};
  //   //   const searchParams = {
  //   //     ...currentSearchParams,
  //   //     ...originMaybe,
  //   //     address: search,
  //   //     bounds,
  //   //   };
  //   //   history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));

  //   // }
  // }

  // Only render current search if full place object is available in the URL params

  // Invoked when a modal is opened from a child component,
  // for example when a filter modal is opened in mobile view
  onOpenMobileModal() {
    this.setState({ isMobileModalOpen: true });
  }

  // Invoked when a modal is closed from a child component,
  // for example when a filter modal is opened in mobile view
  onCloseMobileModal() {
    this.setState({ isMobileModalOpen: false });
  }

  render() {
    const {
      intl,
      listings,
      filterConfig,
      sortConfig,
      history,
      location,
      mapListings,
      onManageDisableScrolling,
      pagination,
      scrollingDisabled,
      searchInProgress,
      searchListingsError,
      searchParams,
      activeListingId,
      onActivateListing,
      currentUser,
      isAuthenticated,
    } = this.props;

    // eslint-disable-next-line no-unused-vars
    const { mapSearch, page, ...searchInURL } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });
    // urlQueryParams doesn't contain page specific url params
    // like mapSearch, page or origin (origin depends on config.sortSearchByDistance)
    const urlQueryParams = pickSearchParamsOnly(searchInURL, filterConfig, sortConfig);

    // Page transition might initially use values from previous search
    const urlQueryString = stringify(urlQueryParams);
    const paramsQueryString = stringify(
      pickSearchParamsOnly(searchParams, filterConfig, sortConfig)
    );
    //
    const searchParamsAreInSync = urlQueryString === paramsQueryString;

    const validQueryParams = validURLParamsForExtendedData(searchInURL, filterConfig);

    const isWindowDefined = typeof window !== 'undefined';
    const isMobileLayout = isWindowDefined && window.innerWidth < MODAL_BREAKPOINT;
    const shouldShowSearchMap =
      !isMobileLayout || (isMobileLayout && this.state.isSearchMapOpenOnMobile);

    const onMapIconClick = () => {
      this.useLocationSearchBounds = true;
      this.setState({ isSearchMapOpenOnMobile: true });
    };

    const { address, bounds, origin } = searchInURL || {};
    const { title, description, schema } = createSearchResultSchema(listings, address, intl);

    // Set topbar class based on if a modal is open in
    // a child component
    const topbarClasses = this.state.isMobileModalOpen
      ? classNames(css.topbarBehindModal, css.topbar)
      : css.topbar;

    // N.B. openMobileMap button is sticky.
    // For some reason, stickyness doesn't work on Safari, if the element is <button>

    // const locationFieldsPresent = config.sortSearchByDistance
    //   ? address && origin && bounds
    //   : address && bounds;
    // const initialSearchFormValues = {
    //   location: locationFieldsPresent
    //     ? {
    //         search: address,
    //         selectedPlace: { address, origin, bounds },
    //       }
    //     : null,
    // };

    // const search = (
    //   <TopbarSearchForm
    //     className={css.searchLink}
    //     desktopInputRoot={css.topbarSearchWithLeftPadding}
    //     onSubmit={this.handleSubmit}
    //     initialValues={initialSearchFormValues}
    //   />
    // );

    return (
      <Page
        scrollingDisabled={scrollingDisabled}
        description={description}
        title={title}
        schema={schema}
      >
        {/* <LayoutSideNavigation> */}
        <LayoutWrapperTopbar>
          <TopbarContainer
            className={topbarClasses}
            currentPage="SearchPage"
            currentSearchParams={urlQueryParams}
            //
          />
        </LayoutWrapperTopbar>{' '}
        <ConditionalWrapper
          condition={isAuthenticated}
          wrapper={children => <LayoutSideNavigation>{children}</LayoutSideNavigation>}
        >
          {/* <LayoutSideNavigation> */}
          {isAuthenticated && (
            <LayoutWrapperAccountSettingsSideNav
              className={css.sideNav}
              currentTab="CategoriesPage"
              userProfile={true}
              isAvatar={true}
              currentUser={currentUser}
              // isProUser={true}
            />
          )}
          <LayoutWrapperMain className={css.wrapperMain}>
            <div className={css.container}>
              {/* {search} */}
              <MainPanel
                urlQueryParams={validQueryParams}
                listings={listings}
                searchInProgress={searchInProgress}
                searchListingsError={searchListingsError}
                searchParamsAreInSync={searchParamsAreInSync}
                onActivateListing={onActivateListing}
                onManageDisableScrolling={onManageDisableScrolling}
                onOpenModal={this.onOpenMobileModal}
                onCloseModal={this.onCloseMobileModal}
                onMapIconClick={onMapIconClick}
                pagination={pagination}
                searchParamsForPagination={parse(location.search)}
                showAsModalMaxWidth={MODAL_BREAKPOINT}
                history={history}
                origin={origin}
                currentSearchParams={urlQueryParams}
                isAuthenticated={isAuthenticated}
                location={location}
              />
              {/* <button onClick={this.gl}>fdfdfdf</button>
              <button onClick={this.scEv}>Schedule event</button> */}
              {validQueryParams?.pub_category && (
                <ModalInMobile
                  className={isAuthenticated ? css.authenticatedUserMapPanel : css.mapPanel}
                  id="SearchPage.map"
                  isModalOpenOnMobile={this.state.isSearchMapOpenOnMobile}
                  onClose={() => this.setState({ isSearchMapOpenOnMobile: false })}
                  showAsModalMaxWidth={MODAL_BREAKPOINT}
                  onManageDisableScrolling={onManageDisableScrolling}
                >
                  <div className={css.mapWrapper}>
                    {shouldShowSearchMap ? (
                      <SearchMap
                        reusableContainerClassName={
                          isAuthenticated ? css.authenticatedUserMap : css.map
                        }
                        activeListingId={activeListingId}
                        bounds={bounds}
                        center={origin}
                        isSearchMapOpenOnMobile={this.state.isSearchMapOpenOnMobile}
                        location={location}
                        listings={mapListings || []}
                        onMapMoveEnd={this.onMapMoveEnd}
                        onCloseAsModal={() => {
                          onManageDisableScrolling('SearchPage.map', false);
                        }}
                        messages={intl.messages}
                      />
                    ) : null}
                  </div>
                </ModalInMobile>
              )}
            </div>
          </LayoutWrapperMain>
          {/* </LayoutSideNavigation> */}
        </ConditionalWrapper>
        {/* </LayoutSideNavigation> */}
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </Page>
    );
  }
}

CategoriesPageComponent.defaultProps = {
  listings: [],
  mapListings: [],
  pagination: null,
  searchListingsError: null,
  searchParams: {},
  tab: 'listings',
  filterConfig: config.custom.filters,
  sortConfig: config.custom.sortConfig,
  activeListingId: null,
};

CategoriesPageComponent.propTypes = {
  listings: array,
  mapListings: array,
  onActivateListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onSearchMapListings: func.isRequired,
  pagination: propTypes.pagination,
  scrollingDisabled: bool.isRequired,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  searchParams: object,
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
  filterConfig: propTypes.filterConfig,
  sortConfig: propTypes.sortConfig,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
    activeListingId,
  } = state.SearchPage;
  const pageListings = getListingsById(state, currentPageResultIds);
  const mapListings = getListingsById(
    state,
    unionWith(currentPageResultIds, searchMapListingIds, (id1, id2) => id1.uuid === id2.uuid)
  );
  const { currentUser } = state.user;
  const { isAuthenticated } = state.Auth;

  return {
    listings: pageListings,
    mapListings,
    pagination,
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
    searchInProgress,
    searchListingsError,
    searchParams,
    activeListingId,
    isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onSearchMapListings: searchParams => dispatch(searchMapListings(searchParams)),
  onActivateListing: listingId => dispatch(setActiveListing(listingId)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const CategoriesPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(CategoriesPageComponent);

export default CategoriesPage;
