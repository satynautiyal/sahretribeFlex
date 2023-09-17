import React from 'react';
import {
  BookingDateRangeFilter,
  BookingDateRangeLengthFilter,
  PriceFilter,
  KeywordFilter,
  SelectSingleFilter,
  SelectMultipleFilter,
  FilterPopup,
  FieldTextInput,
} from '../../components';
import { LocationSearchForm } from '../../forms';
import { createResourceLocatorString } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';

/**
 * FilterComponent is used to map configured filter types
 * to actual filter components
 */
const FilterComponent = props => {
  const {
    idPrefix,
    filterConfig,
    urlQueryParams,
    initialValues,
    getHandleChangedValueFn,
    values,
    ...rest
  } = props;
  const { id, type, queryParamNames, label, config } = filterConfig;
  const { liveEdit, showAsPopup } = rest;
  const { history } = props;

  const useHistoryPush = liveEdit || showAsPopup;
  const prefix = idPrefix || 'SearchPage';
  const componentId = `${prefix}.${id.toLowerCase()}`;
  const name = id.replace(/\s+/g, '-').toLowerCase();

  const handleSearchSubmit = values => {
    const { search, selectedPlace } = values.location;
    const { origin, bounds } = selectedPlace;
    const searchParams = { address: search, origin, bounds };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  };

  // const handleSubmit = values => {
  //   const usedValue = values ? values[name] : values;
  //   onSubmit(format(usedValue, queryParamName, searchMode));
  // };

  switch (type) {
    case 'SelectSingleFilter': {
      return (
        <SelectSingleFilter
          id={componentId}
          label={label}
          queryParamNames={queryParamNames}
          initialValues={initialValues(queryParamNames)}
          onSelect={getHandleChangedValueFn(useHistoryPush)}
          {...config}
          {...rest}
        />
      );
    }
    case 'SelectMultipleFilter': {
      return (
        <SelectMultipleFilter
          id={componentId}
          label={label}
          name={name}
          queryParamNames={queryParamNames}
          initialValues={initialValues(queryParamNames)}
          onSubmit={getHandleChangedValueFn(useHistoryPush)}
          {...config}
          {...rest}
        />
      );
    }
    // case 'BookingDateRangeFilter': {
    //   return (
    //     <BookingDateRangeFilter
    //       id={componentId}
    //       label={label}
    //       queryParamNames={queryParamNames}
    //       initialValues={initialValues(queryParamNames)}
    //       onSubmit={getHandleChangedValueFn(useHistoryPush)}
    //       {...config}
    //       {...rest}
    //     />
    //   );
    // }
    // case 'BookingDateRangeLengthFilter': {
    //   return (
    //     <BookingDateRangeLengthFilter
    //       id={componentId}
    //       label={label}
    //       queryParamNames={queryParamNames}
    //       initialValues={initialValues(queryParamNames)}
    //       onSubmit={getHandleChangedValueFn(useHistoryPush)}
    //       dateRangeLengthFilter={filterConfig}
    //       {...rest}
    //     />
    //   );
    // }
    case 'PriceFilter': {
      return (
        <PriceFilter
          id={componentId}
          label={label}
          queryParamNames={queryParamNames}
          initialValues={initialValues(queryParamNames)}
          onSubmit={getHandleChangedValueFn(useHistoryPush)}
          {...config}
          {...rest}
        />
      );
    }
    case 'KeywordFilter':
      return (
        <KeywordFilter
          id={componentId}
          label={label}
          name={name}
          queryParamNames={queryParamNames}
          initialValues={initialValues(queryParamNames)}
          onSubmit={getHandleChangedValueFn(useHistoryPush)}
          {...config}
          {...rest}
        />
      );

    // case 'LocationComponent':
    //   return (
    //     <>
    //       <FilterPopup
    //         // className={classes}
    //         // rootClassName={rootClassName}
    //         // popupClassName={css.popupSize}
    //         name={'Ererer'}
    //         label={'pppp'}
    //         isSelected={'dss'}
    //         id={`$popup`}
    //         showAsPopup={true}
    //         labelMaxWidth={250}
    //         contentPlacementOffset={0}
    //         onSubmit={handleSearchSubmit}
    //         initialValues={{}}
    //         // keepDirtyOnReinitialize
    //         {...rest}
    //       >
    //         {/* <FieldTextInput
    //           // className={css.field}
    //           name={'name'}
    //           id={`-input`}
    //           type="text"
    //           label={'filterText'}
    //           placeholder={'placeholder'}
    //           autoComplete="off"
    //           ///
    //         /> */}
    //         <LocationSearchForm onSubmit={handleSearchSubmit} />
    //       </FilterPopup>
    //     </>
    //   );
    default:
      return null;
  }
};

export default FilterComponent;
