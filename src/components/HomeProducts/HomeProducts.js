import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../PrductCard/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeProducts = ({ title, products }) => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: 1200,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 992,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 576,
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
                <Slider {...settings} slidesToShow={window.innerWidth >= 1600 ? 5 : 4}>
                    {products &&
                        products.map((product, i) => (
                            <div key={i} className="px-2">
                                <ProductCard
                                    image={product?.image}
                                    name={product?.productName}
                                    category={product?.category}
                                    subCategory={product?.subCategory}
                                    slug={product?.slug}
                                    product={product}
                                />
                            </div>
                        ))}
                </Slider>
            </div>
        </>
    );
};

export default HomeProducts;
