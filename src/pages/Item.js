import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Item extends React.Component {
  state = {
    product: {},
    list: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const results = await getProductById(id);
    this.setState({
      product: results,
    });
    const data = localStorage.getItem('cartList');
    const cartList = JSON.parse(data);
    this.setState({
      list: cartList || [],
    });
  }

  handleClick = () => {
    const { product } = this.state;
    this.setState((prevState) => ({
      list: [...prevState.list, product],
    }), () => {
      const { list } = this.state;
      localStorage.setItem('cartList', JSON.stringify(list));
    });
  };

  render() {
    const { product: { title, thumbnail, price } } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h2 data-testid="product-detail-name">{title}</h2>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <span data-testid="product-detail-price">{`R$ ${price}`}</span>
        <br />
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adiciona ao Carrinho
        </button>
        <button
          onClick={ () => history.push('/cart') }
          type="button"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </button>
      </div>
    );
  }
}

Item.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Item;
