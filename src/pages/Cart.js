import React from 'react';

class Cart extends React.Component {
  state = {
    cartList: [],
  };

  render() {
    const { cartList } = this.state;
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
            : null
        }
      </>
    );
  }
}

export default Cart;
