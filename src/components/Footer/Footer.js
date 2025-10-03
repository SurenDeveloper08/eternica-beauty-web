import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from '../../assets/LOGO.png'
const Footer = () => {
  return (
    <footer className="footer-bs">
      <Container>
        <Row>
          <Col md={3} sm={12} className="footer-brand text-center text-md-start mb-4 mb-md-0">
            <img
              src={Logo}
              alt="Eternica Beauty Logo"
              className="footer-logo img-fluid"
            />
            <p className="footer-description mt-2">
              Eternica offers premium massage oils, carrier oils, essential oils, and fragrance oils trusted by spas, wellness centers, and beauty professionals across the GCC and Middle East. Experience the highest quality oils for relaxation, therapy, and wellness.
            </p>
          </Col>
          <Col md={3} sm={6} className="footer-nav">
            <h3>Products</h3>
            <ul>
              <li><a href="/category">Carrier & Base Oils</a></li>
              <li><a href="/category">Essential Oil</a></li>
              <li><a href="/category">Fragrance Oil</a></li>
              <li><a href="/category">Masage Oil</a></li>
              <li><a href="/category">Gym Wipes</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="footer-nav">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </Col>


          <Col md={3} sm={12} className="footer-ns">
            <h3>Company</h3>
            <p>
              Eternica Beauty FZE, UAE <br />
              Phone: +971 55 901 5488
            </p>

            <form className="subscribe-form">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
              />
              <button type="submit" className="btn">Subscribe</button>
            </form>

            <div className="footer-social">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </Col>
        </Row>


        <Row>
          <Col className="text-center mt-3">
            <p>© {new Date().getFullYear()} Eternica Beauty. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>

  );
};

export default Footer;
