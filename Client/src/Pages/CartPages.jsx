import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems} from '../redux/CartSlice';
import { deleteCourseFromCart } from '../redux/CartSlice';
import CartCards from '../components/CartCards';
function CartPages() {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);
  console.log(cartItems);
  return (
    <div className='bg-slate-200 h-full pt-4'>
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.courseId}>
            {/* <img src={item.image} alt="" />
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleClick(item.courseId)}>Delete Course</button> */}
            <CartCards
              key={item.courseId}
              image={item.image}
              title={item.title}
              price={item.price}
              courseId={item.courseId}
              language={item.language}
              level={item.level}
              category={item.category}
            />
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPages;
