import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import { CloudUpload } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { createNewSeo, getAdminSeo, updateSeo } from "../../../../redux/actions/seoActions";
import { clearError, clearSeoCreated, clearSeoUpdated } from "../../../../redux/slices/seoSlice";
const HomeForm = () => {
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const { isSeoCreated, isSeoUpdated, seo, error, loading } = useSelector(state => state.seoState);

    // Initial values
    const [initialValues, setInitialValues] = useState({
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        canonicalUrl: "",

    });


    useEffect(() => {
        dispatch(getAdminSeo('home'));
    }, [dispatch]);

    useEffect(() => {
        if (seo?.page === 'home')
           setInitialValues({
                metaTitle: seo?.metaTitle || "",
                metaDescription: seo?.metaDescription || "",
                metaKeywords: seo?.metaKeywords || "",
                canonicalUrl: seo?.canonicalUrl || "",
            })
    }, [seo]);


    useEffect(() => {
        if (isSeoCreated) {
            dispatch(clearSeoCreated());
            toast.success("added successfully!");
        }
        if (isSeoUpdated) {
            dispatch(clearSeoUpdated());
            toast.success("updated successfully!");
        }

        if (error) {
            dispatch(clearError());
            toast.error(`${error}`);
        }

    }, [isSeoCreated, isSeoUpdated, error, dispatch]);

    const validationSchema = Yup.object({
        metaTitle: Yup.string().required("Meta title is required"),
        metaDescription: Yup.string().required("Meta description is required"),
        metaKeywords: Yup.string().required("Meta keywords are required"),
        canonicalUrl: Yup.string().required("Canonical URL is required"),
    });

    // Submit handler
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const formData = new FormData();
            formData.append("metaTitle", values.metaTitle);
            formData.append("metaDescription", values.metaDescription);
            formData.append("canonicalUrl", values.canonicalUrl);
            formData.append("metaKeywords", values.metaKeywords);
            formData.append("page", "home");

            if (seo && seo._id) {
                dispatch(createNewSeo(formData));
            } else {
                dispatch(createNewSeo(formData));
            }

        } catch (error) {
            console.error("Error saving About Us:", error);
        }
    }
    return (
        <motion.div
            className="container py-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h4 className="fw-bold mb-4 text-center">Home Meta Details</h4>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <Row className="g-3">
                            {/* Meta Title */}
                            <Col md={6}>
                                <BootstrapForm.Label>Meta Title *</BootstrapForm.Label>
                                <Field
                                    name="metaTitle"
                                    className="form-control"
                                    placeholder="Enter meta title"
                                />
                                <ErrorMessage
                                    name="metaTitle"
                                    component="div"
                                    className="text-danger small"
                                />
                            </Col>

                            {/* Canonical URL */}
                            <Col md={6}>

                                <BootstrapForm.Label>Canonical URL *</BootstrapForm.Label>
                                <Field
                                    name="canonicalUrl"
                                    type="text"
                                    className="form-control"
                                    placeholder="https://yourdomain.com/"
                                />
                                <ErrorMessage
                                    name="canonicalUrl"
                                    component="div"
                                    className="text-danger small"
                                />

                            </Col>

                            {/* Meta Description */}
                            <Col md={12}>

                                <BootstrapForm.Label>Meta Description *</BootstrapForm.Label>
                                <Field
                                    as="textarea"
                                    name="metaDescription"
                                    rows={3}
                                    className="form-control"
                                    placeholder="Enter meta description"
                                />
                                <ErrorMessage
                                    name="metaDescription"
                                    component="div"
                                    className="text-danger small"
                                />

                            </Col>

                            {/* Meta Keywords */}
                            <Col md={12}>

                                <BootstrapForm.Label>Meta Keywords *</BootstrapForm.Label>
                                <Field
                                    name="metaKeywords"
                                    className="form-control"
                                    placeholder="keyword1, keyword2, keyword3"
                                />
                                <ErrorMessage
                                    name="metaKeywords"
                                    component="div"
                                    className="text-danger small"
                                />

                            </Col>

                            {/* Submit */}
                            <Col md={12} className="text-center mt-4">
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        className="px-5 py-2 fw-bold"
                                        disabled={loading}
                                    >
                                        <CloudUpload className="me-2" />
                                        {loading
                                            ? "Saving..."
                                            : "Save Meta"}
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

export default HomeForm;
