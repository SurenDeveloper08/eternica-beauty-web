import axios from 'axios';
import {
    sliderRequest,
    sliderSuccess,
    sliderFail,
    newSliderFail,
    newSliderSuccess,
    newSliderRequest,
    updateSliderFail,
    updateSliderRequest,
    updateSliderSuccess,
    deleteSliderRequest,
    deleteSliderSuccess,
    deleteSliderFail,
} from '../slices/sliderSlice';

import {
    slidersRequest,
    slidersSuccess,
    slidersFail,
    adminSlidersFail,
    adminSlidersRequest,
    adminSlidersSuccess
} from '../slices/slidersSlice'
const token = localStorage.getItem("afcc8908");

export const createNewSlider = sliderData => async (dispatch) => {
    try {
        dispatch(newSliderRequest())
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/slider/new`, sliderData);
        dispatch(newSliderSuccess(data))
    } catch (error) {
        //handle error
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(newSliderFail(message))
    }

}

export const getAdminSlider = id => async (dispatch) => {

    try {
        dispatch(sliderRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/slider/${id}`);
        dispatch(sliderSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(sliderFail(message))
    }
}

export const updateSlider = (id, sliderData) => async (dispatch) => {
    try {
        dispatch(updateSliderRequest())
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/slider/${id}`, sliderData);
        dispatch(updateSliderSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updateSliderFail(message))
    }
}

export const getAdminSliders = () => async (dispatch) => {

    try {
        dispatch(adminSlidersRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/sliders`);
        dispatch(adminSlidersSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(adminSlidersFail(message))
    }

}

export const toggleSliderActive = id => async (dispatch) => {

    try {
        dispatch(updateSliderRequest())
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/slider/status/${id}`);
        dispatch(updateSliderSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updateSliderFail(message))
    }
}

export const deleteSlider = id => async (dispatch) => {

    try {
        dispatch(deleteSliderRequest())
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/admin/slider/${id}`);
        dispatch(deleteSliderSuccess(data))
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(deleteSliderFail(message))
    }
}

//user
export const getActiveSliders = () => async (dispatch) => {

    try {
        dispatch(slidersRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/sliders/active`);
        dispatch(slidersSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(slidersFail(message))
    }

}