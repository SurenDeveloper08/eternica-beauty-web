import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/thank-you");
    };

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-5 text-center" style={{ color: "#4C348C" }}>
                Checkout
            </h2>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className="p-4"
                    >
                        <h5 className="mb-4">Billing Details</h5>

                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ borderColor: "#4C348C" }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{ borderColor: "#4C348C" }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                style={{ borderColor: "#4C348C" }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <textarea
                                className="form-control"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                rows={3}
                                style={{ borderColor: "#4C348C", resize: "none" }}
                                placeholder="Enter your full address"
                            ></textarea>
                        </div>


                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn text-white fw-bold w-100 mt-3"
                            style={{
                                background: "#4C348C",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "none",
                            }}
                        >
                            Place Order
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
