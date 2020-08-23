import React, {Component} from 'react';
import './App.css';
import data from './data.json'
import Products from './components/products/Products';
import Filter from './components/filter/Filter';
import Cart from './components/cart/Cart';
import store from './store'
import { Provider } from 'react-redux';

class App extends Component{

  constructor () {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: "",
    }
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id)));
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    })
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    this.setState({cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
   
  }

  sortProducts = e => {
    console.log(e.target.value);
    const sort = e.target.value
    this.setState((state) =>({
      sort: sort,
      products : this.state.products.slice().sort((a,b) =>(
        sort === "lowest"?
        ((a.price > b.price)? 1:-1):
        sort === "highest"?
        ((a.price < b.price)? 1:-1):
        ((a._id < b._id)? 1:-1)
      ))
    }))
  }

  filterProducts = e => {
    console.log(e.target.value);
    if(e.target.value === ""){
      this.setState({size: e.target.value, product: data.products})
    }
    else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      })
    }
  }
  

  createOrder = (order) => {
    alert("need to save order for " + order.name)
  }
  
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
              <Filter 
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}

              />
              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems= {this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder} />
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
