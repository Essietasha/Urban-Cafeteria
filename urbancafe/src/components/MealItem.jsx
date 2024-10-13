import React from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';


const MealItem = ( {meal} ) => {
    
    const cartCtx = useContext(CartContext)

    function handleAddMealToCart(){
        cartCtx.addItem(meal);
    }

  return (
    <div>
        <li className='meal-item'>
            <article>
                <img src={meal.image} alt={meal.name}></img>
                <div>
                    <h3>{meal.name}</h3>
                    <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
                    <p className='meal-item-description'>{meal.description}</p>
                </div>
                <p className='meal-item-actions'>
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    </div>
  )
}

export default MealItem;