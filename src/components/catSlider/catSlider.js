import React, { useEffect, useState } from "react";
import axios from "axios";
import './catSlider.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Slider from "react-slick";

const CatSlider = ({title, category}) => {
    console.log(category);
    //const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    // const handleCategoryClick = (cat, sub) => {
    //     navigate(`/${country}/${cat}/${sub}`);
    // };
    // Fetch or load menu
    // useEffect(() => {
    //     const fetchMenus = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/topcat/getall`);
    //             if (response && response.data) {
    //                 setCategory(response.data.data);
    //             } else {
    //                 console.error("No data received from API");
    //             }
    //         } catch (error) {
    //             console.error("Failed to load menus:", error.message || error);
    //         }
    //     };

    //     fetchMenus();
    // }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,       // Desktop: 6 items in a row
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,   // Laptop/tablet
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,    // Mobile
                settings: {
                    slidesToShow: 2.5, // two columns visible
                    slidesToScroll: 1,
                    rows: 2,          // exactly 2 rows
                    infinite: false,
                }
            }
        ]
    };

    return (
        <div className="container-area">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold">{title}</h4>
                </div>
                <Slider {...settings} className="category-slider">
                    {category && category.map((cat, idx) => (
                        <div className="category-item text-center"
                            // onClick={() => handleCategoryClick(cat.category, cat.subCategory)} 
                            key={cat.id} >
                            <div className="category-img-wrapper">
                                <img src={cat.imageUrl} alt={cat.name} />
                            </div>
                            <p className="font-weight-bold mb-0">{cat.name}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default CatSlider
