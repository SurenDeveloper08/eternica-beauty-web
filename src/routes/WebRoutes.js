import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import ProductListing from '../pages/ProductListing/ProductListing';
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton';

const WebsiteRoutes = () => {

    return (
        <>
            <Header />
            <Routes>
                {/* Home page */}
                <Route index element={<Home />} />
                <Route path=":category" element={<ProductListing />} />
            </Routes>
            <Footer />
            <WhatsAppButton />
        </>
    );
};
export default WebsiteRoutes;
