import React from 'react';

class Cart extends React.Component {
  state = {
    cartList: [],
  };

  componentDidMount() {
    const results = localStorage.getItem('cartList');
    const data = JSON.parse(results);
    this.setState({
      cartList: data,
    });
  }

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
            : cartList.map((item) => (
              <div key={ item.id }>
                <h4 data-testid="shopping-cart-product-name">{ item.title }</h4>
                <p>{ item.price }</p>
                <p data-testid="shopping-cart-product-quantity"> Quantidade: 01 </p>
              </div>
            ))
        }
      </>
    );
  }
}

export default Cart;
