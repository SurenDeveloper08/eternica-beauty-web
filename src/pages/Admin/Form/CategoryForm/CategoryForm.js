import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Button, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import { CloudUpload } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import SEOFields from "../SEOForm/SEOForm";
import { createNewCategory, getAdminCategory, updateCategory } from '../../../../redux/actions/categoryActions'
import { clearCategoryUpdated, clearError, clearCategoryCreated } from '../../../../redux/slices/categorySlice'

const CategoryForm = () => {
    const { id: CategoryId } = useParams();
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, isCategoryCreated, isCategoryUpdated, error, category } = useSelector(state => state.categoryState)

    const [initialValues, setInitialValues] = useState({
        name: "",
        title: "",
        description: "",
        sortOrder: 0,
        image: null,
        isActive: true,
        seo: { metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "" },
    });

    useEffect(() => {
        if (CategoryId) {
            dispatch(getAdminCategory(CategoryId))
        }
    }, [CategoryId])

    useEffect(() => {
        if (CategoryId && category?._id === CategoryId) {
            setInitialValues({
                name: category.name || "",
                title: category.title || "",
                description: category.description || "",
                sortOrder: category.sortOrder || 0,
                image: null,
                isActive: category.isActive ?? true,
                seo: {
                    metaTitle: category.seo.metaTitle || "",
                    metaDescription: category.seo.metaDescription || "",
                    metaKeywords: category.seo.metaKeywords || "",
                    canonicalUrl: category.seo.canonicalUrl || "",
                },
            });
            if (category.image) {
                setImagePreview(category.image);
            }
        }
    }, [category]);

    const clearForm = () => {
        setInitialValues({
            name: "",
            title: "",
            description: "",
            sortOrder: 0,
            image: null,
            isActive: true,
            seo: { metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "" },
        });
        setImagePreview(null);
    }
    const navigatePage = () => {
        setTimeout(() => {
            navigate("/admin/categories");
        }, 2500);
    }

    useEffect(() => {
        if (isCategoryCreated) {
            dispatch(clearCategoryCreated());
            clearForm();
            toast.success("added successfully!");
            navigatePage();
        }

        if (isCategoryUpdated) {
            dispatch(clearCategoryUpdated());
            clearForm();
            toast.success("updated successfully!");
            navigatePage();
        }

        if (error) {
            dispatch(clearError());
            toast.error(`${error}`);
        }

    }, [isCategoryCreated, isCategoryUpdated, error, navigate, dispatch]);

    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setFieldValue("image", file);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        image: CategoryId
            ? Yup.mixed().nullable()
            : Yup.mixed().required("Image is required"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('sortOrder', values.sortOrder);
        formData.append('isActive', values.isActive);
        formData.append('image', values.image);

        formData.append('metaTitle', values.seo.metaTitle);
        formData.append('metaDescription', values.seo.metaDescription);
        formData.append('metaKeywords', values.seo.metaKeywords);
        formData.append('canonicalUrl', values.seo.canonicalUrl);
        if (CategoryId) {
            dispatch(updateCategory(CategoryId, formData));
        } else {
            dispatch(createNewCategory(formData));
        }

        resetForm();
        setImagePreview(null);
    };

    return (
        <motion.div
            className="container py-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h4 className="fw-bold mb-4 text-center">{CategoryId ? "Edit Category" : "Add New Category"}</h4>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <Row className="g-4">
                            <Col md={12}>
                                <BootstrapForm.Label>Category Name *</BootstrapForm.Label>
                                <Field name="name" className="form-control" placeholder="Enter category name" />
                                <ErrorMessage name="name" component="div" className="text-danger small" />
                            </Col>
                            <Col md={12}>
                                <BootstrapForm.Label>Title *</BootstrapForm.Label>
                                <Field name="title" className="form-control" placeholder="Enter detailed title" />
                                <ErrorMessage name="title" component="div" className="text-danger small" />
                            </Col>
                            <Col md={12}>
                                <BootstrapForm.Label>Description *</BootstrapForm.Label>
                                <Field as="textarea" rows="4" name="description" className="form-control" placeholder="Enter detailed description" />
                                <ErrorMessage name="description" component="div" className="text-danger small" />
                            </Col>

                            <Col md={6}>
                                <BootstrapForm.Label>Image *</BootstrapForm.Label>
                                <input type="file" accept="image/*" name="image" onChange={(e) => handleImageChange(e, setFieldValue)} className="form-control" />
                                <ErrorMessage name="image" component="div" className="text-danger small" />
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 rounded shadow-sm" style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Label>Sort Order</BootstrapForm.Label>
                                <Field name="sortOrder" type="number" className="form-control" placeholder="Enter order number" />
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
                            <SEOFields values={values.seo} setFieldValue={setFieldValue} />

                            <Col md={12} className="text-center mt-4">
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
                                                {CategoryId ? "Updating..." : "Saving..."}
                                            </>
                                        ) : (
                                            <>
                                                <CloudUpload className="me-2" />
                                                {CategoryId ? "Update" : "Save"}
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

export default CategoryForm;
