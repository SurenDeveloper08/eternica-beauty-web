import axios from 'axios';
import {
    pageRequest,
    pageSuccess,
    pageFail,
    newPageFail,
    newPageSuccess,
    newPageRequest,
    updatePageFail,
    updatePageRequest,
    updatePageSuccess,
} from '../slices/pageSlice';
const token = localStorage.getItem("afcc8908");
export const createNewPage = pageData => async (dispatch) => {
    try {
        dispatch(newPageRequest())
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/page`, pageData,
            config);
        dispatch(newPageSuccess(data))
    } catch (error) {
        //handle error
   const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(newPageFail(message))
    }

}

export const getAdminPage = page => async (dispatch) => {

    try {
        dispatch(pageRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/page/${page}`);
        dispatch(pageSuccess(data))
    } catch (error) {
        //handle error
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(pageFail(message))
    }

}

export const updatePage = (id, pageData) => async (dispatch) => {
    try {
        dispatch(updatePageRequest())
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/page/${id}`, pageData);
        dispatch(updatePageSuccess(data))
    } catch (error) {
        //handle error
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updatePageFail(message))
    }
}
