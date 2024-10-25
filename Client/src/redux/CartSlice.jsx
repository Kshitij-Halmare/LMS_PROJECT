import { createSlice, createSelector } from '@reduxjs/toolkit';

// Load activeUserId from localStorage if it exists
const storedActiveUserId = localStorage.getItem('activeUserId');

const CartSlice = createSlice({
  name: 'Cart',
  initialState: {
    users: [],
    activeUserId: storedActiveUserId ? JSON.parse(storedActiveUserId) : null,
  },
  reducers: {
    addActiveUser: (state, action) => {
      state.activeUserId = action.payload.id;
      // Save activeUserId to localStorage
      localStorage.setItem('activeUserId', JSON.stringify(action.payload.id));
    },
    addCourseToCart: (state, action) => {
      const { userId, courseId, title, price } = action.payload;
      const user = state.users.find((u) => u.id === userId);

      if (user) {
        user.courses = user.courses || [];
        user.courses.push({ courseId, title, price });
      } else {
        state.users.push({
          id: userId,
          courses: [{ courseId, title, price }],
        });
      }
    },
  },
});

// Memoized selector to get cart items for the active user
export const getCartItems = createSelector(
  [(state) => state.Cart.users, (state) => state.Cart.activeUserId],
  (users, activeUserId) => {
    const activeUser = users.find((user) => user.id === activeUserId);
    console.log("Active User:", activeUser, "Users:", users);  // Debugging output
    return activeUser ? activeUser.courses : [];
  }
);

export const { addActiveUser, addCourseToCart } = CartSlice.actions;
export default CartSlice.reducer;
