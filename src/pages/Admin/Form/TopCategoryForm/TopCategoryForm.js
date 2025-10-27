import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Button, Col, Row } from "react-bootstrap";
import { CloudUpload } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const TopCategoryForm = () => {
    const { id } = useParams(); // if editing
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);

    const [initialValues, setInitialValues] = useState({
        name: "",
        category: "",
        subCategory: "",
        sortOrder: "",
        image: null,
        isActive: true,
    });

    const validationSchema = Yup.object({
        name: Yup.string().required("Category name required"),
        category: Yup.string().required("Main category required"),
        subCategory: Yup.string().required("Sub category required"),
        sortOrder: Yup.number()
            .typeError("Only numbers allowed")
            .nullable(),
        image: Yup.mixed().required("Image required"),
    });

    // Fetch existing category for edit mode
    useEffect(() => {
        if (id) {
            const fetchCategory = async () => {
                try {
                    const res = await axios.get(`/api/topcategories/${id}`);
                    const data = res.data;
                    setInitialValues({
                        name: data.name || "",
                        category: data.category || "",
                        subCategory: data.subCategory || "",
                        sortOrder: data.sortOrder || "",
                        image: null,
                        isActive: data.isActive ?? true,
                    });
                    if (data.image) {
                        setPreview(data.image.startsWith("http") ? data.image : `/uploads/${data.image}`);
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("❌ Failed to load category");
                }
            };
            fetchCategory();
        }
    }, [id]);

    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFieldValue("image", file);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, val]) => formData.append(key, val));

            if (id) {
                await axios.put(`/api/topcategories/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("✅ Top Category Updated!");
            } else {
                await axios.post("/api/topcategories", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("✅ Top Category Added!");
            }

            resetForm();
            setPreview(null);
            navigate("/admin/topcategories");
        } catch (error) {
            console.error(error);
            toast.error("❌ Failed to save category");
        }
    };

    return (
        <motion.div
            className="container py-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h4 className="fw-bold text-center mb-4">
                {id ? "Edit Top Category" : "Add Top Category"}
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
                                <label className="form-label">Display Name *</label>
                                <Field
                                    name="name"
                                    className="form-control"
                                    placeholder="e.g., Massage Oils"
                                />
                                <ErrorMessage name="name" component="div" className="text-danger small" />
                            </Col>

                            <Col md={6}>
                                <label className="form-label">Category *</label>
                                <Field as="select" name="category" className="form-select">
                                    <option value="">Select Category</option>
                                    <option value="Oils">Oils</option>
                                    <option value="Wipes">Wipes</option>
                                    <option value="Dispenser">Dispenser</option>
                                </Field>
                                <ErrorMessage name="category" component="div" className="text-danger small" />
                            </Col>

                            <Col md={6}>
                                <label className="form-label">Sub Category *</label>
                                <Field as="select" name="subCategory" className="form-select">
                                    <option value="">Select Subcategory</option>
                                    <option value="Carrier & Base Oils">Carrier & Base Oils</option>
                                    <option value="Essential Oils">Essential Oils</option>
                                    <option value="Fragrance Oils">Fragrance Oils</option>
                                    <option value="Massage Oils">Massage Oils</option>
                                    <option value="Gym Wipes">Gym Wipes</option>
                                    <option value="Dispensers">Dispensers</option>
                                </Field>
                                <ErrorMessage name="subCategory" component="div" className="text-danger small" />
                            </Col>

                            <Col md={6}>
                                <label className="form-label">Sort Order</label>
                                <Field
                                    name="sortOrder"
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g., 1"
                                />
                                <ErrorMessage name="sortOrder" component="div" className="text-danger small" />
                            </Col>

                            <Col md={12}>
                                <label className="form-label">
                                    {id ? "Change Image (optional)" : "Upload Category Image *"}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, setFieldValue)}
                                    className="form-control"
                                />
                                <ErrorMessage name="image" component="div" className="text-danger small" />
                                {preview && (
                                    <motion.img
                                        src={preview}
                                        alt="preview"
                                        className="mt-3 rounded shadow-sm"
                                        style={{
                                            width: "100%",
                                            maxHeight: "250px",
                                            objectFit: "cover",
                                        }}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
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

                            <Col md={12} className="text-center">
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Button type="submit" variant="success" className="px-5 py-2 fw-bold">
                                        <CloudUpload className="me-2" />
                                        {id ? "Update Category" : "Upload Category"}
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

export default TopCategoryForm;
