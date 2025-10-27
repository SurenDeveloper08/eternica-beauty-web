import { createSlice } from "@reduxjs/toolkit";


const pageSlice = createSlice({
    name: 'Page',
    initialState: {
        loading: false,
        page: {},
        isPageCreated: false,
        isPageUpdated: false,
    },
    reducers: {
        pageRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        pageSuccess(state, action) {
            return {
                ...state,
                loading: false,
                page: action.payload.data
            }
        },
        pageFail(state, action) {
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
        clearPage(state, action) {
            return {
                ...state,
                page: {}
            }
        },
        newPageRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        newPageSuccess(state, action) {
            return {
                ...state,
                loading: false,
                page: action.payload.data,
                isPageCreated: true
            }
        },
        newPageFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isPageCreated: false
            }
        },
        clearPageCreated(state, action) {
            return {
                ...state,
                isPageCreated: false
            }
        },
        updatePageRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updatePageSuccess(state, action) {
            return {
                ...state,
                loading: false,
                page: action.payload.data,
                isPageUpdated: true
            }
        },
        updatePageFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearPageUpdated(state, action) {
            return {
                ...state,
                isPageUpdated: false
            }
        }
    }
});

const { actions, reducer } = pageSlice;

export const {
    pageRequest,
    pageSuccess,
    pageFail,
    clearError,
    clearPage,
    newPageFail,
    newPageSuccess,
    newPageRequest,
    clearPageCreated,
    updatePageFail,
    updatePageRequest,
    updatePageSuccess,
    clearPageUpdated,
} = actions;

export default reducer;
