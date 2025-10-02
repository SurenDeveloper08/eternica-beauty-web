import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import OilsImg from "../../assets/Almond_Oil.png";
import WipesImg from "../../assets/gymwipes.png";
import DispenserImg from "../../assets/Dispenser.png";
import './CategorySection.css';

const categories = [
  {
    title: "Oils",
    about: "Premium oils for massage, aromatherapy, and daily self-care. Premium oils for massage, aromatherapy, and daily self-care.Premium oils for massage, aromatherapy, and daily self-care. Premium oils for massage, aromatherapy, and daily self-care. Premium oils for massage, aromatherapy, and daily self-care. Premium oils for massage, aromatherapy, and daily self-care.",
    img: OilsImg,
    buttonText: "Shop Oils",
    reverse: false,
  },
  {
    title: "Gym Wipes",
    about: "Biodegradable and antibacterial wipes for gym and personal use.",
    img: WipesImg,
    buttonText: "Shop Wipes",
    reverse: true,
  },
  {
    title: "Dispenser",
    about: "Stylish and convenient dispensers for easy access and hygiene.",
    img: DispenserImg,
    buttonText: "Shop Dispenser",
    reverse: false,
  },
];

const CategorySection = () => {
  return (
    <div className="container-area">
      <Container fluid>
        {categories.map((cat, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === categories.length - 1;

          return (
            <Row
              key={idx}
              className="align-items-stretch"
              style={{
                minHeight: "300px",
                borderTopLeftRadius: isFirst ? "0.325rem" : "0",
                borderTopRightRadius: isFirst ? "0.325rem" : "0",
                borderBottomLeftRadius: isLast ? "0.325rem" : "0",
                borderBottomRightRadius: isLast ? "0.325rem" : "0",
                overflow: "hidden" 
              }}
            >
              {!cat.reverse ? (
                <>
                  {/* Text Column */}
                  <Col
                    md={6}
                    className="d-flex flex-column justify-content-center p-5 text-start"
                    style={{
                      background: "#4C348C",
                      color: "#fff"
                    }}
                  >
                    <motion.h2
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {cat.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {cat.about}
                    </motion.p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button style={{ background: "#fff", border: "none", color: "#4C348C" }}>
                        {cat.buttonText}
                      </Button>
                    </motion.div>
                  </Col>

                  {/* Image Column */}
                  <Col md={6} className="d-flex justify-content-center align-items-center p-0" style={{ background: "#FEED9F" }}>
                    <motion.img
                      src={cat.img}
                      alt={cat.title}
                      className="img-fluid h-100"
                      style={{ objectFit: "contain" }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </Col>
                </>
              ) : (
                <>
                  {/* Image Column */}
                  <Col md={6} className="p-0 d-flex" style={{ background: "#FEED9F" }}>
                    <motion.img
                      src={cat.img}
                      alt={cat.title}
                      className="img-fluid h-100"
                      style={{ objectFit: "contain" }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </Col>

                  {/* Text Column */}
                  <Col
                    md={6}
                    className="d-flex flex-column justify-content-center p-5 text-end"
                    style={{
                      background: "#4C348C",
                      color: "#fff"
                    }}
                  >
                    <motion.h2
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {cat.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {cat.about}
                    </motion.p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button style={{ background: "#fff", border: "none", color: "#4C348C" }}>
                        {cat.buttonText}
                      </Button>
                    </motion.div>
                  </Col>
                </>
              )}
            </Row>
          )
        })}
      </Container>
    </div>
  );
};

export default CategorySection;
