import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Item from './pages/Item';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <Route exact path="/Cart" component={ Cart } />
          <Route exact path="/item/:id" component={ Item } />
          <Route exact path="/Checkout" component={ Checkout } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
