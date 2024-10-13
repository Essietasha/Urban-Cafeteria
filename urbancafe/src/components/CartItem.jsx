import React from 'react';
import { currencyFormatter } from '../util/formatting';
import CartContext from '../store/CartContext';
import { useContext } from 'react';


const CartItem = ({ cartItem }) => {
    
    const cartCotx = useContext(CartContext);

    function handleAddItem(){
        cartCotx.addItem(cartItem)
    };
    function handleRemoveItem(){
        cartCotx.removeItem(cartItem.id)
    };

  return (
    <li className='cart-item'>
        <p>{cartItem.name} - {cartItem.quantity} x {currencyFormatter.format(cartItem.price)}</p>
        <p className='cart-item-actions'>
            <button  onClick={handleRemoveItem}>-</button>
            <button>{cartItem.quantity}</button>
            <button  onClick={handleAddItem}>+</button>
        </p>
    </li>
  )
}

export default CartItem;