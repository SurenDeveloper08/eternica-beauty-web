import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Button, Col, Row } from "react-bootstrap";
import { CloudUpload } from "@mui/icons-material";
import toast, { Toaster } from 'react-hot-toast';
import { createNewSlider, updateSlider, getAdminSlider } from "../../../../redux/actions/sliderActions";
import { clearSliderUpdated, clearError, clearSliderCreated } from '../../../../redux/slices/sliderSlice';

const SliderForm = () => {
    const { id } = useParams();
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSliderCreated, isSliderUpdated, slider, error } = useSelector(state => state.sliderState);

    const [initialValues, setInitialValues] = useState({
        name: "",
        cta: "",
        link: "",
        position: "",
        image: null,
        sortOrder: 0,
        isActive: true,
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Slider title required"),
        cta: Yup.string().required("CTA required"),
        link: Yup.string().required("Link required"),
        position: Yup.string().required("Select position"),
        image: id && preview
            ? Yup.mixed().nullable()
            : Yup.mixed().required("Image is required"),
    });

    useEffect(() => {
        if (id) {
            dispatch(getAdminSlider(id))
        }
    }, [id])

    useEffect(() => {

        if (id && slider?._id === id) {
            setInitialValues({
                name: slider.name,
                cta: slider.cta,
                link: slider.link,
                position: slider.position,
                image: slider.image,
                sortOrder: slider.sortOrder,
                isActive: slider.isActive,
            });
            if (slider.image) {
                setPreview(slider.image);
            }
        }
    }, [slider]);

    useEffect(() => {
        if (isSliderCreated) {
            dispatch(clearSliderCreated());
            clearForm();
            toast.success("added successfully!");
            navigatePage();
        }

        if (isSliderUpdated) {
            dispatch(clearSliderUpdated());
            clearForm();
            toast.success("updated successfully!");
            navigatePage();
        }

        if (error) {
            dispatch(clearError());
            toast.error(`${error}`);

        }

    }, [isSliderCreated, isSliderUpdated, error, navigate, dispatch]);

    const clearForm = () => {
        setInitialValues({
            name: "",
            cta: "",
            link: "",
            position: "",
            image: null,
            sortOrder: 0,
        });
        setPreview(null);
    };

    const navigatePage = () => {
        setTimeout(() => {
            navigate("/admin/slider");
        }, 2500);
    }

    // Handle image preview change
    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFieldValue("image", file);
        }
    };

    // Handle form submission
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('cta', values.cta);
            formData.append('link', values.link);
            formData.append('position', values.position);
            formData.append('sortOrder', values.sortOrder);
            formData.append('isActive', values.isActive);
            formData.append('image', values.image);

            if (id) {
                dispatch(updateSlider(id, formData));
            } else {
                dispatch(createNewSlider(formData));
            }
        } catch (error) {
            console.error(error);
            toast.error("❌ Failed to save slider");
        }
    };

    return (
        <motion.div
            className="container py-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h4 className="fw-bold mb-4 text-center">
                {id ? "Edit Home Slider" : "Add Home Slider"}
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
                                <label className="form-label">Title *</label>
                                <Field
                                    name="name"
                                    className="form-control"
                                    placeholder="e.g., Massage Oils"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-danger small"
                                />
                            </Col>

                            <Col md={6}>
                                <label className="form-label">CTA Button Text *</label>
                                <Field
                                    name="cta"
                                    className="form-control"
                                    placeholder="e.g., Buy Now"
                                />
                                <ErrorMessage
                                    name="cta"
                                    component="div"
                                    className="text-danger small"
                                />
                            </Col>

                            <Col md={6}>
                                <label className="form-label">Redirect Link *</label>
                                <Field
                                    name="link"
                                    className="form-control"
                                    placeholder="https://yourwebsite.com"
                                />
                                <ErrorMessage
                                    name="link"
                                    component="div"
                                    className="text-danger small"
                                />
                            </Col>

                            <Col md={6}>
                                <label className="form-label">Text Position *</label>
                                <Field as="select" name="position" className="form-select">
                                    <option value="">Select position</option>
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                </Field>
                                <ErrorMessage
                                    name="position"
                                    component="div"
                                    className="text-danger small"
                                />
                            </Col>

                            <Col md={12}>
                                <label className="form-label">Upload Slider Image *</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={(e) => handleImageChange(e, setFieldValue)}
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="image"
                                    component="div"
                                    className="text-danger small"
                                />
                                {preview && (
                                    <motion.img
                                        src={preview}
                                        alt="Preview"
                                        className="rounded shadow mt-3"
                                        style={{
                                            width: "100%",
                                            maxHeight: "280px",
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
                            <Col md={12} className="text-center mt-3">
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        className="px-5 py-2 fw-bold"
                                    >
                                        <CloudUpload className="me-2" />
                                        {id ? "Update Slider" : "Upload Slider"}
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

export default SliderForm;
