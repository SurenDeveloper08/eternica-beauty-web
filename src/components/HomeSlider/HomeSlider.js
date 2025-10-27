import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import Slider from '../Slider/Slider';
import './HomeSlider.css'
import Oil from '../../assets/Banner/OILS_BANNER.png'
import Wipes from '../../assets/Banner/WIPPES_BANNER.png'

const HomeSlider = ({ sliders }) => {

    return (
        <Slider autoPlay showButtons={true} showDots={true} interval={4000} >
            {sliders && sliders.map((item, i) => (
                <div className="slide" key={i}>
                    <img src={item.image} alt={item.name || `slide-${i}`} />
                    {item.title && <h3 className="slide-title">{item.title}</h3>}
                    {item.link && (
                        <Link
                            to={item.link}
                            className={`shop-btn ${item.position || "left"}`}
                        >
                            {item.cta}
                        </Link>
                    )}
                </div>
            ))}
        </Slider>
    );

}

export default HomeSlider



