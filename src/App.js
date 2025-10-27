import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/montserrat";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";

import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import FeatureCard from './components/FeatureCard/FeatureCard.js';
import useTokenExpiryCheck from './useTokenExpiryCheck.js';
import { Toaster } from "react-hot-toast";
// Website Layout
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductListing from './pages/ProductListing/ProductListing';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import ContactUs from './pages/ContactUs/ContactUs';
import AboutUs from './pages/AboutUs/AboutUs.js';

//images
import PureOil from './assets/Feature/water.png'
import BestPrice from './assets/Feature/sale.png'
import Shipping from './assets/Feature/delivery.png'
import Support from './assets/Feature/customer-support.png'

// Admin Layout + Pages
import AdminLayout from './components/AdminLayout/AdminLayout';
import Dahboard from './pages/Admin/DashboardPage/DashboardPage';
import Order from './pages/Admin/Order/Order';
import ProductList from './pages/Admin/ProductList.js/ProductList';
import CategoryList from './pages/Admin/CategoryList/CategoryList';
import SliderList from './pages/Admin/SliderList/SliderList.js';
import TopCategoryList from './pages/Admin/TopCategoryList/TopCategoryList.js';
import ProductHighlights from './pages/Admin/ProductHighlights/ProductHighlights.js';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin.js';
import ProductForm from './pages/Admin/Form/ProductForm/ProductForm .js';
import CategoryForm from './pages/Admin/Form/CategoryForm/CategoryForm.js';
import SubCategoryForm from './pages/Admin/Form/SubCategoryForm/SubCategoryForm.js';
import SliderForm from './pages/Admin/Form/SliderForm/SliderForm.js';
import TopCategoryForm from './pages/Admin/Form/TopCategoryForm/TopCategoryForm.js';
import TrendingProductForm from './pages/Admin/Form/ProductHighlightsForm/ProductHighlightsForm.js';
import BlogList from './pages/Admin/BlogList/BlogList.js';
import BlogForm from './pages/Admin/Form/BlogForm/BlogForm.js';
import AboutForm from './pages/Admin/Form/AboutForm/AboutForm.js';
import HomeForm from './pages/Admin/Form/HomeForm/HomeForm.js';
import ProtectedRoute from './components/route/ProtectedRoute.js';
import store from './store';
import { loadUser } from './redux/actions/userActions.js';
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

const features = [
  {
    id: 1,
    title: 'Premium Quality',
    image: PureOil,
  },
  {
    id: 2,
    title: 'Best Price',
    image: BestPrice,
  },
  {
    id: 3,
    title: 'Fast Delivery',
    image: Shipping,
  },
  {
    id: 4,
    title: 'Customer Support',
    image: Support,
  },
];
function App() {
  const { loading } = useSelector(state => state.authState)
  const token = localStorage.getItem("afcc8908");

  useEffect(() => {
    store.dispatch(loadUser(token))
  }, [token])

  // useTokenExpiryCheck();
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Loading...
      </div>
    );
  }
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Toaster
            containerStyle={{
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)", // centers horizontally
              maxWidth: "90%", // responsive width
              width: "auto",
              position: "fixed",
              zIndex: 9999,
            }}
          />

          <ScrollToTop />
          <Routes>
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:category" element={<ProductListing />} />
                    <Route path="/:category/:subCategory" element={<ProductListing />} />
                    <Route path="/:category/:subCategory/:slug" element={<Product />} />
                    <Route path="/:category" element={<ProductListing />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/about" element={<AboutUs />} />
                  </Routes>
                  <section style={{ background: "rgb(145, 123, 205)" }}>
                    <FeatureCard features={features} />
                  </section>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />

            {/* Admin Section */}
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<ProtectedRoute isAdmin={true}><AdminLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dahboard />} />
              <Route path="orders" element={<Order />} />
              <Route path="products" element={<ProductList />} />
              <Route path="product/add" element={<ProductForm />} />
              <Route path="product/:id" element={<ProductForm />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="category/add" element={<CategoryForm />} />
              <Route path="category/:id" element={<CategoryForm />} />
              <Route path="subcategory/add" element={<SubCategoryForm />} />
              <Route path="subcategory/:cid/:scid" element={<SubCategoryForm />} />
              <Route path="slider" element={<SliderList />} />
              <Route path="slider/add" element={<SliderForm />} />
              <Route path="slider/:id" element={<SliderForm />} />
              <Route path="topcat" element={<TopCategoryList />} />
              <Route path="topcat/add" element={<TopCategoryForm />} />
              <Route path="topcat/:id" element={<TopCategoryForm />} />
              <Route path="highlights" element={<ProductHighlights />} />
              <Route path="highlights/add" element={<TrendingProductForm />} />
              <Route path="highlights/:id" element={<TrendingProductForm />} />
              <Route path="blogs" element={<BlogList />} />
              <Route path="blog/add" element={<BlogForm />} />
              <Route path="blog/:id" element={<BlogForm />} />
              <Route path="page/:page" element={<AboutForm />} />
              <Route path="home" element={<HomeForm />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
