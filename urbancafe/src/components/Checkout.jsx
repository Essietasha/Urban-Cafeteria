import React from 'react'
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../util/formatting';


const Checkout = () => {
    
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

        
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
            return totalPrice + item.quantity * item.price
    }, 0);

    function handleCloseCheckout(){
        userProgressCtx.hideCheckout();
    };

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch('http://localhost:8000/meals', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order:{
                    items: cartCtx.items,
                    customerInfo: customerData
                }
            }),
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.log('Error...', error)
            });  
    };

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onCloseProp={handleCloseCheckout}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label='Full-Name' type='text' id='full-name' />
            <Input label='E-Mail Address' type='email' id='email' />
            <Input label='Street' type='text' id='street' />
            <div className='control-row'>
                <Input label='Postal-Code' type='text' id='postal-code' />
                <Input label='City' type='text' id='city' />
            </div>

            <p className='modal-actions'>
                <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
  )
}

export default Checkout;


//Using Custom Hook and setting Validation with State
// import React from 'react'
// import Modal from './UI/Modal';
// import Input from './UI/Input';
// import Button from './UI/Button';
// import { useContext } from 'react';
// import CartContext from '../store/CartContext';
// import UserProgressContext from '../store/UserProgressContext';
// import { currencyFormatter } from '../util/formatting';
// import useHttp from '../hooks/useHttp';
// import Error from './Error';

// const configuration = {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
// };

// const Checkout = () => {
//     const {data, isLoading, error, sendRequest, clearDataSubm} = useHttp('http://localhost:8000/meals', configuration );

//     const cartCtx = useContext(CartContext);
//     const userProgressCtx = useContext(UserProgressContext);
      
//     const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
//             return totalPrice + item.quantity * item.price
//     }, 0);

//     function handleCloseCheckout(){
//         userProgressCtx.hideCheckout();
//     };

//     function handleFinishSubmission(){
//         userProgressCtx.hideCheckout();
//         cartCtx.clearCart();
//         clearDataSubm();

//     };

//     function handleSubmit(event) {
//         event.preventDefault();

//         const fd = new FormData(event.target);
//         const customerData = Object.fromEntries(fd.entries());

//         sendRequest(JSON.stringify({
//             order:{
//                 items: cartCtx.items,
//                 customerInfo: customerData
//             }
//         }));  
//     };
//     let actionsBtn = (<>
//                         <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
//                         <Button>Submit Order</Button>
//                     </>
//                     );

//     if(isLoading){ actionsBtn = <span>Sending your order...</span> };

//     if(data && !error) {
//         return <Modal open={userProgressCtx.progress === 'checkout'} onCloseProp={handleFinishSubmission}> 
//         <h2>Success!</h2>
//         <p>Your order was sent successfully.</p>
//         <p>We will get back to you with more details via email.</p>

//         <p className='modal-actions'>
//             <Button onClick={handleFinishSubmission}>Okay</Button>
//         </p>
//         </Modal>
//     };


//   return (
//     <Modal open={userProgressCtx.progress === 'checkout'} onCloseProp={handleCloseCheckout}>
//         <form onSubmit={handleSubmit}>
//             <h2>Checkout</h2>
//             <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
//             <Input label='Full-Name' type='text' id='full-name' />
//             <Input label='E-Mail Address' type='email' id='email' />
//             <Input label='Street' type='text' id='street' />
//             <div className='control-row'>
//                 <Input label='Postal-Code' type='text' id='postal-code' />
//                 <Input label='City' type='text' id='city' />
//             </div>
//             {error && <Error title={'Failed to submit order...'} message={error.message} />}
//             <p className='modal-actions'> {actionsBtn} </p>
//         </form>
//     </Modal>
//   )
// }

// export default Checkout;