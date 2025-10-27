import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { CloudUpload } from "@mui/icons-material";
import { Form, Button, Col, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { createNewPage, getAdminPage, updatePage } from "../../../../redux/actions/pageActions";
import { clearError, clearPageCreated, clearPageUpdated } from "../../../../redux/slices/pageSlice";

const AboutUsForm = () => {
    const [preview, setPreview] = useState(null);
    const dispatch = useDispatch();
    const { isPageCreated, isPageUpdated, page, error, loading } = useSelector(state => state.pageState);

    // Initial values
    const [initialValues, setInitialValues] = useState({
        title: "",
        description: "",
        image: null,
    });

    useEffect(() => {
        dispatch(getAdminPage('about'));
    }, [dispatch]);

    useEffect(() => {
        if (page?.page === 'about')
            setInitialValues({
                title: page?.title || "",
                description: page?.description || "",
                image: page?.image,
            })
        setPreview(page.image);
    }, [page]);

    useEffect(() => {
        if (isPageCreated) {
            dispatch(clearPageCreated());
            // clearForm();
            toast.success("added successfully!");
        }
        if (isPageUpdated) {
            dispatch(clearPageUpdated());
            // clearForm();
            toast.success("updated successfully!");
        }

        if (error) {
            dispatch(clearError());
            toast.error(`${error}`);
        }

    }, [isPageCreated, isPageUpdated, error, dispatch]);

    const clearForm = () => {
        setInitialValues({
            title: "",
            description: "",
            image: null,
        });
        setPreview(null);
    };

    // Validation rules
    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        image: page && page.image ? Yup.mixed().nullable() : Yup.mixed().required("Image is required"),
    });

    // Submit handler
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("page", "about");

            if (values.image) {
                formData.append("image", values.image);
            }
            if (page && page._id) {
               dispatch(updatePage(page._id, formData));
            } else {
                dispatch(createNewPage(formData));
            }

        } catch (error) {
            console.error("Error saving About Us:", error);
        }
    };


    return (
        <motion.div
            className="container py-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h4 className="fw-bold mb-4 text-center">
                {page ? "Edit About Us" : "Add About Us"}
            </h4>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, dirty, isValid }) => (
                    <FormikForm>
                        <Row className="g-3">
                            {/* Title */}
                            <Col md={12}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Field
                                        name="title"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter About Us title"
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className="text-danger small"
                                    />
                                </Form.Group>
                            </Col>

                            {/* Description */}
                            <Col md={12}>
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Field
                                        as="textarea"
                                        rows={5}
                                        name="description"
                                        className="form-control"
                                        placeholder="Write a detailed About Us description"
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="text-danger small"
                                    />
                                </Form.Group>
                            </Col>

                            {/* Image Upload */}
                            <Col md={12}>
                                <Form.Group controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        onChange={(e) => {
                                            const file = e.currentTarget.files[0];
                                            setFieldValue("image", file);
                                            if (file) setPreview(URL.createObjectURL(file));
                                        }}
                                    />
                                    {preview && (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="mt-2 rounded"
                                            style={{
                                                width: "120px",
                                                height: "120px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                    <ErrorMessage
                                        name="image"
                                        component="div"
                                        className="text-danger small"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Col md={12} className="text-center mt-4">
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Button
                                    type="submit"
                                    variant="success"
                                    className="px-5 py-2 fw-bold"
                                    disabled={loading || !dirty || !isValid}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <CloudUpload className="me-2" />
                                            Save
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </Col>
                    </FormikForm>
                )}
            </Formik>

        </motion.div>
    );
};

export default AboutUsForm;
