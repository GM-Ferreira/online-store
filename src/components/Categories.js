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

  render() {
    const { categories } = this.state;
    const { handleRadioChange } = this.props;
    return (
      <div>
        {categories.map((category) => (
          <div key={ category.id }>
            <input
              value={ category.id }
              type="radio"
              id={ category.id }
              name="category"
              onChange={ (e) => handleRadioChange(e) }
            />
            <label htmlFor={ category.id } data-testid="category">
              {category.name}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  handleRadioChange: PropTypes.func.isRequired,
};

export default Categories;
