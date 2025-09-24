// MasonrySection.js
import React from 'react';
import './MasonrySection.css';

const MasonrySection = ({ title, categories }) => {
    return (
        <div className="masonry-section container my-5">
            <h3 className="fw-bold text-center mb-4">{title}</h3>
            <div className="masonry-grid">
                {categories && categories.map((item, index) => (
                    <div key={index} className="masonry-card">
                        <img src={item.image} alt={item.title} className="masonry-image" />
                        <div className="masonry-content">
                            <h5>{item.title}</h5>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasonrySection;
