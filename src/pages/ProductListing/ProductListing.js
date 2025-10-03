
import React from 'react';
import ProductCard from '../../components/PrductCard/ProductCard';
import './ProductListing.css';
import Banner from '../../assets/banner.png'
import Oil from '../../assets/oil.png'
import wipes1 from '../../assets/black.png'
import wipes2 from '../../assets/blue.png'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
const products = [
  { id: 1, name: 'Lavender Oil', image: Oil },
  { id: 2, name: 'Coconut Oil', image: wipes1 },
  { id: 3, name: 'Rose Oil', image: 'https://example.com/rose.jpg' },
  { id: 4, name: 'Peppermint Oil', image: wipes2 },
  { id: 5, name: 'Jojoba Oil', image: 'https://example.com/jojoba.jpg' },
  { id: 3, name: 'Rose Oil', image: 'https://example.com/rose.jpg' },
  { id: 4, name: 'Peppermint Oil', image: wipes2 },
  { id: 5, name: 'Jojoba Oil', image: Oil },
];

const ProductListing = () => {
  return (
    <div className="product-listing-page">
      <div className="banner-section">
        <div className="banner-content text-center">
          <h2 className="page-title">Essential Oils</h2>
          <p className="page-description">
            Discover our range of 100% pure essential oils, perfect for aromatherapy,
            massage, and wellness.
          </p>
        </div>
        {/* <img
          src={Banner}
          alt="Essential Oils Banner"
          className="banner-image"
        /> */}
      </div>

      <div className="container my-5">
        <Breadcrumbs />
        <div className="product-grid">
          {products && products.map((product) => (
            <ProductCard key={product.id} image={product.image} name={product.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
