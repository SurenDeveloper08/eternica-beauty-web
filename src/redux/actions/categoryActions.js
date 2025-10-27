import axios from 'axios';
import {
  categoriesRequest,
  categoriesSuccess,
  categoriesFail,
  adminCategoriesRequest,
  adminCategoriesSuccess,
  adminCategoriesFail,
  adminSubCategoriesRequest,
  adminSubCategoriesSuccess,
  adminSubCategoriesFail,
  mainCategoriesRequest,
  mainCategoriesSuccess,
  mainCategoriesFail
} from '../slices/categoriesSlice'
import {
  categoryFail,
  categorySuccess,
  categoryRequest,
  newCategoryRequest,
  newCategorySuccess,
  newCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFail,
  newSubCategoryRequest,
  newSubCategorySuccess,
  newSubCategoryFail,
  subCategoryRequest,
  subCategorySuccess,
  subCategoryFail,
  updateSubCategoryRequest,
  updateSubCategorySuccess,
  updateSubCategoryFail,
  deleteSubCategoryRequest,
  deleteSubCategorySuccess,
  deleteSubCategoryFail
} from '../slices/categorySlice';
const token = localStorage.getItem("afcc8908");

export const getAdminCategory = id => async (dispatch) => {

  try {
    dispatch(categoryRequest())
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/category/${id}`);

    dispatch(categorySuccess(data))
  } catch (error) {
   const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(categoryFail(message))
  }

}

export const getAdminCategories = () => async (dispatch) => {

  try {
    dispatch(adminCategoriesRequest())
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/categories`);
    dispatch(adminCategoriesSuccess(data))
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(adminCategoriesFail(message));
  }

}

export const createNewCategory = formData => async (dispatch) => {
  try {
    dispatch(newCategoryRequest())
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/category/new`, formData);
    dispatch(newCategorySuccess(data))
  } catch (error) {
   const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(newCategoryFail(message))
  }

}

export const updateCategory = (id, productData) => async (dispatch) => {

  try {
    dispatch(updateCategoryRequest())
    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/category/${id}`, productData);
    dispatch(updateCategorySuccess(data))
  } catch (error) {
    //handle error
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(updateCategoryFail(message))
  }

}

export const toggleCategoryActive = (id) => async (dispatch) => {

  try {
    dispatch(updateCategoryRequest())
    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/category/status/${id}`);
    dispatch(updateCategorySuccess(data))
  } catch (error) {
    //handle error
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(updateCategoryFail(message))
  }

}

export const deleteCategory = id => async (dispatch) => {

  try {
    dispatch(deleteCategoryRequest())
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/admin/category/${id}`);
    dispatch(deleteCategorySuccess(data))
  } catch (error) {
    //handle error
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(deleteCategoryFail(message))
  }
}

export const getAdminActiveCategories = () => async (dispatch) => {

  try {
    dispatch(adminCategoriesRequest())
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/active/categories`);
    dispatch(adminCategoriesSuccess(data))
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(adminCategoriesFail(message));
  }

}

export const createNewSubcategory = (formData, category) => async (dispatch) => {
  try {

    dispatch(newSubCategoryRequest())
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/subcategory/new/${category}`, formData);
    dispatch(newSubCategorySuccess(data))
  } catch (error) {
  const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(newSubCategoryFail(message))
  }

}
export const getAdminSubCategories = () => async (dispatch) => {

  try {
    dispatch(adminSubCategoriesRequest())
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/subcategories`);
    dispatch(adminSubCategoriesSuccess(data))
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(adminSubCategoriesFail(message));
  }

}

export const getAdminSubCategory = (cid, scid) => async (dispatch) => {

  try {
    dispatch(subCategoryRequest())
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/subcategory/${cid}/${scid}`);
    dispatch(subCategorySuccess(data))
  } catch (error) {
  const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(subCategoryFail(message))
  }

}

export const updateSubCategory = (cid, scid, productData) => async (dispatch) => {

  try {
    dispatch(updateSubCategoryRequest())
    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/subcategory/${cid}/${scid}`, productData);
    dispatch(updateSubCategorySuccess(data))
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(updateSubCategoryFail(message))
  }

}

export const deleteSubCategory = (cid, scid) => async (dispatch) => {

  try {
    dispatch(deleteSubCategoryRequest())
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/admin/subcategory/${cid}/${scid}`);
    dispatch(deleteSubCategorySuccess(data))
  } catch (error) {
   const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(deleteSubCategoryFail(message))
  }

}

export const getAdminActiveSubCategories = (CategoryId) => async (dispatch) => {

  try {
    dispatch(adminSubCategoriesRequest())
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/active/subcategories/${CategoryId}`);
    dispatch(adminSubCategoriesSuccess(data))
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(adminSubCategoriesFail(message));
  }
}

export const toggleSubCategoryActive = (cid, scid) => async (dispatch) => {

  try {
    dispatch(updateSubCategoryRequest())
    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/subcategory/status/${cid}/${scid}`);
    dispatch(updateSubCategorySuccess(data))
  } catch (error) {
   const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(updateSubCategoryFail(message))
  }

}

export const getAdminMainCategories = () => async (dispatch) => {

  try {
    dispatch(mainCategoriesRequest())
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/maincategories`);
    dispatch(mainCategoriesSuccess(data))
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(mainCategoriesFail(message));
  }
}


//user
export const getActiveCategoriesWithSubcategories = () => async (dispatch) => {

  try {
    dispatch(categoriesRequest())
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories/active`);
    dispatch(categoriesSuccess(data))
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(categoriesFail(message));
  }

}

//user
export const getActiveMainCategories = () => async (dispatch) => {

  try {
    dispatch(mainCategoriesRequest())
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/maincategories/active`);
    dispatch(mainCategoriesSuccess(data))
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(mainCategoriesFail(message));
  }

}