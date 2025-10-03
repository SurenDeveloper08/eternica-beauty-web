import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../PrductCard/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeProducts = ({ title, products }) => {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(4);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
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
        // capture live slidesToShow at runtime
        onReInit: () => {
            if (sliderRef.current) {
                setSlidesToShow(sliderRef.current.props.slidesToShow);
            }
        },
    };

    const totalSlides = products ? products.length : 0;

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">{title}</h4>
                <div className="d-flex">
                    <button
                        className="btn me-2"
                        onClick={() => sliderRef.current.slickPrev()}
                        disabled={currentSlide === 0}
                        style={{
                            backgroundColor: "#4C348C",
                            color: "#fff",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: currentSlide === 0 ? 0.5 : 1,
                            cursor: currentSlide === 0 ? "not-allowed" : "pointer",
                        }}
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        className="btn"
                        onClick={() => sliderRef.current.slickNext()}
                        disabled={currentSlide >= totalSlides - slidesToShow}
                        style={{
                            backgroundColor: "#4C348C",
                            color: "#fff",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: currentSlide >= totalSlides - slidesToShow ? 0.5 : 1,
                            cursor:
                                currentSlide >= totalSlides - slidesToShow
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <Slider ref={sliderRef} {...settings}>
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
