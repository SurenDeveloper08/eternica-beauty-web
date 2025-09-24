import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from '../../assets/LOGO.png'
const Footer = () => {
  return (
    // <footer className="footer-bs">
    //   <Container>
    //     <Row>
    //       {/* Column 1 - Logo + Description */}
    //       <Col md={3} sm={12} className="footer-brand">
    //         <img
    //           src={Logo}
    //           alt="Eternica Beauty Logo"
    //           className="footer-logo"
    //         />
    //         <p>
    //           Eternica offers premium massage oils, carrier oils, essential oils, and fragrance oils trusted by spas, wellness centers, and beauty professionals across the GCC and Middle East. Experience the highest quality oils for relaxation, therapy, and wellness.
    //         </p>
    //       </Col>

    //       {/* Column 2 - Products */}
    //       <Col md={3} sm={6} className="footer-nav">
    //         <h3>Products</h3>
    //         <ul>
    //           <li><a href="/products/spa">Carrier & Base Oils</a></li>
    //           <li><a href="/products/salon">Essential Oil</a></li>
    //           <li><a href="/products/hotel">Fragrance Oil</a></li>
    //           <li><a href="/products/wellness">Masage Oil</a></li>
    //         </ul>
    //       </Col>

    //       {/* Column 3 - Quick Links */}
    //       <Col md={3} sm={6} className="footer-nav">
    //         <h3>Quick Links</h3>
    //         <ul>
    //           <li><a href="/blog">Blog</a></li>
    //           <li><a href="/about">About Us</a></li>
    //           <li><a href="/contact">Contact</a></li>
    //           <li><a href="/faq">FAQ</a></li>
    //         </ul>
    //       </Col>

    //       {/* Column 4 - Address + Subscribe */}
    //       <Col md={3} sm={12} className="footer-ns">
    //         <h3>Company</h3>
    //         <p>
    //           Eternica Beauty Trading LLC <br />
    //           Abu Dhabi, United Arab Emirates <br />
    //           Phone: +971 55 901 5488
    //         </p>

    //         <form className="subscribe-form">
    //           <input
    //             type="email"
    //             className="form-control"
    //             placeholder="Your Email"
    //           />
    //           <button type="submit" className="btn">Subscribe</button>
    //         </form>


    //         {/* Social Media */}
    //         <div className="footer-social">
    //           <a href="#"><FaFacebookF /></a>
    //           <a href="#"><FaTwitter /></a>
    //           <a href="#"><FaInstagram /></a>
    //           <a href="#"><FaLinkedinIn /></a>
    //         </div>
    //       </Col>
    //     </Row>

    //     {/* Bottom credit */}
    //     <Row>
    //       <Col className="text-center mt-3">
    //         <p>© {new Date().getFullYear()} Eternica Beauty. All rights reserved.</p>
    //       </Col>
    //     </Row>
    //   </Container>
    // </footer>

    <footer className="py-5" style={{ backgroundColor: "#ffffff" }}>
      <div className="container text-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <img
            src={Logo}
            alt="Eternica Beauty"
            className="img-fluid"
            style={{ maxWidth: "140px", height: "auto" }}
          />
        </motion.div>

        {/* Description */}
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-4"
          style={{ maxWidth: "600px", color: "#4C348C" }}
        >
          Eternica Beauty offers premium wipes, dispensers, and wellness oils designed to keep your spaces clean, fresh, and healthy. Serving the UAE and Middle East, we combine quality, sustainability, and modern convenience in every product.
        </motion.p> */}

        {/* Social Icons */}
        <motion.div
          className="d-flex justify-content-center mb-4 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="d-flex align-items-center justify-content-center rounded-circle me-3 mb-2"
              style={{
                width: "42px",
                height: "42px",
                backgroundColor: "#4C348C",
                color: "#fff",
                transition: "all 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#6a4fc1";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "#4C348C";
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.hr
          className="mx-auto"
          style={{ width: "75%", borderColor: "rgba(76,52,140,0.2)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Copyright */}
        <motion.p
          className="mt-3 mb-0"
          style={{ color: "#4C348C" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          © 2025 Eternica Beauty. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
