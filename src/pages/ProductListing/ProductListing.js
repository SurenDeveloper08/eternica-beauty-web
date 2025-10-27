import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import ProductCard from '../../components/PrductCard/ProductCard';
import './ProductListing.css';
import Banner from '../../assets/banner.png'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { getActiveCategoryProducts } from '../../redux/actions/productActions'
import Meta from "../../utils/Meta";

const ProductListing = () => {
  const { category, subCategory } = useParams();
  const dispatch = useDispatch();
  const { products, meta, seo, loading, error } = useSelector((state) => state.productsState);

  useEffect(() => {
    dispatch(getActiveCategoryProducts(category, subCategory));
  }, [dispatch, category, subCategory]);


  return (
    <>
     <Meta
               title={seo?.metaTitle || meta?.category?.title}
                description={seo?.metaDescription || meta?.description}
                keywords={seo?.metaKeywords || meta?.category?.title}
                canonical={seo?.canonicalUrl}
            />
    <div className="product-listing-page">
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && products && products.length > 0 ? (
        <>
          <div className="banner-section">
            {meta && <div className="banner-content text-center">
              <h2 className="page-title">{meta?.title}</h2>
              <p className="page-description">
               {meta?.description}
              </p>
            </div>}
            <img
              src={Banner}
              alt="Essential Oils Banner"
              className="banner-image"
            />
          </div>

          <div className="container my-5">
            <Breadcrumbs />
            <div className="product-grid">
              {products && products.map((product) => (
                <ProductCard key={product._id} image={product.image} name={product.productName} category={product.category} subCategory={product.subCategory} slug={product.slug} product={product} />
              ))}
            </div>
          </div>
        </>
      ) : null}
      {!loading && !error && products && products.length === 0 && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
    </>
  );
};

export default ProductListing;
