import React, {Component} from 'react';
import './App.css';
import Products from './components/products/Products';
import Filter from './components/filter/Filter';
import Cart from './components/cart/Cart';
import store from './store'
import { Provider } from 'react-redux';

class App extends Component{


  
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products />
            </div>
            <div className="sidebar">
              <Cart />
            </div>
          </div>
        </main>
        <footer>
          all right is resrved
        </footer>
  
      </div>
    </Provider>
    );
  }
  
}

export default App;
