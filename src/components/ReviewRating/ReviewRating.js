import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconReviewStar } from '../../components';
import { REVIEW_RATINGS } from '../../util/types';

const ReviewRating = props => {
  const { className, rootClassName, reviewStarClassName, rating, numerable } = props;
  const classes = classNames(rootClassName, className);

  const stars = REVIEW_RATINGS;
  return numerable ? (
    <div className={classes}>
      <div>{rating}</div>
      <IconReviewStar className={reviewStarClassName} isFilled={true} />
    </div>
  ) : (
    <span className={classes}>
      {stars.map(star => (
        <IconReviewStar
          key={`star-${star}`}
          className={reviewStarClassName}
          isFilled={star <= rating}
        />
      ))}
    </span>
  );
};

ReviewRating.defaultProps = {
  rootClassName: null,
  className: null,
  reviewStarClassName: null,
};

const { string, oneOf, bool } = PropTypes;

ReviewRating.propTypes = {
  rating: oneOf(REVIEW_RATINGS).isRequired,
  reviewStartClassName: string,
  rootClassName: string,
  className: string,
  numerable: bool,
};

export default ReviewRating;
