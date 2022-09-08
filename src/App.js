import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <p>app</p>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
