import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const initialState = {
    cartItems: cartFromStorage,
    loading: false,
    error: null,
    totalQuantity: cartFromStorage.reduce((acc, item) => acc + item.qty, 0),
    totalPrice: cartFromStorage.reduce((acc, item) => acc + item.qty * item.price, 0),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartRequest(state) {
            state.loading = true;
            state.error = null;
        },
        cartSuccess(state, action) {
            state.loading = false;
            state.cartItems = action.payload.cartItems;
            state.totalQuantity = action.payload.totalQuantity;
            state.totalPrice = action.payload.totalPrice;
        },
        cartFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        addToCart(state, action) {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems.push({
                    ...item,
                    category: item.category || "",
                    subCategory: item.subCategory || "",
                });
            }

            state.totalQuantity = state.cartItems.reduce((acc, item) => acc + item.qty, 0);
            state.totalPrice = state.cartItems.reduce(
                (acc, item) => acc + item.qty * item.price,
                0
            );

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },

        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            state.totalQuantity = state.cartItems.reduce((acc, item) => acc + item.qty, 0);
            state.totalPrice = state.cartItems.reduce(
                (acc, item) => acc + item.qty * item.price,
                0
            );
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        clearCart(state) {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            localStorage.removeItem("cart");
        },

        clearError(state) {
            state.error = null;
        },
    },
});

const { actions, reducer } = cartSlice;

export const {
    cartRequest,
    cartSuccess,
    cartFail,
    addToCart,
    removeFromCart,
    clearCart,
    clearError,
} = actions;

export default reducer;
