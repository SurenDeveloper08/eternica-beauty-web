import React from "react";
import { useNavigate } from "react-router-dom";
import Empty from '../../assets/empty.png';
import { motion } from "framer-motion";
import "./ProductCard.css";
const ProductCard = ({ image, name, slug }) => {
    const navigate = useNavigate();
    const handleImageError = (e) => {
        e.target.src = Empty;
    };
    return (
        <motion.div
            className="product-card text-center p-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // onClick={() => navigate(`/category/subCategory/${slug}`)}
            onClick={() => navigate(`/product`)}
        >
            <div className="product-img-wrapper mb-2">
                <img
                    src={image || Empty} alt={name}
                    className="img-fluid product-image"
                    onError={handleImageError}
                />
            </div>
            <h6 className="product-name">{name}</h6>
            <button className="btn btn-sm mt-2" style={{ background: '#4C348C', color: '#FFFFFF' }}>Add to Cart</button>
        </motion.div>
    );
};

export default ProductCard;
