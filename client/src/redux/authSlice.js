import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: localStorage.getItem("token") ? true : false, 
  quote: localStorage.getItem("quote") || "", 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user)); 

      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token"); 
      localStorage.removeItem("user"); 
      state.isAuthenticated = false;
    },
    setQuote: (state, action) => {
      state.quote = action.payload;
      localStorage.setItem("quote", action.payload); 
    },
    clearQuote: (state) => {
      state.quote = "";
      localStorage.removeItem("quote");
    },
  },
});

export const { login, logout, setQuote, clearQuote } = authSlice.actions;
export default authSlice.reducer;
