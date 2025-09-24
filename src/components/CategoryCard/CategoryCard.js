// CategoryCard.js
import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ image, title, description }) => {
  return (
    <div className="category-card">
      <img src={image} alt={title} className="category-image" />
      <div className="category-content">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
