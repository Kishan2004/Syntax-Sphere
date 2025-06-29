import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false, // Fixed spelling
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user; // Ensure correct user object
      state.isAuthenticated = true;
    },
  },
  userLoggedOut: (state) => {
    state.user = null;
    state.isAuthenticated = false;
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
