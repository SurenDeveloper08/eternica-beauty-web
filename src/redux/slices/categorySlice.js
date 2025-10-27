import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: false,
        category: {},
        subCategory: {},
        isCategoryCreated: false,
        isCategoryDeleted: false,
        isCategoryUpdated: false,
        isSubCategoryCreated: false,
        isSubCategoryDeleted: false,
        isSubCategoryUpdated: false,
    },
    reducers: {
        categoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        categorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                category: action.payload.data
            }
        },
        categoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
         subCategoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        subCategorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                subCategory: action.payload.data
            }
        },
        subCategoryFail(state, action) {
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
        },
        clearCategory(state, action) {
            return {
                ...state,
                category: {}
            }
        },
        newCategoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        newCategorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                category: action.payload.category,
                isCategoryCreated: true
            }
        },
        newCategoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isCategoryCreated: false
            }
        },
        clearCategoryCreated(state, action) {
            return {
                ...state,
                isCategoryCreated: false
            }
        },
        newSubCategoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        newSubCategorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                subCategory: action.payload.data,
                isSubCategoryCreated: true
            }
        },
        newSubCategoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isSubCategoryCreated: false
            }
        },
        clearSubCategoryCreated(state, action) {
            return {
                ...state,
                isSubCategoryCreated: false
            }
        },
        deleteCategoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteCategorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                isCategoryDeleted: true
            }
        },
        deleteCategoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearCategoryDeleted(state, action) {
            return {
                ...state,
                isCategoryDeleted: false
            }
        },
        updateCategoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateCategorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                category: action.payload.data,
                isCategoryUpdated: true
            }
        },
        updateCategoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearCategoryUpdated(state, action) {
            return {
                ...state,
                isCategoryUpdated: false
            }
        },
        updateSubCategoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateSubCategorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                subCategory: action.payload.data,
                isSubCategoryUpdated: true
            }
        },
        updateSubCategoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearSubCategoryUpdated(state, action) {
            return {
                ...state,
                isSubCategoryUpdated: false
            }
        },
        deleteSubCategoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteSubCategorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                isSubCategoryDeleted: true
            }
        },
       deleteSubCategoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearSubCategoryDeleted(state, action) {
            return {
                ...state,
                isSubCategoryDeleted: false
            }
        },
    }
});

const { actions, reducer } = categorySlice;

export const {
    categoryRequest,
    categorySuccess,
    categoryFail,
    subCategoryRequest,
    subCategorySuccess,
    subCategoryFail,
    clearError,
    clearReviewSubmitted,
    clearCategory,
    newCategoryFail,
    newCategorySuccess,
    newCategoryRequest,
    clearCategoryCreated,
    deleteCategoryFail,
    deleteCategoryRequest,
    deleteCategorySuccess,
    clearCategoryDeleted,
    updateCategoryFail,
    updateCategoryRequest,
    updateCategorySuccess,
    clearCategoryUpdated,
    clearSubCategoryUpdated,
    clearSubCategoryCreated,
    newSubCategoryRequest,
    newSubCategorySuccess,
    newSubCategoryFail,
    updateSubCategoryRequest,
    updateSubCategorySuccess,
    updateSubCategoryFail,
    deleteSubCategoryRequest,
    deleteSubCategorySuccess,
    deleteSubCategoryFail,
    clearSubCategoryDeleted
} = actions;

export default reducer;
