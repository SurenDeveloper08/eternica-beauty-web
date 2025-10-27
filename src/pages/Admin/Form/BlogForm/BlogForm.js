import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import { Button, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import { Add, Delete, CloudUpload, Title } from "@mui/icons-material";
import { toast } from "react-toastify";
import SEOFields from "../SEOForm/SEOForm"; import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './BlogForm.css'

const BlogForm = () => {
    const { id } = useParams();
    const [imagePreview, setImagePreview] = useState(null);

    // Fetch categories
    //   useEffect(() => {
    //     axios.get("/api/categories").then((res) => setCategories(res.data));
    //   }, []);

    // Pre-fill form on editf
    const [initialValues, setInitialValues] = useState({
        name: "",
        title: "",
        description: "",
        sortOrder: 0,
        image: null,
        isActive: true,
        seo: { metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "" },
    });

    //   useEffect(() => {
    //     if (id) {
    //       axios.get(`/api/products/${id}`).then((res) => {
    //         const product = res.data;
    //         setInitialValues({
    //           ...initialValues,
    //           ...product,
    //           image: null, // new main image upload optional
    //           images: [], // new gallery upload optional
    //         });
    //         setImagePreview(product.imageUrl); // existing main image
    //         setGalleryPreviews(product.galleryUrls || []); // existing gallery
    //         if (product.category) handleCategoryChange(product.category, () => {});
    //       });
    //     }
    //   }, [id]);

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
        description: Yup.string()
            .test(
                "description",
                "Description is required",
                value => {
                    const text = value?.replace(/<(.|\n)*?>/g, "").trim();
                    return !!text;
                }
            ),
        sortOrder: Yup.number().required("Required").positive(),
        image: id
            ? Yup.mixed().nullable()
            : Yup.mixed().required("Image is required"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const formData = new FormData();

            // Main image
            if (values.image) formData.append("image", values.image);

            // Other fields
            Object.keys(values).forEach((key) => {
                if (!["image", "images", "seo"].includes(key)) {
                    formData.append(key, JSON.stringify(values[key]));
                } else if (key === "seo") {
                    Object.keys(values.seo).forEach((seoKey) =>
                        formData.append(`seo[${seoKey}]`, values.seo[seoKey])
                    );
                }
            });

            if (id) {
                await axios.put(`/api/category/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Category updated successfully!");
            } else {
                await axios.post("/api/products", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Category added successfully!");
            }

            resetForm();
            setImagePreview(null);
        } catch (error) {
            console.error(error);
            toast.error("❌ Failed to save product.");
        }
    };

    return (
        <motion.div
            className="container py-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h4 className="fw-bold mb-4 text-center">{id ? "Edit Blog" : "Add New Blog"}</h4>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <Row className="g-4">
                            {/* Product Name */}
                            <Col md={12}>
                                <BootstrapForm.Label>Title *</BootstrapForm.Label>
                                <Field name="name" className="form-control" placeholder="Enter category name" />
                                <ErrorMessage name="name" component="div" className="text-danger small" />
                            </Col>

                            <Col md={12}><BootstrapForm.Label>Slug *</BootstrapForm.Label>
                                <Field type="text" name="title" className="form-control" />
                                <ErrorMessage name="title" component="div" className="text-danger small" />
                            </Col>

                            <Col md={12}>
                                <BootstrapForm.Label>Description *</BootstrapForm.Label>
                                <ReactQuill
                                    theme="snow"
                                    value={values.description}
                                    onChange={(value) => setFieldValue("description", value)}
                                    placeholder="Enter detailed description"
                                    className="ql-bootstrap"
                                />
                                <ErrorMessage name="description" component="div" className="text-danger small" />
                            </Col>

                            <Col md={12}>
                                <BootstrapForm.Label>Image *</BootstrapForm.Label>
                                <input type="file" accept="image/*" name="image" onChange={(e) => handleImageChange(e, setFieldValue)} className="form-control" />
                                <ErrorMessage name="image" component="div" className="text-danger small" />
                                {imagePreview && <motion.img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="rounded shadow mt-3"
                                    style={{
                                        width: "100%",
                                        maxHeight: "280px",
                                        objectFit: "cover",
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                />}
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
                            {/* SEO */}
                            <SEOFields values={values.seo} setFieldValue={setFieldValue} />

                            {/* Submit */}
                            <Col md={12} className="text-center mt-4">
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Button type="submit" variant="success" className="px-5 py-2 fw-bold">
                                        <CloudUpload className="me-2" />  {id ? "Update Blog" : "Save Blog"}
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

export default BlogForm;
