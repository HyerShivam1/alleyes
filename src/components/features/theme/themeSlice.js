// import { createSlice } from "@reduxjs/toolkit";

// // Retrieve the initial theme from localStorage or default to 'light'
// const initialTheme = localStorage.getItem("theme") || "light";

// const themeSlice = createSlice({
//   name: "theme",
//   initialState: {
//     theme: initialTheme, // Use the retrieved or default theme
//   },
//   reducers: {
//     toggleTheme: (state) => {
//       state.theme = state.theme === "light" ? "dark" : "light";
//       localStorage.setItem("theme", state.theme); // Save theme to localStorage
//     },
//     setTheme: (state, action) => {
//       state.theme = action.payload;
//       localStorage.setItem("theme", state.theme); // Save theme to localStorage
//     },
//   },
// });

// export const { toggleTheme, setTheme } = themeSlice.actions;
// export default themeSlice.reducer;
