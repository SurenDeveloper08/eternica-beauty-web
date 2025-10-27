import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    loading: false,
    order: null,          
    error: null,
    isOrderPlaced: false,
  },
  reducers: {
    checkoutRequest(state) {
      state.loading = true;
      state.error = null;
      state.isOrderPlaced = false;
    },
    checkoutSuccess(state, action) {
      state.loading = false;
      state.order = action.payload; 
      state.isOrderPlaced = true;
    },
    checkoutFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isOrderPlaced = false;
    },
    clearCheckoutState(state) {
      state.loading = false;
      state.order = null;
      state.error = null;
      state.isOrderPlaced = false;
    },
  },
});
const { actions, reducer } = checkoutSlice;

export const {
  checkoutRequest,
  checkoutSuccess,
  checkoutFail,
  clearCheckoutState,
} = actions;

export default reducer;
