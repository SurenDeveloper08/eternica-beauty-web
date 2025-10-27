import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Empty from '../../assets/empty.png';
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { addToCart } from "../../redux/slices/cartSlice";
import "./ProductCard.css";
const ProductCard = ({ image, name, category, subCategory, slug, product, show = false }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cartState);

    const handleImageError = (e) => {
        e.target.src = Empty;
    };

    const handleAddToCart = (event) => {
        const isAlreadyInCart = cartItems.some((item) => item._id === product._id);

        if (isAlreadyInCart) {
            navigate("/cart");
            return;
        }

        dispatch(
            addToCart({
                _id: product._id,
                productName: product.productName,
                price: product.price,
                qty: 1,
                image: product.image || "",
                currency: product.currency || "AED",
                slug: product.slug,
                category: product.category,        
                subCategory: product.subCategory,  
            })
        );
        toast.dismiss();
        toast.success("added successfully!", { id: `cart-cart-success-${slug}` });
    };
    return (
        <motion.div
            className="product-card text-center p-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link to={`/${category}${subCategory ? `/${subCategory}` : ''}/${slug}`}>
                <div className="product-img-wrapper mb-2">
                    <img
                        src={image || Empty} alt={name}
                        className="img-fluid product-image"
                        onError={handleImageError}
                    />
                </div>
            </Link>
            <h6 className="product-name">{name}</h6>
            <button className="btn btn-sm mt-2" style={{ background: '#4C348C', color: '#FFFFFF' }} onClick={(e) => handleAddToCart(e)}>Add to Cart</button>
        </motion.div>

    );
};

export default ProductCard;
