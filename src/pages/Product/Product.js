import React, { useState } from "react";
import "./Product.css";
import wipes1 from '../../assets/black.png'
import wipes2 from '../../assets/blue.png'
import ImageZoom from "../../components/ImageZoom/ImageZoom";
import Oil from '../../assets/oil.png'
import ProductDetailsTabs from "../../components/ProductDetailsTabs/ProductDetailsTabs";
import HomeProducts from "../../components/HomeProducts/HomeProducts";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
const product = {
    id: "p1",
    name: "Gym Wipes",
    description:
        "Eternica Gym Wipes are biodegradable, antibacterial, and designed for quick and hygienic cleaning of gym equipment. Gentle on hands, tough on germs, and safe for the environment.",
    currency: "AED",
    price: 49.99,
    images: [
        wipes1,
        wipes2,
    ],
};

const relatedProducts = [
    {
        _id: "p1",
        productName: "Herbal Massage Oil 250ml",
        slug: "herbal-massage-oil-250ml",
        brand: "NatureCare",
        category: "massage-oils",
        subCategory: "herbal-oils",
        country: "uae",
        price: 45,
        productCurrency: "AED",
        stock: 12,
        image: Oil,
    },
    {
        _id: "p2",
        productName: "Luxury Spa Towel Pack",
        slug: "luxury-spa-towel-pack",
        brand: "SpaComfort",
        category: "spa-accessories",
        subCategory: "towels",
        country: "uae",
        price: 120,
        productCurrency: "AED",
        stock: 5,
        image: Oil,
    },
    {
        _id: "p3",
        productName: "Electric Aroma Diffuser",
        slug: "electric-aroma-diffuser",
        brand: "RelaxTech",
        category: "diffusers",
        subCategory: "electric",
        country: "uae",
        price: 99,
        productCurrency: "AED",
        stock: 0, // out of stock
        image: Oil,
    },
    {
        _id: "p3",
        productName: "Electric Aroma Diffuser",
        slug: "electric-aroma-diffuser",
        brand: "RelaxTech",
        category: "diffusers",
        subCategory: "electric",
        country: "uae",
        price: 99,
        productCurrency: "AED",
        stock: 0, // out of stock
        image: Oil,
    },
    {
        _id: "p3",
        productName: "Electric Aroma Diffuser",
        slug: "electric-aroma-diffuser",
        brand: "RelaxTech",
        category: "diffusers",
        subCategory: "electric",
        country: "uae",
        price: 99,
        productCurrency: "AED",
        stock: 0, // out of stock
        image: Oil,
    },
    {
        _id: "p3",
        productName: "Electric Aroma Diffuser",
        slug: "electric-aroma-diffuser",
        brand: "RelaxTech",
        category: "diffusers",
        subCategory: "electric",
        country: "uae",
        price: 99,
        productCurrency: "AED",
        stock: 0, // out of stock
        image: Oil,
    },
];
const Product = () => {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <div className="container">
            <Breadcrumbs/>
            <div className="product-page container">
                {/* Left: Gallery */}
                <div className="gallery-section">
                    <div className="main-image-wrapper">
                        {/* <img
                        key={selectedImage}
                        src={selectedImage}
                        alt={product.name}
                        className="main-image fade-in"
                    /> */}
                        <ImageZoom src={selectedImage} alt={product.name} />
                    </div>

                    <div className="thumbs-wrapper">
                        {product.images.map((img, i) => (
                            <div
                                key={i}
                                className={`thumb ${selectedImage === img ? "active" : ""}`}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img src={img} alt={`thumb-${i}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="info-section">
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-desc">{product.description}</p>

                    <div className="product-price">
                        <span>{product.currency} {product.price}</span>
                    </div>

                    <button className="add-cart-btn">Add to Cart</button>
                </div>
            </div>
            <ProductDetailsTabs
                description="This massage oil is made with 100% pure essential oils, crafted to relax your body and calm your mind."
                specifications={[
                    { label: "Volume", value: "500ml" },
                    { label: "Ingredients", value: "Lavender, Jojoba, Vitamin E" },
                    { label: "Made In", value: "UAE" },
                ]}
            />
            <section className='container'>
                <HomeProducts title={'Customer Favorites'} products={relatedProducts} />
            </section>
        </div>
    );
}

export default Product