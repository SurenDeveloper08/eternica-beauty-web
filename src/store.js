import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categorySlice from './redux/slices/categorySlice'
import categoriesSlice from './redux/slices/categoriesSlice'
import productSlice from './redux/slices/productSlice';
import productsSlice from './redux/slices/productsSlice';
import pageSlice from './redux/slices/pageSlice'
import sliderSlice from './redux/slices/sliderSlice'
import slidersSlice from './redux/slices/slidersSlice'
import cartSlice from './redux/slices/cartSlice'
import checkoutSlice from "./redux/slices/checkoutSlice";
import userSlice from "./redux/slices/userSlice";
import authSlice from './redux/slices/authSlice'
import seoSlice from './redux/slices/seoSlice';

const reducer = combineReducers({
    categoryState: categorySlice,
    categoriesState: categoriesSlice,
    productState: productSlice,
    productsState: productsSlice,
    pageState: pageSlice,
    sliderState: sliderSlice,
    slidersState: slidersSlice,
    cartState: cartSlice,
    checkoutState: checkoutSlice,
    userState: userSlice,
    authState: authSlice,
    seoState: seoSlice,
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export default store;