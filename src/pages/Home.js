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

  getQuery = ({ target: { value } }) => {
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
    console.log(queryOrCategory);
    const { results } = await getProductsFromCategory(queryOrCategory);
    this.setState({
      hasQueryInput: true,
      searchResults: results,
    });
  };

  handleRadioChange = (event) => {
    console.log('chamei handleRadioChange');
    const { target: { value } } = event;
    this.setState({
      queryOrCategory: value,
    }, () => {
      this.doSearchByCategory();
    });
    console.log('busquei por categoria');
  };

  renderResults = () => {
    console.log('renderizei os resultados da busca');
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
    console.log(' ------> RENDERIZANDO PAGINA');
    return (
      <div>
        <Link to="/Cart" data-testid="shopping-cart-button">Carrinho</Link>
        <Categories
          handleRadioChange={ this.handleRadioChange }
        />
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
