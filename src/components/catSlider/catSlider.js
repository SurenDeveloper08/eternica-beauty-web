import React, { useEffect, useState } from "react";
import axios from "axios";
import './catSlider.css'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import Slider from "react-slick";
import img1 from '../../assets/Almond_Oil.png'
import dispenser from '../../assets/Dispenser.png'
import gymwipes from '../../assets/gymwipes.png'
import img2 from '../../assets/sunflowr_oil.png'
import img3 from '../../assets/essential_oil.png'
import img4 from '../../assets/massage_oil.png'

const CatSlider = ({ title, categories=[] }) => {
   
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">{title}</h4>
            </div>
            <div className="row g-4 justify-content-center">
                {categories && categories.map((cat) => (
                    <motion.div
                        key={cat._id}
                        className="col-6 col-md-4 col-lg-2 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: cat.index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link className="category-card text-center" to={`/${cat?.category?.slug}/${cat?.slug}`} style={{ textDecoration: "none" }}>
                            <div className="category-img-wrapper mx-auto mb-3">
                                <img src={cat.image} alt={cat.name} className="category-img" />
                            </div>
                            <h6 className="category-title">{cat.name}</h6>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </>
    )
}

export default CatSlider
