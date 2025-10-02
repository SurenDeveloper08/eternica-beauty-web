// FeatureCard.js
import React from 'react';
import { motion } from "framer-motion";
import './FeatureCard.css';

const FeatureCard = ({ features }) => {
    return (
           <div className="feature-grid">
                {features && features.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="col-6 col-md-4"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div key={item.id} className="feature-card text-center">
                            <div className="feature-img-wrapper mb-2">
                                <motion.img
                                    src={item.image}
                                    alt={item.title}
                                    className="feature-image img-fluid"
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                />
                            </div>
                            <h6 className="feature-title">{item.title}</h6>
                        </div>
                    </motion.div>
                ))}
            </div>
         );
};

export default FeatureCard;
