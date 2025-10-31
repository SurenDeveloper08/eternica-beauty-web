import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "./Product.css";

import ImageZoom from "../../components/ImageZoom/ImageZoom";
import HomeProducts from "../../components/HomeProducts/HomeProducts";
import ProductDetailsTabs from "../../components/ProductDetailsTabs/ProductDetailsTabs";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { getProduct, getActiveRelatedProducts } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/slices/cartSlice";
import Meta from "../../utils/Meta";
import Loader from "../../components/Loader/Loader";
const countryNames = {
    AE: "United Arab Emirates",
    SA: "Saudi Arabia",
    KW: "Kuwait",
    QA: "Qatar",
    BH: "Bahrain",
    OM: "Oman",
};

const Product = ({ countryCode = "AE" }) => {

    const { category: categoryId, subCategory: subCategoryId, slug: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product, loading, error } = useSelector((state) => state.productState);
    const { products } = useSelector((state) => state.productsState);
    const { cartItems } = useSelector((state) => state.cartState);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (productId) dispatch(getProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        dispatch(getActiveRelatedProducts(categoryId, subCategoryId, productId));
    }, [dispatch, product]);

    // Safe initialization once product is loaded
    useEffect(() => {
        if (product?.images?.length > 0) {
            setSelectedImage(product.images[0].image);
        }
    }, [product]);

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
        toast.success("Added to cart!", {
            id: `main-cart-${product._id}`, // unique per product in main section
        });
    };

    if (loading)
        return (
            <Loader />
        );

    if (error)
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <h4>Error loading product</h4>
                <p>{error}</p>
            </div>
        );

    if (!product) return null;

    return (
        <>
            <Meta
                title={product?.seo?.metaTitle || product?.productName}
                description={product?.seo?.metaDescription || product?.description}
                keywords={product?.seo?.metaKeywords || product?.productName}
                canonical={product?.seo?.canonicalUrl}
            />
            <div className="container">
                <Breadcrumbs />

                <div className="product-page">
                    {/* Gallery Section (Left) */}
                    {product.images?.length > 0 && (
                        <div className="gallery-section">
                            <div className="main-image-wrapper">
                                <ImageZoom
                                    src={selectedImage || product.images[0].image}
                                    alt={product.productName}
                                />
                            </div>

                            <div className="thumbs-wrapper">
                                {product.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`thumb ${selectedImage === img.image ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(img.image)}
                                    >
                                        <img src={img.image} alt={`thumb-${i}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Info Section (Right) */}
                    <div className="info-section">
                        {product?.brand && (
                            <p className="product-brand">by {product.brand}</p>
                        )}
                        <h2 className="product-title">{product.productName}</h2>
                        <p className="product-desc">{product.description}</p>

                        {Number(product?.price) > 0 && (
                            <div className="product-price">
                                <span>{product.currency || "AED"} {product.price}</span>
                            </div>
                        )}
                        <button className="add-cart-btn" onClick={(e) => handleAddToCart(e)}>Add to Cart</button>
                    </div>
                </div>
                <ProductDetailsTabs
                    name={product.productName}
                    countryNames={countryNames}
                    countryCode={countryCode}
                    cities={product.cities}
                    features={product.features}
                    specifications={product.specifications}
                    whyChoose={product.whyChoose}
                    careInstructions={product.careInstructions}
                />
                {/* Related Products */}
                <section className="pb-5">
                    <HomeProducts title="Related Products" products={products} />
                </section>
            </div>
        </>
    );
};

export default Product;
