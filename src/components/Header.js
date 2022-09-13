import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1 className="title">Mercado Fiado</h1>
        <div>
          <Link to="/"><img src="https://img.icons8.com/material-rounded/24/000000/home.png" alt="home" /></Link>
          <Link to="/Cart" data-testid="shopping-cart-button"><img src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png" alt="carrinho" /></Link>
        </div>
      </div>
    );
  }
}

export default Header;
