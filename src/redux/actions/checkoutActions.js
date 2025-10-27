import axios from 'axios';
import {
    checkoutRequest,
    checkoutSuccess,
    checkoutFail,
    clearCheckoutState,
} from '../slices/checkoutSlice';
const token = localStorage.getItem("afcc8908");

export const createNewOrder = pageData => async (dispatch) => {
    try {
     
        dispatch(checkoutRequest())
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/checkout`, pageData);
        dispatch(checkoutSuccess(data))
    } catch (error) {
        //handle error
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(checkoutFail(message))
    }

}

