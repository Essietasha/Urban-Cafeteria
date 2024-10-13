import React from 'react';
import UrbanCafeLogo from '../assets/urban-cafe-logo.jpg';
import Button from './UI/Button';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';


const Header = () => {
  
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((numOfItems, item) => {
    return numOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }


  return (
    <>
    <header id='main-header'>
      <div id='title'>
          <img src={UrbanCafeLogo} alt='Urban Restaurant'></img>
          <h1>URBAN CAFE</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
    </>
  )
}

export default Header;