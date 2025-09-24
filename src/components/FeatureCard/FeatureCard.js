// FeatureCard.js
import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ features }) => {
    return (
        <div className="container my-5">
            <div className="feature-grid">
                {features && features.map((item, index) => (
                    <div key={item.id} className="feature-card text-center">
                        <div className="feature-img-wrapper mb-2">
                            <img src={item.image} alt={item.title} className="feature-image" />
                        </div>
                        <h6 className="feature-title">{item.title}</h6>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureCard;
