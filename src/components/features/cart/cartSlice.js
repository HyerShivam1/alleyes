import { createSlice } from "@reduxjs/toolkit";

// Load the initial cart state from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const loadCart = localStorage.getItem("cart");
    return loadCart ? JSON.parse(loadCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// Save the cart state to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const loadCart = JSON.stringify(cart);
    localStorage.setItem("cart", loadCart);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  cart: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
      saveCartToLocalStorage(state.cart); // Save updated state
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.itemId !== action.payload);
      saveCartToLocalStorage(state.cart); // Save updated state
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload);
      if (item.quantity < item.maxQuantity) {
        item.quantity++;
        saveCartToLocalStorage(state.cart); // Save updated state
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload);
      if (item) {
        item.quantity--;
        if (item.quantity === 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        } else {
          saveCartToLocalStorage(state.cart); // Save updated state
        }
      }
    },
    clearCart(state) {
      state.cart = [];
      saveCartToLocalStorage(state.cart); // Save updated state
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + Math.min(item.quantity, 1), 0);

export const getTotalOriginalPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce(
    (sum, item) =>
      sum +
      (item.price - (item.price * item?.discount || 0) / 100).toFixed(0) *
        item.quantity,
    0
  );

export const getDiscount = (state) => {
  return state.cart.cart
    .reduce((sum, item) => {
      const discount = item.discount ? (item.price * item.discount) / 100 : 0;
      return sum + discount * item.quantity;
    }, 0)
    .toFixed(0);
};

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.itemId === id)?.quantity ?? 0;
