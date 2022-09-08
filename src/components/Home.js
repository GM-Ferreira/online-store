import React from 'react';

class Home extends React.Component {
  state = {
    results: [],
  };

  render() {
    const { results } = this.state;
    return (
      <div>
        <label htmlFor="busca">
          <input type="text" id="busca" />
        </label>
        {results.length === 0
          ? (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          ) : null }
      </div>
    );
  }
}

export default Home;
