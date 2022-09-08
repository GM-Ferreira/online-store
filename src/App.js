import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <Route exact path="/Cart" component={ Cart } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
