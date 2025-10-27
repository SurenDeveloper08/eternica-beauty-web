import { createSlice } from "@reduxjs/toolkit";


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        loading: false,
        categories: [],
        subCategories: [],
        categoriesCount: 0,
        mainCategories: [],
        mainCategoriesCount: [],
        resPerPage: 0,
        error: null,
    },
    reducers: {
        categoriesRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        categoriesSuccess(state, action) {
            return {
                ...state,
                loading: false,
                categories: action.payload.data,
                categoriesCount: action.payload.count,
                 }
        },
        categoriesFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        mainCategoriesRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        mainCategoriesSuccess(state, action) {
            return {
                ...state,
                loading: false,
                mainCategories: action.payload.data,
                mainCategoriesCount: action.payload.count,
            }
        },
        mainCategoriesFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        adminCategoriesRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        adminCategoriesSuccess(state, action) {
            return {
                ...state,
                loading: false,
                categories: action.payload.data,
            }
        },
        adminCategoriesFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        adminSubCategoriesRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        adminSubCategoriesSuccess(state, action) {
            return {
                ...state,
                loading: false,
                subCategories: action.payload.data,
            }
        },
        adminSubCategoriesFail(state, action) {
            return {
                ...state,
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

const { actions, reducer } = categoriesSlice;

export const {
    categoriesRequest,
    categoriesSuccess,
    categoriesFail,
    mainCategoriesRequest,
    mainCategoriesSuccess,
    mainCategoriesFail,
    adminCategoriesFail,
    adminCategoriesRequest,
    adminCategoriesSuccess,
    adminSubCategoriesRequest,
    adminSubCategoriesSuccess,
    adminSubCategoriesFail
} = actions;

export default reducer;
