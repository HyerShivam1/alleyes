import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage
const loadWishlistFromLocalStorage = () => {
  try {
    const loadData = localStorage.getItem("wishlist");
    return loadData ? JSON.parse(loadData) : []; // Correctly parse the data
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
    return [];
  }
};

// Save wishlist to localStorage
const saveWishlistToLocalStorage = (wishlist) => {
  try {
    const loadData = JSON.stringify(wishlist);
    localStorage.setItem("wishlist", loadData);
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error);
  }
};

// Initial state
const initialState = {
  wishlist: loadWishlistFromLocalStorage(), // Load initial wishlist from localStorage
};

const userSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    WishlistAddItem(state, action) {
      const itemExists = state.wishlist.some(
        (item) => item.itemId === action.payload.itemId
      );
      if (!itemExists) {
        state.wishlist.push(action.payload);
        saveWishlistToLocalStorage(state.wishlist); // Save updated wishlist
      }
    },
    WishlistDeleteItem(state, action) {
      state.wishlist = state.wishlist.filter(
        (wishlist) => wishlist.itemId !== action.payload
      );
      saveWishlistToLocalStorage(state.wishlist); // Save updated wishlist
    },
    WishlistClear(state) {
      state.wishlist = [];
      saveWishlistToLocalStorage(state.wishlist);
    },
  },
});

export const { WishlistAddItem, WishlistDeleteItem, WishlistClear } =
  userSlice.actions;

export default userSlice.reducer;

// Selector to get wishlist
export const WishlistGetCart = (state) => state.wishlist.wishlist;
1;
