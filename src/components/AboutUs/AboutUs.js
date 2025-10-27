import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getAdminPage } from "../../redux/actions/pageActions";
import Meta from "../../utils/Meta";
import './AboutUs.css'
const AboutUs = () => {
    const dispatch = useDispatch();
    const { page: about, error, loading } = useSelector(state => state.pageState);

    useEffect(() => {
        dispatch(getAdminPage('about'));
    }, [dispatch]);
    return (
        <>
            {about &&
                < div className="container py-5">
                    <div className="row align-items-center gx-4">
                        <div className="col-md-6">
                            <motion.div
                                className="ms-md-2"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.h5
                                    className="text-muted d-inline-block mb-2"
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    About Us
                                </motion.h5>

                                <motion.h2
                                    id="aboutus-heading"
                                    className="display-5 fw-bold mb-3"
                                    style={{ color: "#4C348C" }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    {about.title}
                                </motion.h2>

                                <motion.p
                                    className="lead"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.8 }}
                                >
                                    {about.description}  </motion.p>


                            </motion.div>
                        </div>

                        <div className="col-md-6">
                            <motion.div
                                className="ms-md-2 ms-lg-5"
                                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <img
                                    className="img-fluid"
                                    src={about.image}
                                    alt="massage oils in uae"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AboutUs;
