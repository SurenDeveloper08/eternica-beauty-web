import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import ProductListing from '../pages/ProductListing/ProductListing';
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton';
import Product from '../pages/Product/Product';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import ThankYouPage from '../components/ThankYouPage/ThankYouPage';
import ContactUs from '../pages/ContactUs/ContactUs';
import AboutUs from '../components/AboutUs/AboutUs';

const WebsiteRoutes = () => {

    return (
        <>
            <Header />
            <Routes>
                {/* Home page */}
                <Route path="eternica-beauty-web" element={<Home />} />
                <Route path="category" element={<ProductListing />} />
                <Route path="category/subCategory" element={<ProductListing />} />
                <Route path="product" element={<Product />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="thank-you" element={<ThankYouPage />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="about" element={<AboutUs />} />
            </Routes>
            <Footer />
            <WhatsAppButton />
        </>
    );
};
export default WebsiteRoutes;
