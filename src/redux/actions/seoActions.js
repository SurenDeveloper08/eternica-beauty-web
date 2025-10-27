import axios from 'axios';
import {
    seoRequest,
    seoSuccess,
    seoFail,
    newSeoFail,
    newSeoSuccess,
    newSeoRequest,
    updateSeoFail,
    updateSeoRequest,
    updateSeoSuccess,
} from '../slices/seoSlice';
const token = localStorage.getItem("afcc8908");

export const createNewSeo = (seoData) => async (dispatch) => {
    try {
        dispatch(newSeoRequest())
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/seo`, seoData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(newSeoSuccess(data))
    } catch (error) {
        console.log(error);
        const message =
            error.response?.data?.message || "Something went wrong. Please try again.";
        dispatch(newSeoFail(message));
    }

}

export const getAdminSeo = (page) => async (dispatch) => {

    try {
        dispatch(seoRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/seo?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        dispatch(seoSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(seoFail(message))
    }

}

export const updateSeo = (id, seoData) => async (dispatch) => {
    try {
        dispatch(updateSeoRequest())
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/Seo/${id}`, seoData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(updateSeoSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updateSeoFail(message))
    }
}

//user
export const getSeoByPage = (page) => async (dispatch) => {

    try {
        dispatch(seoRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/seo?page=${page}`);
       dispatch(seoSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(seoFail(message))
    }

}