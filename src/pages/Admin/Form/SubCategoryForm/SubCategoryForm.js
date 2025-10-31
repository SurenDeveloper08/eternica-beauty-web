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
import { getAdminActiveCategories, createNewSubcategory, getAdminSubCategory, updateSubCategory } from "../../../../redux/actions/categoryActions";
import { clearSubCategoryCreated, clearError, clearSubCategoryUpdated } from '../../../../redux/slices/categorySlice'
const SubCategoryForm = () => {
    const { cid: CategoryId, scid: SubCategoryId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories = [] } = useSelector((state) => state.categoriesState);
    const [imagePreview, setImagePreview] = useState(null);
    const { loading, isSubCategoryCreated, isSubCategoryUpdated, error, subCategory } = useSelector(state => state.categoryState)

    useEffect(() => {
        if (CategoryId) {
            dispatch(getAdminSubCategory(CategoryId, SubCategoryId))
        }
    }, [CategoryId])

    useEffect(() => {
        dispatch(getAdminActiveCategories());
    }, [dispatch]);

    const [initialValues, setInitialValues] = useState({
        name: "",
        category: "",
        title: "",
        description: "",
        sortOrder: 0,
        image: null,
        isActive: true,
        showOnHome: false,
        seo: {
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
            canonicalUrl: "",
        },
    });

    useEffect(() => {

        if (SubCategoryId && subCategory?._id === SubCategoryId) {

            setInitialValues({
                name: subCategory.name || "",
                category: CategoryId,
                title: subCategory.title || "",
                description: subCategory.description || "",
                sortOrder: subCategory.sortOrder || 0,
                image: null,
                isActive: subCategory.isActive ?? true,
                showOnHome: subCategory.showOnHome ?? true,
                seo: {
                    metaTitle: subCategory.seo.metaTitle || "",
                    metaDescription: subCategory.seo.metaDescription || "",
                    metaKeywords: subCategory.seo.metaKeywords || "",
                    canonicalUrl: subCategory.seo.canonicalUrl || "",
                },
            });
            if (subCategory.image) {
                setImagePreview(subCategory.image);
            }
        }
    }, [subCategory]);

    const clearForm = () => {
        setInitialValues({
            name: "",
            category: "",
            title: "",
            description: "",
            sortOrder: 0,
            image: null,
            isActive: true,
            showOnHome: false,
            seo: {
                metaTitle: "",
                metaDescription: "",
                metaKeywords: "",
                canonicalUrl: "",
            },
        });
        setImagePreview(null);
    }

    const navigatePage = () => {
        setTimeout(() => {
            navigate("/admin/categories");
        }, 2500);
    }

    useEffect(() => {
        if (isSubCategoryCreated) {
            dispatch(clearSubCategoryCreated());
            clearForm();
            toast.success("added successfully!");
            navigatePage();
        }

        if (isSubCategoryUpdated) {
            dispatch(clearSubCategoryUpdated());
            clearForm();
            toast.success("updated successfully!");
            navigatePage();
        }

        if (error) {
            dispatch(clearError());
            toast.error(`${error}`);
        }

    }, [isSubCategoryCreated, isSubCategoryUpdated, error, navigate, dispatch]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        category: Yup.string().required("Category is required"),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        sortOrder: Yup.number()
            .required("Sort Order is required")
            .min(0, "Must be positive"),

        image: (CategoryId || SubCategoryId) && imagePreview
            ? Yup.mixed().nullable()
            : Yup.mixed().required("Image is required"),
    });

    const handleImageChange = (e, setFieldValue) => {
        const file = e.currentTarget.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setFieldValue("image", file);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("category", values.cat);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("sortOrder", values.sortOrder);
        formData.append("isActive", values.isActive);
        formData.append("image", values.image);
        formData.append("showOnHome", values.showOnHome);

        formData.append("metaTitle", values.seo.metaTitle);
        formData.append("metaDescription", values.seo.metaDescription);
        formData.append("metaKeywords", values.seo.metaKeywords);
        formData.append("canonicalUrl", values.seo.canonicalUrl);

        if (SubCategoryId) {
            dispatch(updateSubCategory(CategoryId, SubCategoryId, formData));
        } else {
            dispatch(createNewSubcategory(formData, values.category));
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
            <h4 className="fw-bold mb-4 text-center">
                {CategoryId ? "Edit SubCategory" : "Add New SubCategory"}
            </h4>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, errors, touched }) => (
                    <Form>
                        <Row className="g-4">
                            <Col md={6}>
                                <BootstrapForm.Label>SubCategory Name *</BootstrapForm.Label>
                                <Field
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter category name"
                                />
                                <ErrorMessage name="name" component="div" className="text-danger small" />
                            </Col>

                            <Col md={6}>
                                <BootstrapForm.Label>Category *</BootstrapForm.Label>
                                <Field
                                    as="select"
                                    name="category"
                                    className="form-control"
                                    onChange={(e) =>
                                        setFieldValue("category", e.target.value)
                                    }
                                    value={values.category}
                                    disabled={(CategoryId || SubCategoryId)}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="category" component="div" className="text-danger small" />
                            </Col>
                            <Col md={12}>
                                <BootstrapForm.Label>Title *</BootstrapForm.Label>
                                <Field
                                    as="textarea"
                                    rows="4"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter detailed title"
                                />
                                <ErrorMessage name="title" component="div" className="text-danger small" />
                            </Col>
                            <Col md={12}>
                                <BootstrapForm.Label>Description *</BootstrapForm.Label>
                                <Field
                                    as="textarea"
                                    rows="4"
                                    name="description"
                                    className="form-control"
                                    placeholder="Enter detailed description"
                                />
                                <ErrorMessage name="description" component="div" className="text-danger small" />
                            </Col>

                            <Col md={6}>
                                <BootstrapForm.Label>Image *</BootstrapForm.Label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={(e) => handleImageChange(e, setFieldValue)}
                                />
                                <ErrorMessage name="image" component="div" className="text-danger small" />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 rounded shadow-sm"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                    />
                                )}
                            </Col>

                            <Col md={6}>
                                <BootstrapForm.Label>Sort Order *</BootstrapForm.Label>
                                <Field
                                    name="sortOrder"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter order number"
                                />
                                <ErrorMessage name="sortOrder" component="div" className="text-danger small" />
                            </Col>

                            <Col md={6}>
                                <label className="form-label fw-semibold d-block">
                                    Active Status
                                </label>
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

                            <Col md={6}>
                                <label className="form-label fw-semibold d-block">
                                    show On Home
                                </label>
                                <div className="form-check form-switch">
                                    <Field
                                        type="checkbox"
                                        name="showOnHome"
                                        className="form-check-input"
                                        id="isshowOnHomeSwitch"
                                    />
                                    <label className="form-check-label" htmlFor="isshowOnHomeSwitch">
                                        {values.showOnHome ? "Active" : "Inactive"}
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

export default SubCategoryForm;
