import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    searchResults: [],
    query: '',
    hasQueryInput: false,
  };

  getQuery = ({ target: { value } }) => {
    this.setState({
      query: value,
    });
  };

  onClick = async () => {
    const { query } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(null, query);
    this.setState({
      hasQueryInput: true,
      searchResults: results,
    });
  };

  renderResults = () => {
    const { searchResults } = this.state;
    if (searchResults.length > 0) {
      return searchResults
        .map((item) => (
          <p
            data-testid="product"
            key={ item.id }
          >
            {item.title}
          </p>
        ));
    }
    return <p>Nenhum produto foi encontrado</p>;
  };

  render() {
    const { hasQueryInput } = this.state;
    return (
      <div>
        <Link to="/Cart" data-testid="shopping-cart-button">Carrinho</Link>
        <Categories />
        <label htmlFor="busca">
          <input
            data-testid="query-input"
            type="text"
            id="busca"
            onChange={ (event) => this.getQuery(event) }
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.onClick }
        >
          Buscar
        </button>
        {
          hasQueryInput && this.renderResults()
        }

        { hasQueryInput ? null
          : (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
      </div>
    );
  }
}

export default Home;
