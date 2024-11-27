import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    symbol: "SAR",
  },
  reducers: {
    setCurrencySymbol: (state, action) => {
      state.symbol = action.payload;
    },
  },
});

export const { setCurrencySymbol } = currencySlice.actions;
export const selectCurrencySymbol = (state) => state.currency.symbol;
export default currencySlice.reducer;
