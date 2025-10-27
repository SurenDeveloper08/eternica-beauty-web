import {
    loginFail,
    loginRequest,
    loginSuccess,
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '../slices/authSlice';

import {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail

} from '../slices/userSlice'
import axios from 'axios';
// const token = localStorage.getItem("afcc8908");

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest())
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login`, { email, password });
        dispatch(loginSuccess(data))
        localStorage.setItem("afcc8908", data.token);

    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(loginFail(message))
    }
}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/register`, userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(registerFail(message))
    }

}

export const loadUser = (token) => async (dispatch) => {
    try {

        dispatch(loadUserRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/myprofile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(loadUserSuccess(data))
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(loadUserFail(message))
    }
}

export const logout = async (dispatch) => {

    try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/logout`);
        localStorage.removeItem("afcc8908");
        dispatch(logoutSuccess())
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(logoutFail)
    }

}

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/update`, userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updateProfileFail(message))
    }

}

export const updatePassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updatePasswordFail(message))
    }

}

export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(forgotPasswordFail(message))
    }

}

export const resetPassword = (formData, token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(resetPasswordFail(message))
    }

}

export const getUsers = async (dispatch) => {

    try {
        dispatch(usersRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/users`);
        dispatch(usersSuccess(data))
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(usersFail(message))
    }

}

export const getUser = id => async (dispatch) => {

    try {
        dispatch(userRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data))
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(userFail(message))
    }

}

export const deleteUser = id => async (dispatch) => {

    try {
        dispatch(deleteUserRequest())
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess())
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(deleteUserFail(message))
    }

}

export const updateUser = (id, formData) => async (dispatch) => {

    try {
        dispatch(updateUserRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess())
    } catch (error) {
        const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updateUserFail(message))
    }

}