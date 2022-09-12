import React from 'react';
import PropTypes from 'prop-types';

class ReviewForm extends React.Component {
  render() {
    const { saveReview, email, handleChange, comment, rate } = this.props;
    return (
      <form>
        <input
          required
          type="email"
          id="email"
          name="email"
          value={ email }
          onChange={ handleChange }
          data-testid="product-detail-email"
          placeholder="Email"
        />
        <label htmlFor="1" title="text">
          <input
            required
            onChange={ handleChange }
            data-testid="1-rating"
            type="radio"
            id="1"
            name="rate"
            value="1"
          />
          1
        </label>
        <label htmlFor="2" title="text">
          <input
            onChange={ handleChange }
            data-testid="2-rating"
            type="radio"
            id="2"
            name="rate"
            value="2"
          />
          2
        </label>
        <label htmlFor="3" title="text">
          <input
            onChange={ handleChange }
            data-testid="3-rating"
            type="radio"
            id="3"
            name="rate"
            value="3"
          />
          3
        </label>
        <label htmlFor="4" title="text">
          <input
            onChange={ handleChange }
            data-testid="4-rating"
            type="radio"
            id="4"
            name="rate"
            value="4"
          />
          4
        </label>
        <label htmlFor="5" title="text">
          <input
            onChange={ handleChange }
            data-testid="5-rating"
            type="radio"
            id="5"
            name="rate"
            value="5"
          />
          5
        </label>
        <br />
        <label htmlFor="area" title="text">
          <textarea
            minLength="10"
            maxLength="300"
            placeholder="Comentários"
            data-testid="product-detail-evaluation"
            cols="50"
            rows="10"
            id="area"
            name="comment"
            value={ comment }
            onChange={ handleChange }
          />
        </label>
        <br />
        <button
          type="button"
          onClick={ () => saveReview({ email, comment, rate }) }
          data-testid="submit-review-btn"
        >
          Enviar
        </button>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  saveReview: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default ReviewForm;
