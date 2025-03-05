import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quoteData: null,
  authorName: "",
  quoteText: "",
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    setQuote: (state, action) => {
      state.quoteData = action.payload.fullQuote;
      state.authorName = action.payload.authorName;
      state.quoteText = action.payload.quoteText;
    },
    clearQuote: (state) => {
      state.quoteData = null;
      state.authorName = "";
      state.quoteText = "";
    },
  },
});

export const { setQuote, clearQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
