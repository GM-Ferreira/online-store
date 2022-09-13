import React from 'react';
import { Redirect } from 'react-router-dom';

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
    submit: false,
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onCheckout = () => {
    const { name, email, cpf, phone, postal, address, payment } = this.state;
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
        submit: true,
      });
      localStorage.clear();
    }
    this.setState({
      error: true,
    });
  };

  render() {
    const { error, submit } = this.state;
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
          <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/50/000000/external-bar-code-shopping-flatart-icons-outline-flatarticons.png" alt="ticket" />
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
          <img src="https://img.icons8.com/ios/50/000000/visa.png" alt="visa" />
        </label>
        <label htmlFor="master">
          <input
            data-testid="master-payment"
            id="master"
            type="radio"
            name="payment"
            value="Master"
            onChange={ this.onChange }
          />
          Master
          <img src="https://img.icons8.com/ios-filled/50/000000/mastercard.png" alt="mastercard" />
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
          <img src="https://img.icons8.com/pastel-glyph/50/000000/bank-card-front-side--v1.png" alt="creditcard" />
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
        { submit && <Redirect to="/" />}
      </form>
    );
  }
}
