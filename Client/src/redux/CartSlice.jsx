import { createSlice } from '@reduxjs/toolkit';
import toast from "react-hot-toast";

const saveToLocalStorage = (userId, cartItems) => {
  localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
};

const getFromLocalStorage = (userId) => {
  return JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || { courses: [] };
};

const CartSlice = createSlice({
  name: 'Cart',
  initialState: {
    products: {},
    activeUser: localStorage.getItem("activeUserId") || ""
  },
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
      localStorage.setItem("activeUserId", action.payload);
    },
    addCourseToCart: (state, action) => {
      const { userId, image, courseId, title, price,level,category } = action.payload;
      console.log(userId, image, courseId, title, price,level,category);
      console.log('Adding course to cart with courseId:', courseId); // Check if courseId is available
      
      if (!state.products[userId]) {
          state.products[userId] = { courses: [] };
      }
      
      const userCart = state.products[userId];
      const existingCourse = userCart.courses.find(course => course.courseId === courseId);
      
      if (existingCourse) {
          toast("Course already exists in the cart");
      } else {
          userCart.courses.push({ image:image,courseId: courseId, title:title,price: price,level:level,category:category });
          saveToLocalStorage(userId, userCart);
      }
  },
  
    loadCoursesFromLocalStorage: (state, action) => {
      const { userId } = action.payload;
      state.products[userId] = getFromLocalStorage(userId);
    },
    deleteCourseFromCart: (state, action) => {
      const { userId, courseId } = action.payload;
      if (state.products[userId]) {
        // Correctly filter out the course by its courseId
        state.products[userId].courses = state.products[userId].courses.filter(
          (course) => course.courseId != courseId
        );
        saveToLocalStorage(userId, state.products[userId]);
        toast.success("Course removed from cart successfully"); // Optional toast for feedback
      } else {
        toast.error("No courses found in cart for this user"); // Optional error handling
      }
    }    
  },
});

export const { addCourseToCart, loadCoursesFromLocalStorage, setActiveUser, deleteCourseFromCart } = CartSlice.actions;
export const getCartItems = (state) => {
  const activeUser = state.Cart.activeUser;
  console.log( state.Cart.products[activeUser]);
  return activeUser ? state.Cart.products[activeUser]?.courses || [] : [];
};
export default CartSlice.reducer;
