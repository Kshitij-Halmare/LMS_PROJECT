import React from 'react';
import { useSelector } from 'react-redux';
import { getCartItems } from '../redux/CartSlice';

function CartPages() {
  const cartItems = useSelector(getCartItems);

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.courseId}>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPages;
