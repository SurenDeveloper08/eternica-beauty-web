import React from "react";
import Empty from '../../assets/empty.png'
import "./ProductCard.css";
const ProductCard = ({ image, name }) => {
    
    const handleImageError = (e) => {
        e.target.src = Empty;
    };
    return (
        <div className="product-card text-center p-2">
            <div className="product-img-wrapper mb-2">
                <img
                    src={image || Empty} alt={name}
                    className="img-fluid product-image"
                    onError={handleImageError}
                />
            </div>
            <h6 className="product-name">{name}</h6>
            <button className="btn btn-sm mt-2" style={{ background: '#4C348C', color: '#FFFFFF' }}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
