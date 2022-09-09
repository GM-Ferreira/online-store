import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardItem extends React.Component {
  render() {
    const { item: { id, title, thumbnail, price } } = this.props;
    return (
      <div data-testid="product">
        <Link to={ `/item/${id}` } data-testid="product-detail-link">
          <h4>{title}</h4>
          <img src={ thumbnail } alt={ title } />
          <span>{`R$ ${price}`}</span>
        </Link>
      </div>
    );
  }
}

CardItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.string,
  }),
}.isRequired;

export default CardItem;
