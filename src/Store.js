import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/features/cart/cartSlice";
import wishlistReducer from "./components/features/wishlist/userSlice";
import orderReducer from "./components/features/order/orderSlice";

// import themeReducer from '../src/components/day-night/themeSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default store;
