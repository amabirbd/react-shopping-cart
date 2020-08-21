import React, {Component} from 'react';
import './App.css';
import data from './data.json'
import Products from './components/products/Products';
import Filter from './components/filter/Filter';

class App extends Component{

  constructor () {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    }
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
        ((a._id0 < b._id)? 1:-1)
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
  
  
  render() {
    return (
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>
          all right is resrved
        </footer>
  
      </div>
    );
  }
  
}

export default App;
