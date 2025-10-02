import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

// Images for subcategories
import CarrierImg from "../../assets/carrieroil.png";
import EssentialImg from "../../assets/essential_oil.png";
import FragranceImg from "../../assets/Almond_Oil.png";
import MassageImg from "../../assets/massage_oil.png";
import LuxuryWipesImg from "../../assets/gymwipes.png";
import StandardWipesImg from "../../assets/black.png";
import EconomyWipesImg from "../../assets/blue.png";
import DispenserImg from "../../assets/Dispenser.png";
import './CategoryShowcase.css'
const categories = [
  {
    title: "Oils",
    about: "Explore our premium oils for massage, aromatherapy, and daily self-care. Crafted to bring wellness and relaxation to your home.",
    subcategories: [
      { title: "Carrier & Base Oils", about: "Carrier oils, also known as base oils, are gentle oils made from plants, nuts, or seeds. They are used to dilute strong essential oils and make them safe to apply on the skin. While essential oils are very concentrated, carrier oils are mild, moisturizing, and full of natural goodness.", image: CarrierImg },
      { title: "Essential Oils", about: "Essential oils are the heart of aromatherapy. They’re natural extracts taken from plants, flowers, and herbs, carrying powerful scents and therapeutic benefits. These oils are widely used to support relaxation, boost energy, improve focus, and promote overall well-being for both body and mind.", image: EssentialImg },
      { title: "Fragrance Oils", about: "Fragrance oils are an easy way to instantly change the feel of any space. Whether you want to create a calm, spa-like atmosphere, refresh a wellness center, or make a hospitality space more inviting, fragrance oils do the job beautifully. With their long-lasting and pleasant aromas, they set the right mood and leave a lasting impression.", image: FragranceImg },
      { title: "Massage Oils", about: "Massage oils are natural or blended oils used during massages to provide smooth, gentle glide on the skin. They help the hands move easily, reduce friction, and make the massage experience more comfortable and effective.", image: MassageImg },
    ],
  },
  {
    title: "Wipes",
    about: "Clean and hygienic wipes for personal and gym use. Biodegradable and convenient.",
    subcategories: [
      {
        title: "Biodegradable Gym Wipes",
        about: "These luxury biodegradable gym wipes are thick, soft, and durable, made from eco-friendly materials that naturally break down. They are antibacterial, quick-drying, and residue-free, safe for skin, and perfect for frequent use in gyms, studios, or home workouts.",
        image: LuxuryWipesImg,
      },
      {
        title: "Antibacterial Gym Wipes - Standard",
        about: "Soft, quick-drying, and gentle on skin, these wipes effectively remove sweat, dirt, and germs from gym equipment, mats, and surfaces without leaving residue. Made from 100% viscose, alcohol-free, and lightly scented with fresh lemon, they are perfect for everyday use in gyms, studios, fitness centers, or at home.",
        image: StandardWipesImg,
      },
      {
        title: "Antibacterial Gym Wipes - Economy",
        about: "Antibacterial Economy Wipes are an affordable and effective way to keep gyms, studios, and workout spaces clean. They quickly remove sweat, germs, and dirt from equipment and surfaces, drying fast without leaving residue. Soft, safe on skin, and easy to use, they’re perfect for daily cleaning and maintaining hygiene..",
        image: EconomyWipesImg,
      },
      {
        title: "Gym Wipes Dispenser",
        about: "Keep your gym or workout area clean and safe with this simple-to-use Gym Wipes Dispenser. The pre-moistened wipes quickly remove germs, keeping equipment sanitized every day. The dispenser is durable, wall-mountable, and stylish, made from impact-resistant plastic with an easy-to-use silicone nozzle.",
        image: DispenserImg,
      },
    ],
  },
];

const CategoryShowcaseCreative = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {categories && categories.map((cat, catIdx) => {
        return (
          <div key={catIdx} className="mb-5">
            {/* Category Header */}
            <motion.div
              className="text-center mb-5"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ color: "#4C348C", fontWeight: "700" }}>{cat.title}</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>{cat.about}</p>
            </motion.div>

            {/* Subcategories */}
            <Row className="justify-content-center g-0" style={{ borderRadius: "0.325px" }}>
              {cat.subcategories.map((sub, subIdx) => {
                // Find row number (0-based)
              
                let borderRadius = "0px";
                let bgColor;
                let textColor = "#000"; // default text color
                let p;
                if (isMobile) {
                  // Mobile: top-left + bottom-right rounded
                  borderRadius = "12px 0 12px 0";

                  // Odd/Even background
                  if (subIdx % 2 === 0) {
                    bgColor = "#FEED9F"; // odd items
                  } else {
                    bgColor = "#917bcd"; // even items
                  }
                } else {
                  // Desktop: your original gradient logic
                  const row = Math.floor(subIdx / 2);
                  const col = subIdx % 2;
                  const isFirstRow = row === 0;
                  const isLastRow = row === 1;

                  if (row % 2 === 0) {
                    // even row
                    bgColor = col === 0 ? "#FEED9F" : "#917bcd";
                    textColor = col === 0 ? "#4C348C" : "#000";
                     p = "#000";
                  } else {
                    bgColor = col === 0 ? "#917bcd" : "#FEED9F";
                    textColor = col === 0 ? "#000" : "#4C348C";
                     p = "#000";
                  }

                  if (isFirstRow && col === 0) borderRadius = "12px 0 0 0"; // top-left
                  if (isFirstRow && col === 1) borderRadius = "0 12px 0 0"; // top-right
                  if (isLastRow && col === 0) borderRadius = "0 0 0 12px"; // bottom-left
                  if (isLastRow && col === 1) borderRadius = "0 0 12px 0"; // bottom-right

                  // Gradient
                  if (isFirstRow && col === 0) bgColor = `linear-gradient(to right bottom, ${bgColor}, #FFFFFF)`;
                  if (isFirstRow && col === 1) bgColor = `linear-gradient(to left bottom, ${bgColor}, #FFFFFF)`;
                  if (isLastRow && col === 0) bgColor = `linear-gradient(to right top, ${bgColor}, #FFFFFF)`;
                  if (isLastRow && col === 1) bgColor = `linear-gradient(to left top, ${bgColor}, #FFFFFF)`;
                }

                return (
                  <Col md={6} key={subIdx}>
                    <motion.div
                      initial={{ opacity: 0, x: subIdx % 2 === 0 ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="d-flex align-items-start w-100 h-100 p-4"
                      style={{
                        background: bgColor,
                        color: textColor,
                        borderRadius
                      }}
                    >
                      {/* Small decorative image */}
                      <motion.img
                        src={sub.image}
                        alt={sub.title}
                        className="me-3"
                        style={{ width: "140px", height: "140px", borderRadius: "50%", objectFit: "cover" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Text */}
                      <div>
                        <h5 style={{ color: textColor, fontWeight: "600" }}>{sub.title}</h5>
                        <p style={{ color: p }}>{sub.about}</p>
                      </div>
                    </motion.div>
                  </Col>
                )
              })}
            </Row>
          </div>
        )
      })}
    </>
  );
};

export default CategoryShowcaseCreative;
