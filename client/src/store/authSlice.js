import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    _id: null,
    name: null,
    role: null,
    token: null,
  },

  reducers: {
    login: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state._id = null;
      state.name = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
