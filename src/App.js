import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Item from './pages/Item';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <Route exact path="/Cart" component={ Cart } />
          <Route exact path="/item/:id" component={ Item } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
