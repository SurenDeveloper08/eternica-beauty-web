import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        meta: [],
        seo: {},
        trendingProducts: [],
        favoritesProducts: [],
        searchResults: [],
        loading: false,
        error: null
    },
    reducers: {
        productsRequest(state, action) {
            return {
                loading: true
            }
        },
        productsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                meta: action.payload.meta,
                productsCount: action.payload.count,
                seo: action.payload.meta.seo,
            }
        },
        productsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        searchProductsRequest(state, action) {
            return {
                loading: true
            }
        },
        searchProductsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                searchResults: action.payload.data,
            }
        },
        searchProductsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        adminProductsRequest(state, action) {
            return {
                loading: true
            }
        },
        adminProductsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                products: action.payload.data,
            }
        },
        adminProductsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        trendingProductsRequest(state, action) {
            return {
                loading: true
            }
        },
        trendingProductsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                trendingProducts: action.payload.data,
            }
        },
        trendingProductsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        favoritesProductsRequest(state, action) {
            return {
                loading: true
            }
        },
        favoritesProductsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                favoritesProducts: action.payload.data,
            }
        },
        favoritesProductsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
});

const { actions, reducer } = productsSlice;

export const {
    productsRequest,
    productsSuccess,
    productsFail,
    adminProductsFail,
    adminProductsRequest,
    adminProductsSuccess,
    trendingProductsRequest,
    trendingProductsSuccess,
    trendingProductsFail,
    favoritesProductsRequest,
    favoritesProductsSuccess,
    favoritesProductsFail,
    searchProductsRequest,
    searchProductsSuccess,
    searchProductsFail
} = actions;

export default reducer;
