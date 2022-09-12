import React from 'react';
import PropTypes from 'prop-types';

class Review extends React.Component {
  render() {
    const { review: { email, rate, comment } } = this.props;
    return (
      <fieldset>
        <p data-testid="review-card-email">{ email }</p>
        <p data-testid="review-card-rating">{ rate }</p>
        <p data-testid="review-card-evaluation">{ comment }</p>
      </fieldset>
    );
  }
}

Review.propTypes = {
  review: {
    email: PropTypes.string.isRequired,
    rate: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }.isRequired,
};

export default Review;
