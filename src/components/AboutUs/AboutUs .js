import React from "react";
import { motion } from "framer-motion";
import wipesImg from "../../assets/green_gymwipes.jpg";
import dispenserImg from "../../assets/dispenser.jpg";
import oilsImg from "../../assets/dispenser.jpg";
import fragranceImg from "../../assets/dispenser.jpg";
import wipesBlack from "../../assets/black_gymwipes.jpg";
import ProductShowcase from "../ProductShowcase/ProductShowcase";
import './AboutUs.css'
const AboutUs = () => {
    return (
        <div className="container py-5">
            <div className="row align-items-center gx-4">
                {/* Text Column */}
                <div className="col-md-12">
                    <motion.div
                        className="ms-md-2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* <motion.span
                            className="text-muted d-inline-block text-center mb-2"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Our Story
                        </motion.span> */}

                        <motion.h2
                            id="aboutus-heading"
                            className="display-5 fw-bold text-center mb-3"
                            style={{ color: "#4C348C" }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            About Us – Eternica Beauty
                        </motion.h2>

                        <motion.p
                            className="lead text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            Eternica Beauty is a wellness and hygiene brand serving the UAE and Middle East with a premium range of products designed to keep life fresh, clean, and balanced. From biodegradable and antibacterial wipes to stylish dispensers and a full collection of essential, carrier, fragrance, and massage oils, our mission is to combine hygiene, sustainability, and wellbeing in every product. With a focus on quality, purity, and modern convenience, Eternica helps create cleaner spaces, healthier routines, and a more eco-conscious lifestyle.
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
                    {/* <motion.div
            className="ms-md-2 ms-lg-5"
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              className="img-fluid rounded-3 shadow-lg"
              src="https://freefrontend.dev/assets/square.png"
              alt="About Eternica Beauty"
            />
          </motion.div> */}
                    {/* <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="masonry-gallery"
                    >
                        {[wipesImg, dispenserImg, wipesImg, oilsImg, fragranceImg].map(
                            (img, idx) => (
                                <motion.div
                                    key={idx}
                                    className="masonry-item mb-3"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={img}
                                        alt={`Gallery ${idx}`}
                                        className="img-fluid rounded-4 shadow-sm w-100"
                                    />
                                </motion.div>
                            )
                        )}
                    </motion.div> */}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
