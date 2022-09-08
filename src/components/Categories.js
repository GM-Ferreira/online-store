import React from 'react';

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

    return (
      <div>
        {categories.map((category) => (
          <label htmlFor={ category.id } data-testid="category" key={ category.id }>
            {category.name}
            <input type="radio" id={ category.id } name="category" />
          </label>
        ))}
      </div>
    );
  }
}

export default Categories;
