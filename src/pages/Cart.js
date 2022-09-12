import React from 'react';

class Cart extends React.Component {
  state = {
    cartList: [],
    cartSet: [],
  };

  componentDidMount() {
    console.log('entrei no component did mount');
    const results = localStorage.getItem('cartList');
    const data = JSON.parse(results);
    const dataId = data.map((item) => item.id);
    const setId = new Set(dataId);
    this.setState({
      cartList: data || [],
      cartSet: [...setId],
    });
  }

  onDecrease = (item) => {
    const { cartList } = this.state;
    const itemIndex = cartList.indexOf(item);
    cartList.splice(itemIndex, 1);
    this.setState({
      cartList,
    });
    localStorage.setItem('cartList', JSON.stringify(cartList));
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
    this.setState({ cartList: cartFilter });
    localStorage.setItem('cartList', JSON.stringify(cartFilter));
  };

  countItems = (itemId) => {
    const { cartList } = this.state;
    return cartList.filter((item) => item.id === itemId).length;
  };

  render() {
    const { cartList, cartSet } = this.state;
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
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    Quantidade:
                    {this.countItems(item.id)}
                  </p>
                  <button
                    onClick={ () => this.onDecrease(item) }
                    type="button"
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>
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
      </>
    );
  }
}

export default Cart;
