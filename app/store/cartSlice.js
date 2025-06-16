import { createSlice } from '@reduxjs/toolkit';
import { showErrorToast, showInfoToast, showSuccessToast } from '../utils/sweetAlert';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to store enrolled courses
    totalItems: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      console.log(course);
      const existingCourse = state.items.find((item) => item.id === course.id);

      if (!existingCourse) {
        state.items.push(course);
        state.totalItems += 1;
        showSuccessToast(`You added a course to your cart!`);
      } else {
        showErrorToast('Course already in cart!');
      }
    },
    removeFromCart: (state, action) => {
      const course = action.payload; // Expecting just the ID
      state.items = state.items.filter((item) => item.id !== course);
      state.totalItems -= 1;
      showInfoToast(`Course has been removed from the cart.`);
      },
  },
});

export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + parseFloat(item.coursefee),
    0
  );

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
