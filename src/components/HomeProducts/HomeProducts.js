import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../PrductCard/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeProducts = ({ title, products }) => {
    const sliderRef = useRef(null); 

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
          responsive: [
            {
                breakpoint: 1200, // large
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 992, // tablet landscape
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 576, // mobile
                settings: { slidesToShow: 1 },
            },
        ],
       
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">{title}</h4>
               
            </div>

            <div className="mt-4">
                <Slider {...settings}>
                    {products &&
                        products.map((product, i) => (
                            <div key={i} className="p-2">
                                <ProductCard
                                    image={product?.image}
                                    name={product?.productName}
                                />
                            </div>
                        ))}
                </Slider>
            </div>
        </>
    );
};

export default HomeProducts;
