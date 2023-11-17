// // userSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: null, // Initial state is null (no user logged in)
//   reducers: {
//     setUser: (state, action) => {
//       return action.payload; // Set the user data when logged in
//     },
//     clearUser: (state) => {
//       return null; // Clear user data when logged out
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;

// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null, // Set initial state to null
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: (state) => {
      return null; // Clear user data
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
