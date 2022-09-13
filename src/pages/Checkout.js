import React from 'react';
import CheckoutForm from '../components/CheckoutForm';

export default class Checkout extends React.Component {
  state = {
    cart: [],
    cartSet: [],
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('cartList'));
    const dataId = data?.map((item) => item.id);
    const setId = new Set(dataId);
    this.setState({
      cart: data,
      cartSet: [...setId],
    });
  }

  render() {
    const { cart, cartSet } = this.state;
    return (
      <>
        <ul>
          {
            cartSet.map((id) => {
              const item = cart.find((e) => e.id === id);
              return (
                <li key={ item.id }>
                  {item.title}
                  {' '}
                  - R$
                  {' '}
                  {item.price.toFixed(2)}
                </li>
              );
            })
          }
        </ul>
        <CheckoutForm />
      </>
    );
  }
}
