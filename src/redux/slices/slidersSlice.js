import { createSlice } from "@reduxjs/toolkit";

const slidersSlice = createSlice({
    name: 'Sliders',
    initialState: {
        sliders: [],
        loading: false,
        error: null
    },
    reducers: {
        slidersRequest(state, action) {
            return {
                loading: true
            }
        },
        slidersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                sliders: action.payload.data,
                slidersCount: action.payload.count,
            }
        },
        slidersFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        adminSlidersRequest(state, action) {
            return {
                loading: true
            }
        },
        adminSlidersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                sliders: action.payload.data,
            }
        },
        adminSlidersFail(state, action) {
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

const { actions, reducer } = slidersSlice;

export const {
    slidersRequest,
    slidersSuccess,
    slidersFail,
    adminSlidersFail,
    adminSlidersRequest,
    adminSlidersSuccess

} = actions;

export default reducer;
