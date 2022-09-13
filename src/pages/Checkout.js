import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import Header from '../components/Header';

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
        <Header />
        {
          cartSet.map((id) => {
            const item = cart.find((e) => e.id === id);
            return (
              <div key={ item.id }>
                <p>
                  {item.title}
                </p>
                <img src={ item.thumbnail } alt={ item.title } />
                <span>
                  {item.price}
                </span>
              </div>
            );
          })
        }
        <CheckoutForm />
      </>
    );
  }
}
