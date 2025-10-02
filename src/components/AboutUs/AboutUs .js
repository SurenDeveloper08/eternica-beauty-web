import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../../assets/about/aboutus.png";
import './AboutUs.css'
const AboutUs = () => {
    return (
        <>
            <div className="row align-items-center gx-4">
                {/* Text Column */}
                <div className="col-md-6">
                    <motion.div
                        className="ms-md-2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="text-muted d-inline-block mb-2"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Our Story
                        </motion.span>

                        <motion.h2
                            id="aboutus-heading"
                            className="display-5 fw-bold mb-3"
                            style={{ color: "#4C348C" }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            About Us – Eternica Beauty
                        </motion.h2>

                        <motion.p
                            className="lead"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            At Eternica Beauty, we are proud to bring premium Doyen products and a wide range of pure oils to customers across the UAE and Middle East. Our collection includes biodegradable gym wipes, antibacterial gym wipes, and Doyen dispensers, along with carefully sourced carrier oils, essential oils, fragrance oils, and massage oils. With a strong commitment to purity, sustainability, and quality, we aim to enhance everyday wellness while delivering the best value to our customers. Whether for fitness, beauty, or relaxation, Eternica Beauty is your trusted partner for authentic, eco-conscious, and affordable products backed by fast delivery and excellent customer support.
                        </motion.p>

                        {/* <motion.p
                            className="lead mb-0"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            Our mission is to bring luxurious self-care experiences to every
                            home, combining tradition with modern wellness trends.
                        </motion.p> */}
                    </motion.div>
                </div>

                {/* Image Column */}
                <div className="col-md-5 offset-md-1">
                    <motion.div
                        className="ms-md-2 ms-lg-5"
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            className="img-fluid"
                            src={aboutImg}
                            alt="massage oils in uae"
                        />
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
