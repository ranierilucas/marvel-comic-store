import Header from './components/Header';
import Comics from './components/Comics';
import Checkout from './components/Checkout';
import Details from './components/Details';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from 'react';

import './App.css';

function App() {
  // estado global do carrinho de compra (passada como props)
  // o carrinho de compra é um array de arrays, onde os arrays
  // internos indicam um par ordenado de item a ser comprado e 
  // sua quantidade. 
  const [shoppingCart, setShoppingCart] = useState([])

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Comics shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
        </Route>
        <Route path="/checkout">
          <Checkout shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
        </Route>
        <Route exact path="/details/:id">
          <Details shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
