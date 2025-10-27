import { createSlice } from "@reduxjs/toolkit";


const seoSlice = createSlice({
    name: 'Seo',
    initialState: {
        loading: false,
        isSeoCreated: false,
        isSeoUpdated: false,
    },
    reducers: {
        seoRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        seoSuccess(state, action) {
            return {
                ...state,
                loading: false,
                seo: action.payload.data
            }
        },
        seoFail(state, action) {
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
        clearSeo(state, action) {
            return {
                ...state,
                seo: {}
            }
        },
        newSeoRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        newSeoSuccess(state, action) {
            return {
                ...state,
                loading: false,
                seo: action.payload.data,
                isSeoCreated: true
            }
        },
        newSeoFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isSeoCreated: false
            }
        },
        clearSeoCreated(state, action) {
            return {
                ...state,
                isSeoCreated: false
            }
        },
        updateSeoRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateSeoSuccess(state, action) {
            return {
                ...state,
                loading: false,
                seo: action.payload.data,
                isSeoUpdated: true
            }
        },
        updateSeoFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearSeoUpdated(state, action) {
            return {
                ...state,
                isSeoUpdated: false
            }
        }
    }
});

const { actions, reducer } = seoSlice;

export const {
    seoRequest,
    seoSuccess,
    seoFail,
    clearError,
    clearSeo,
    newSeoFail,
    newSeoSuccess,
    newSeoRequest,
    clearSeoCreated,
    updateSeoFail,
    updateSeoRequest,
    updateSeoSuccess,
    clearSeoUpdated,
} = actions;

export default reducer;
