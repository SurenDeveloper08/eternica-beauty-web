import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, Form as BootstrapForm } from "react-bootstrap";
import { createNewOrder } from '../../redux/actions/checkoutActions';
import { clearCheckoutState } from '../../redux/slices/checkoutSlice';
import { clearCart } from '../../redux/slices/cartSlice'
import Meta from "../../utils/Meta";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cartState);
    const { order, isOrderPlaced, loading, error } = useSelector(state => state.checkoutState)
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (isOrderPlaced) {
            dispatch(clearCheckoutState());
            dispatch(clearCart());
            navigate("/thank-you", { replace: true, state: { orderSuccess: true } });
        }

        if (error) {
            toast.error(error);
            dispatch(clearCheckoutState());
        }
    }, [isOrderPlaced, error, navigate, dispatch]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phone: Yup.string()
            .required("Phone number is required")
            .matches(
                /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/,
                "Please enter a valid phone number (e.g., 123-456-7890)"
            ),
        address: Yup.string().required("Required"),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        if (!cartItems.length) {
            toast.error("Your cart is empty!");
            return;
        }
        dispatch(createNewOrder({ cartItems, ...values }));
    };

    return (
        <>
            <Meta
                title={"Checkout - Eternica Beauty"}
                description={"Complete your shopping at Eternica Beauty with a fast, secure checkout. Get your items shipped across the UAE and Middle East."}
                keywords={"skincare, beauty, oils, wipes, dispensers"}
                canonical="https://eternicabeauty.com/contact"
            />
            <div className="container py-5">
                <h2 className="fw-bold mb-5 text-center" style={{ color: "#4C348C" }}>
                    Checkout
                </h2>
                {cartItems.length === 0 ? (
                    <div
                        className="container d-flex flex-column justify-content-center align-items-center text-center py-5"
                    >
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="p-4">
                                        <h5 className="mb-4">Billing Details</h5>

                                        <Row className="g-4">
                                            <Col md={12}>
                                                <BootstrapForm.Label>Full Name *</BootstrapForm.Label>
                                                <Field
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Enter your name"
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="text-danger small"
                                                />
                                            </Col>

                                            <Col md={12}>
                                                <BootstrapForm.Label>Email *</BootstrapForm.Label>
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="text-danger small"
                                                />
                                            </Col>

                                            <Col md={12}>
                                                <BootstrapForm.Label>Phone *</BootstrapForm.Label>
                                                <Field
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Enter your phone number"
                                                />
                                                <ErrorMessage
                                                    name="phone"
                                                    component="div"
                                                    className="text-danger small"
                                                />
                                            </Col>

                                            <Col md={12}>
                                                <BootstrapForm.Label>Address *</BootstrapForm.Label>
                                                <Field
                                                    name="address"
                                                    as="textarea"
                                                    rows={3}
                                                    className="form-control"
                                                    placeholder="Enter your address"
                                                />
                                                <ErrorMessage
                                                    name="address"
                                                    component="div"
                                                    className="text-danger small"
                                                />
                                            </Col>
                                        </Row>

                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            disabled={loading}
                                            className="btn text-white fw-bold w-100 mt-3"
                                            style={{
                                                background: "#4C348C",
                                                padding: "12px",
                                                borderRadius: "10px",
                                                border: "none",
                                            }}
                                        >
                                            {loading ? "Placing Order..." : "Place Order"}
                                        </motion.button>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Checkout;
