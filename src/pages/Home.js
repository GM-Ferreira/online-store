import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromQuery, getProductsFromCategory } from '../services/api';

class Home extends React.Component {
  state = {
    searchResults: [],
    queryOrCategory: '',
    hasQueryInput: false,
  };

  getQueryOrCategory = ({ target: { value } }) => {
    this.setState({
      queryOrCategory: value,
    });
  };

  doSearchByQuery = async () => {
    const { queryOrCategory } = this.state;
    const { results } = await getProductsFromQuery(queryOrCategory);
    this.setState({
      hasQueryInput: true,
      searchResults: results,
    });
  };

  doSearchByCategory = async () => {
    const { queryOrCategory } = this.state;
    const { results } = await getProductsFromCategory(queryOrCategory);
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
        <Categories
          getCategory={ this.getQueryOrCategory }
          doSearch={ this.doSearchByCategory }
        />
        <label htmlFor="busca">
          <input
            data-testid="query-input"
            type="text"
            id="busca"
            onChange={ (event) => this.getQueryOrCategory(event) }
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.doSearchByQuery }
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
