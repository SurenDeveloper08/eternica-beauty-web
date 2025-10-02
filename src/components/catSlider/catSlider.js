import React, { useEffect, useState } from "react";
import axios from "axios";
import './catSlider.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import Slider from "react-slick";
import img1 from '../../assets/Almond_Oil.png'
import dispenser from '../../assets/Dispenser.png'
import gymwipes from '../../assets/gymwipes.png'
import img2 from '../../assets/sunflowr_oil.png'
import img3 from '../../assets/essential_oil.png'
import img4 from '../../assets/massage_oil.png'
const CatSlider = ({ title, category }) => {
    console.log(category);

    const categories = [
        {
            id: 1,
            title: "Carrier & Base Oils",
            link: "/Carrier-oils",
            image: img1,
        },
        {
            id: 2,
            title: "Essential Oils",
            link: "/essential-oils",
            image: img2,
        },
        {
            id: 3,
            title: "Fragrance Oils",
            link: "/fragrance-oils",
            image: img3,
        },
        {
            id: 4,
            title: "Massage Oils",
            link: "/massage-oils",
            image: img4,
        },
        {
            id: 5,
            title: "Gym Wipes",
            link: "/gym-oils",
            image: gymwipes,
        },
        {
            id: 6,
            title: "Dispensers",
            link: "/dispensers-oils",
            image: dispenser,
        },
    ];

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">{title}</h4>
            </div>
            <div className="row g-4 justify-content-center">
                {categories.map((cat) => (
                    <motion.div
                        key={cat.id}
                        className="col-6 col-md-4 col-lg-2 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: cat.index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <a className="category-card text-center" href={cat.link} style={{ textDecoration: "none" }}>
                            <div className="category-img-wrapper mx-auto mb-3">
                                <img src={cat.image} alt={cat.title} className="category-img" />
                            </div>
                            <h6 className="category-title">{cat.title}</h6>
                        </a>
                    </motion.div>
                ))}
            </div>
        </>
    )
}

export default CatSlider
