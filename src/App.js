// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/montserrat"
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductListing from './pages/ProductListing/ProductListing';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import ContactUs from './pages/ContactUs/ContactUs';
import AboutUs from './components/AboutUs/AboutUs';
import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route, HashRouter } from "react-router-dom";
import WebRoutes from './routes/WebRoutes';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <ScrollToTop />
        <Header />
        {/* <Routes >
        <Route path="/*" element={<WebRoutes />} />
      </Routes> */}
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<ProductListing />} />
          <Route path="/:category/:subCategory" element={<ProductListing />} />
          <Route path="/:category/:subCategory/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
