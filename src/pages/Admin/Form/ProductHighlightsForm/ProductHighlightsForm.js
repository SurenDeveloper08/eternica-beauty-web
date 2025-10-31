import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Button, Col, Row } from "react-bootstrap";
import {
  CloudUpload,
  Whatshot,
  Favorite,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createNewProductHighlight, updateProductHighlight, getAdminProductHighlight, getAdminActiveProducts } from "../../../../redux/actions/productActions";
import { clearError, clearProductCreated, clearProductUpdated } from "../../../../redux/slices/productSlice";
const ProductHighlightsForm = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isProductCreated, isProductUpdated, product, loading, error } = useSelector(state => state.productState);
  const { products } = useSelector(state => state.productsState);

  const [initialValues, setInitialValues] = useState({
    productId: "",
    category: "",
    sortOrder: "",
    isActive: true,
  });

  const categorys = [
    { value: "trending", label: "Trending Products", icon: <Whatshot className="text-danger" /> },
    { value: "favourite", label: "Favourite Products", icon: <Favorite className="text-pink" /> },
  ];

  const validationSchema = Yup.object({
    productId: Yup.string().required("Select a product"),
    category: Yup.string().required("Select a category"),
    sortOrder: Yup.number().typeError("Only numbers allowed").nullable(),
  });

  useEffect(() => {
    dispatch(getAdminActiveProducts());
  }, [dispatch, error]);

  useEffect(() => {
    if (productId) {
      dispatch(getAdminProductHighlight(productId))
    }
  }, [productId])

  useEffect(() => {
    if (productId && product?._id === productId) {

      setInitialValues({
        productId: product.productId._id || "",
        category: product.category || "",
        sortOrder: product.sortOrder || 0,
        isActive: product.isActive ?? true,
      });

    }
  }, [product]);

  useEffect(() => {
    if (isProductCreated) {
      dispatch(clearProductCreated());
      clearForm();
      toast.success("added successfully!");
      navigatePage();
    }

    if (isProductUpdated) {
      dispatch(clearProductUpdated());
      clearForm();
      toast.success("updated successfully!");
      navigatePage();
    }

    if (error) {
      dispatch(clearError());
      toast.error(`${error}`);

    }

  }, [isProductCreated, isProductUpdated, error, navigate, dispatch]);

  const clearForm = () => {
    setInitialValues({
      productId: "",
      category: "",
      sortOrder: "",
    });

  };

  const navigatePage = () => {
    setTimeout(() => {
      navigate("/admin/highlights");
    }, 2500);
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('productId', values.productId);
      formData.append('category', values.category);
      formData.append('sortOrder', values.sortOrder);
      formData.append('isActive', values.isActive);
      if (productId) {
        dispatch(updateProductHighlight(productId, formData));
      } else {
        dispatch(createNewProductHighlight(formData));
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save product highlight");
    }
  };

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h4 className="fw-bold text-center mb-4">
        {productId ? "Edit Product Highlight" : "Add Product Highlight"}
      </h4>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Row className="g-4">
              <Col md={6}>
                <label className="form-label fw-semibold">Select Product</label>
                <Field as="select" name="productId" className="form-select" >
                  <option value="">Choose product...</option>
                  {products?.map((prod) => (
                    <option key={prod._id} value={prod._id}>
                      {prod.productName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="productId" component="div" className="text-danger small" />
              </Col>

              <Col md={6}>
                <label className="form-label fw-semibold">Select category</label>
                <Field as="select" name="category" className="form-select">
                  <option value="">Choose category...</option>
                  {categorys.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-danger small" />
              </Col>

              <Col md={6}>
                <label className="form-label fw-semibold">Sort Order</label>
                <Field
                  name="sortOrder"
                  type="text"
                  className="form-control"
                  placeholder="e.g. 1"
                />
                <ErrorMessage name="sortOrder" component="div" className="text-danger small" />
              </Col>

              <Col md={6}>
                <label className="form-label fw-semibold d-block">Active Status</label>
                <div className="form-check form-switch">
                  <Field
                    type="checkbox"
                    name="isActive"
                    className="form-check-input"
                    id="isActiveSwitch"
                  />
                  <label className="form-check-label" htmlFor="isActiveSwitch">
                    {values.isActive ? "Active" : "Inactive"}
                  </label>
                </div>
              </Col>

              <Col md={12} className="text-center mt-3">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    type="submit"
                    variant="success"
                    className="px-5 py-2 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        {productId ? "Updating..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <CloudUpload className="me-2" />
                        {productId ? "Update" : "Save"}
                      </>
                    )}
                  </Button>
                </motion.div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>

    </motion.div>
  );
};

export default ProductHighlightsForm;
