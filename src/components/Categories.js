import React from 'react';

import PropTypes from 'prop-types';

import { getCategories } from '../services/api';

class Categories extends React.Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const results = await getCategories();
    this.setState({
      categories: results,
    });
  }

  handleChange = async (event) => {
    const { getCategory, doSearch } = this.props;
    getCategory(event);
    const { target: { value } } = event;
    await doSearch(value);
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        {categories.map((category) => (
          <label htmlFor={ category.id } data-testid="category" key={ category.id }>
            {category.name}
            <input
              value={ category.id }
              type="radio"
              id={ category.id }
              name="category"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  getCategory: PropTypes.func.isRequired,
  doSearch: PropTypes.func.isRequired,
};

export default Categories;
