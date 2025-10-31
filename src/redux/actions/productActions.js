import axios from 'axios';
import {
    productsFail,
    productsSuccess,
    productsRequest,
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail,
    trendingProductsRequest,
    trendingProductsSuccess,
    trendingProductsFail,
    favoritesProductsRequest,
    favoritesProductsSuccess,
    favoritesProductsFail,
    searchProductsRequest,
    searchProductsSuccess,
    searchProductsFail
} from '../slices/productsSlice';
import { productFail, productSuccess, productRequest, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess, updateProductFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from '../slices/productSlice';
const token = localStorage.getItem("afcc8908");

export const createNewProduct = productData => async (dispatch) => {
    try {
        dispatch(newProductRequest())
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/product/new`, productData);
        dispatch(newProductSuccess(data))
    } catch (error) {
        //handle error
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(newProductFail(message))
    }

}

export const getAdminProduct = id => async (dispatch) => {

    try {
        dispatch(productRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(productFail(message))
    }

}

export const getAdminProducts = () => async (dispatch) => {

    try {
        dispatch(adminProductsRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(adminProductsFail(message))
    }

}

export const getAdminActiveProducts = () => async (dispatch) => {

    try {
        dispatch(adminProductsRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/active/products`);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(adminProductsFail(message))
    }

}

export const deleteProduct = id => async (dispatch) => {

    try {
        dispatch(deleteProductRequest())
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess())
    } catch (error) {
        console.error("❌ Delete product failed:", error);

        const message =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong while deleting the product.";

        dispatch(deleteProductFail(message));
    }

}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch(updateProductRequest())
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/product/${id}`, productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
     const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updateProductFail(message))
    }
}

export const toggleProductActive = (id) => async (dispatch) => {

    try {
        dispatch(updateProductRequest())
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/product/status/${id}`);
        dispatch(updateProductSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updateProductFail(message))
    }

}

export const createNewProductHighlight = formData => async (dispatch) => {
    try {

        dispatch(newProductRequest())
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/highlight/new`, formData);
        dispatch(newProductSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(newProductFail(message))
    }

}

export const getAdminProductHighlight = id => async (dispatch) => {

    try {
        dispatch(productRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/highlight/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(productFail(message))
    }

}

export const updateProductHighlight = (id, productData) => async (dispatch) => {
    try {
        dispatch(updateProductRequest())
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/highlight/${id}`, productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updateProductFail(message))
    }
}

export const getAdminHighlights = () => async (dispatch) => {

    try {
        dispatch(adminProductsRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/highlights`);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(adminProductsFail(message))
    }

}

export const toggleHighlightActive = (id) => async (dispatch) => {

    try {
        dispatch(updateProductRequest())
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/highlight/status/${id}`);
        dispatch(updateProductSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(updateProductFail(message))
    }

}

//user
export const getActiveTrendingHighlights = (category) => async (dispatch) => {

    try {
        dispatch(trendingProductsRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/highlights/active?category=${category}`);
        dispatch(trendingProductsSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(trendingProductsFail(message))
    }

}

export const getActiveFavoritesHighlights = (category) => async (dispatch) => {

    try {
        dispatch(favoritesProductsRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/highlights/active?category=${category}`);
        dispatch(favoritesProductsSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(favoritesProductsFail(message))
    }

}

//user
export const getProduct = (slug) => async (dispatch) => {

    try {
        dispatch(productRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/product/${slug}`);
        dispatch(productSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(productFail(message))
    }

}

//user
export const getActiveCategoryProducts = (category, subCategory) => async (dispatch) => {
    let query = [];
    if (category) query.push(`category=${encodeURIComponent(category)}`);
    if (subCategory) query.push(`subcategory=${encodeURIComponent(subCategory)}`);

    const queryString = query.length ? `?${query.join('&')}` : '';

    try {
        dispatch(productsRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products${queryString}`);
     
        dispatch(productsSuccess(data))
    } catch (error) {
       const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(productsFail(message))
    }

}

//user
export const getActiveSearchProducts = (query) => async (dispatch) => {
    try {
        dispatch(searchProductsRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/search?q=${encodeURIComponent(query)}`);
       dispatch(searchProductsSuccess(data))
    } catch (error) {
      const message =
      error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(searchProductsFail(message))
    }

}

//user
export const getActiveRelatedProducts = (category, subCategory, slug) => async (dispatch) => {
    let query = [];
    if (category) query.push(`category=${encodeURIComponent(category)}`);
    if (subCategory) query.push(`subcategory=${encodeURIComponent(subCategory)}`);
    if (slug) query.push(`slug=${encodeURIComponent(slug)}`);

    const queryString = query.length ? `?${query.join('&')}` : '';

    try {
        dispatch(productsRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/by-category${queryString}`);
        dispatch(productsSuccess(data))
    } catch (error) {
        const message =
            error?.response?.data?.message || error.message || "Something went wrong";
        dispatch(productsFail(message))
    }

}