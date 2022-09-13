import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  state = {
    cartList: [],
    cartSet: [],
  };

  componentDidMount() {
    const results = localStorage.getItem('cartList');
    const data = JSON.parse(results);
    const dataId = data?.map((item) => item.id);
    const setId = new Set(dataId);
    this.setState({
      cartList: data || [],
      cartSet: [...setId],
    });
  }

  onDecrease = (item) => {
    const { cartList } = this.state;
    const qtd = this.countItems(item.id);
    if (qtd !== 1) {
      const itemIndex = cartList.indexOf(item);
      cartList.splice(itemIndex, 1);
      this.setState({
        cartList,
      });
      localStorage.setItem('cartList', JSON.stringify(cartList));
    }
  };

  onIncrease = (item) => {
    const { cartList } = this.state;
    cartList.push(item);
    this.setState({
      cartList,
    });
    localStorage.setItem('cartList', JSON.stringify(cartList));
  };

  onRemove = (item) => {
    const { cartList } = this.state;
    const cartFilter = cartList.filter((e) => e.id !== item.id);
    localStorage.setItem('cartList', JSON.stringify(cartFilter));
    const atualSet = new Set(cartFilter.map((e) => e.id));
    this.setState({
      cartList: cartFilter,
      cartSet: [...atualSet],
    });
  };

  countItems = (itemId) => {
    const { cartList } = this.state;
    const qtd = (cartList.filter((item) => item.id === itemId).length);
    // console.log(qtd);
    return qtd;
  };

  render() {
    const { cartList, cartSet } = this.state;
    const { history } = this.props;
    return (
      <>
        <h1>Carrinho</h1>
        {
          cartList.length === 0
            ? (
              <span
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </span>
            )
            : cartSet.map((id) => {
              const item = cartList.find((e) => e.id === id);
              return (
                <div key={ item.id }>
                  <h4 data-testid="shopping-cart-product-name">{ item.title }</h4>
                  <p>{ item.price }</p>
                  <button
                    onClick={ () => this.onDecrease(item) }
                    type="button"
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>
                  <span
                    data-testid="shopping-cart-product-quantity"
                  >
                    {this.countItems(item.id)}
                  </span>
                  <button
                    onClick={ () => this.onIncrease(item) }
                    type="button"
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                  <br />
                  <button
                    onClick={ () => this.onRemove(item) }
                    type="button"
                    data-testid="remove-product"
                  >
                    Remove
                  </button>
                </div>
              );
            })
        }
        <br />
        <button
          data-testid="checkout-products"
          type="button"
          onClick={ () => history.push('/Checkout') }
        >
          Finalizar compra
        </button>
      </>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Cart;
