import { createSlice } from "@reduxjs/toolkit";


const sliderSlice = createSlice({
    name: 'Slider',
    initialState: {
        loading: false,
        slider: {},
        isSliderCreated: false,
        isSliderUpdated: false,
        isSliderDeleted: false,
    },
    reducers: {
        sliderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        sliderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                slider: action.payload.data
            }
        },
        sliderFail(state, action) {
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
        clearSlider(state, action) {
            return {
                ...state,
                slider: {}
            }
        },
        newSliderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        newSliderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                slider: action.payload.data,
                isSliderCreated: true
            }
        },
        newSliderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isSliderCreated: false
            }
        },
        clearSliderCreated(state, action) {
            return {
                ...state,
                isSliderCreated: false
            }
        },
        updateSliderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateSliderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                slider: action.payload.data,
                isSliderUpdated: true
            }
        },
        updateSliderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearSliderUpdated(state, action) {
            return {
                ...state,
                isSliderUpdated: false
            }
        },
        deleteSliderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteSliderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isSliderDeleted: true
            }
        },
        deleteSliderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearSliderDeleted(state, action) {
            return {
                ...state,
                isp: false
            }
        },
    }
});

const { actions, reducer } = sliderSlice;

export const {
    sliderRequest,
    sliderSuccess,
    sliderFail,
    clearError,
    clearSlider,
    newSliderFail,
    newSliderSuccess,
    newSliderRequest,
    clearSliderCreated,
    updateSliderFail,
    updateSliderRequest,
    updateSliderSuccess,
    clearSliderUpdated,
    deleteSliderRequest,
    deleteSliderSuccess,
    deleteSliderFail,
    clearSliderDeleted,
} = actions;

export default reducer;
