// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return undefined;
    }
    return {
      user: JSON.parse(serializedState),
    };
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.user);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    // Handle errors here
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers as needed
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
