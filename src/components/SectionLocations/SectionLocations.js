import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.module.css';

import football from './images/football@3x.jpg';
import basketball from './images/basketball@3x.jpg';
import baseball from './images/baseball@3x.jpg';
import track from './images/track@3x.jpg';
import soccer from './images/soccer@3x.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, imgSrc, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={imgSrc} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionLocations.listingsInLocation"
          values={{ location: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Soccer',
          soccer,
          'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&keywords=soccer'
        )}
        {locationLink(
          'Football',
          football,
          'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&keywords=football'
        )}
        {locationLink(
          'Basketball',
          basketball,
          'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&keywords=basketball'
        )}
        {locationLink(
          'Track & Field',
          track,
          'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&keywords=track'
        )}
        {locationLink(
          'Baseball',
          baseball,
          'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873&keywords=baseball'
        )}
      </div>
      <div className={css.buttonWrapper}>
        <NamedLink
          name="SearchPage"
          to={{
            search: 'bounds=1.68008452%2C104.08284892%2C1.00507067%2C103.59952873',
          }}
          className={css.findButton}
        >
          <FormattedMessage id="SectionLocations.button" />
        </NamedLink>
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
