import './App.css';
import React from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';

const App = () => {

  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
