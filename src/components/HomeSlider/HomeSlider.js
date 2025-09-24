import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import './HomeSlider.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from '../../assets/Banner/skincare.png'
import { Button } from "@mui/material";

const HomeSlider = () => {
    //   const [banners, setBanners] = useState(null);

    //   useEffect(() => {
    //     const fetchBanners = async () => {
    //       try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/banners/getall`);
    //         setBanners(res.data.data);
    //       } catch (error) {
    //         console.error("Failed to fetch banners:", error);
    //       }
    //     };

    //     fetchBanners();
    //   }, []);
    const banners = [
        {
            name: "Summer Sale",
            imageUrl: img,
            link: "/sale",
            startDate: "2025-09-01",
            endDate: "2025-09-30",
            cta: "Buy Oils"
        }
    ];


    const sliderRows = banners?.length > 1 ? 1 : 1;
    var settings = {
        dots: false,
        infinite: banners?.length > 1,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000, // 3 seconds
        pauseOnHover: true,
        rows: sliderRows,
    };


    return (
        <Slider {...settings}  >
            {banners && banners.map((banner, index) => (
                <div key={banner.name} className="slide-wrapper">
                    <img src={banner.imageUrl} alt={banner.name} className='w-100' />
                    <div className="slide-button">
                        <Button
                            variant="contained"
                            href={banner.link}
                            sx={{
                                bgcolor: "#4C348C",
                                "&:hover": { bgcolor: "#3a276e" },
                                fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" }, // responsive text
                                padding: { xs: "2px 6px", sm: "8px 16px", md: "10px 20px" }, // responsive padding
                                textTransform: "none", // optional: keep text as-is
                            }}
                        >
                            {banner.cta}
                        </Button>

                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default HomeSlider



