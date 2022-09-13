import React from 'react';
// import { Redirect } from 'react-router-dom';

// import PropTypes from 'prop-types';

export default class CheckoutForm extends React.Component {
  state = {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    postal: '',
    address: '',
    payment: '',
    error: false,
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onCheckout = () => {
    const { name, email, cpf, phone, postal, address, payment } = this.state;
    // const { history } = this.props;
    if (name && email && cpf
      && phone && postal && address && payment) {
      this.setState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        postal: '',
        address: '',
        payment: '',
        error: false,
      });
      localStorage.clear();
      // <Redirect to =''/>
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <form>
        <p>Dados do Cliente:</p>
        <input
          data-testid="checkout-fullname"
          type="text"
          placeholder="Nome Completo"
          name="name"
          onChange={ this.onChange }
        />
        <input
          data-testid="checkout-email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={ this.onChange }
        />
        <br />
        <input
          data-testid="checkout-cpf"
          type="text"
          placeholder="CPF"
          name="cpf"
          onChange={ this.onChange }
        />
        <input
          data-testid="checkout-phone"
          type="tel"
          placeholder="Telefone"
          name="phone"
          onChange={ this.onChange }
        />
        <br />
        <input
          data-testid="checkout-cep"
          type="text"
          placeholder="CEP"
          name="postal"
          onChange={ this.onChange }
        />
        <input
          data-testid="checkout-address"
          type="text"
          placeholder="Endereço"
          name="address"
          onChange={ this.onChange }
        />
        <p>Método de pagamento:</p>
        <label htmlFor="boleto">
          <input
            data-testid="ticket-payment"
            type="radio"
            id="boleto"
            name="payment"
            value="Boleto"
            onChange={ this.onChange }
          />
          Boleto
        </label>
        <label htmlFor="visa">
          <input
            data-testid="visa-payment"
            id="visa"
            type="radio"
            name="payment"
            value="Visa"
            onChange={ this.onChange }
          />
          Visa
        </label>
        <label htmlFor="master">
          <input
            data-testid="master-payment"
            id="masterCheckoutForm.propTypes = {
              history: PropTypes.shape({
                push: PropTypes.func,
              }).isRequired,
            };o"
            name="payment"
            value="Master"
            onChange={ this.onChange }
          />
          Master
        </label>
        <label htmlFor="elo">
          <input
            data-testid="elo-payment"
            id="elo"
            type="radio"
            name="payment"
            value="Elo"
            onChange={ this.onChange }
          />
          Elo
        </label>
        <br />
        {
          error && <p data-testid="error-msg">Campos inválidos</p>
        }
        <button
          data-testid="checkout-btn"
          type="button"
          onClick={ this.onCheckout }
        >
          Finalizar
        </button>
      </form>
    );
  }
}

// CheckoutForm.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };
