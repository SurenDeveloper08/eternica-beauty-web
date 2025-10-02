import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import './HomeSlider.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Oil from '../../assets/Banner/OILS_BANNER.png'
import Wipes from '../../assets/Banner/WIPPES_BANNER.png'
import { Button } from "@mui/material";

const HomeSlider = () => {
  
    const banners = [
        {
            name: "Massage Oils",
            imageUrl: Oil,
            link: "/massage-oil",
            startDate: "2025-09-01",
            endDate: "2025-09-30",
            cta: "Buy Oils"
        },
        {
            name: "Gym Wipes",
            imageUrl: Wipes,
            link: "/gym-wipes",
            startDate: "2025-09-01",
            endDate: "2025-09-30",
            cta: "Buy Wipes"
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
        autoplaySpeed: 4000,
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
                                bgcolor: "#000",
                                borderRadius:"0.325rem",
                                "&:hover": { bgcolor: "#3a276e" },
                                fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
                                padding: { xs: "2px 6px", sm: "8px 16px", md: "10px 20px" },
                                textTransform: "none", 
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



