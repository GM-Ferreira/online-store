import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import ReviewForm from '../components/ReviewForm';
import Review from '../components/Review';

class Item extends React.Component {
  state = {
    product: {},
    list: [],
    email: '',
    reviews: [],
    comment: '',
    rate: '',
    hasReviews: false,
    error: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const results = await getProductById(id);
    this.setState({
      product: results,
    });
    const data = localStorage.getItem('cartList');
    const cartList = JSON.parse(data);
    const savedReviews = JSON.parse(localStorage.getItem(id));
    this.setState({
      list: cartList || [],
    });
    if (savedReviews) {
      this.setState({
        reviews: savedReviews,
        hasReviews: true,
      });
    }
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

  validationEntries = () => {
    const { email, rate } = this.state;
    const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (rate !== '' && email.match(emailValid)) {
      this.setState({
        error: false,
      });
      return true;
    }
  };

  saveReview = (review) => {
    if (this.validationEntries()) {
      this.setState((prev) => ({
        hasReviews: true,
        reviews: [...prev.reviews, review],
      }), () => {
        const { reviews } = this.state;
        const { match: { params: { id } } } = this.props;
        localStorage.setItem(id, JSON.stringify(reviews));
        this.setState({
          email: '',
          comment: '',
          rate: '',
        });
      });
    } else { this.setState({ error: true }); }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { product: { title, thumbnail, price },
      email, comment, rate, reviews, hasReviews, error } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h2 data-testid="product-detail-name">{ title }</h2>
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
        <br />
        <h3> Avaliações </h3>
        <ReviewForm
          email={ email }
          comment={ comment }
          rate={ rate }
          handleChange={ this.handleChange }
          saveReview={ this.saveReview }
        />
        {error && <p data-testid="error-msg">Campos inválidos</p>}
        {hasReviews && reviews.map((rev) => (
          <Review
            key={ rev.email }
            review={ rev }
          />
        ))}
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
