import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

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
      { title: "Carrier & Base Oils", about: "Carrier oils or base oils are gentle oils extracted from plants, nuts, or seeds. They are used to thin out concentrated essential oils and make them skin-safe. Essential oils are extremely potent, while carrier oils are soft, enriching, and full of natural goodness.", image: CarrierImg },
      { title: "Essential Oils", about: "Essential oils are the basis of aromatherapy. They're extracts from plants, flowers, and herbs that possess potent scents and healing qualities. They're used most often to induce relaxation, energy, concentration, and good health for body and mind.", image: EssentialImg },
      { title: "Fragrance Oils", about: "The most direct way of totally changing the atmosphere of any location in an instant is through fragrance oils. Whether to ease out a spa-like atmosphere, rejuvenate a wellness center, or create a hospitality zone friendly, fragrance oils are best suited for the task. With their enduring and fresh scents, they set the right mood and make an impression.", image: FragranceImg },
      { title: "Massage Oils", about: "Massage oils are natural or blended oils used on the skin during massage to produce smooth, silky glide. Massage oils enable the ease of hands movement over the skin, reduce friction, and make massage more comfortable and effective.", image: MassageImg },
    ],
  },
  {
    title: "Wipes",
    about: "Clean and hygienic wipes for personal and gym use. Biodegradable and convenient.",
    subcategories: [
      {
        title: "Biodegradable Gym Wipes",
        about: "These thick, soft, and durable high-quality biodegradable gym wipes are made of natural and biodegradable materials that will naturally disintegrate. They are antibacterial, dry instantly, and leave no residue, safe for use on the skin, and perfect for frequent use in gyms, studios, or at-home fitness.",
        image: LuxuryWipesImg,
      },
      {
        title: "Antibacterial Gym Wipes - Standard",
        about: "Gentle on skin, soft, and fast-drying, these wipes wipe clean gym equipment, mats, and surfaces of sweat, dirt, and germs without residue. Made from 100% viscose, alcohol-free, and lightly scented with fresh lemon, these wipes are great to use daily in gyms, studios, fitness clubs, or at home.",
        image: StandardWipesImg,
      },
      {
        title: "Antibacterial Gym Wipes - Economy",
        about: "Antibacterial Economy Wipes are an inexpensive and effective way to keep gyms, studios, and exercise areas clean. They instantly eliminate sweat, bacteria, and dirt from equipment and surfaces and evaporate immediately without residue. Gentle on skin, gentle, and easy to use, they're perfect for daily cleaning and hygiene upkeep.",
        image: EconomyWipesImg,
      },
      {
        title: "Gym Wipes Dispenser",
        about: "Keep a hygienic and secure gym or exercise area with this convenient-to-use Gym Wipes Dispenser. The pre-moistened wipes effortlessly remove germs, disinfecting equipment on a daily basis. The dispenser is sturdy, wall-mountable, and sleek, made of impact-resistant plastic with an easy-to-use silicone nozzle.",
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
            <motion.div
              className="text-center mb-5"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ color: "#4C348C", fontWeight: "700" }}>{cat.title}</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>{cat.about}</p>
            </motion.div>
            <Row className="justify-content-center g-0" style={{ borderRadius: "0.325px" }}>
              {cat.subcategories.map((sub, subIdx) => {

                let borderRadius = "0px";
                let bgColor = "#FEED9F";
                let textColor = "#000";
                let p;
                if (isMobile) {
                  borderRadius = "12px 0 12px 0";

                  if (subIdx % 2 === 0) {
                    bgColor = "#FEED9F";
                  } else {
                    bgColor = "#917bcd";
                  }
                } else {
                  const row = Math.floor(subIdx / 2);
                  const col = subIdx % 2;
                  const isFirstRow = row === 0;
                  const isLastRow = row === 1;

                  if (row % 2 === 0) {
                    bgColor = col === 0 ? "#FEED9F" : "#917bcd";
                    textColor = col === 0 ? "#4C348C" : "#000";
                    p = "#000";
                  } else {
                    bgColor = col === 0 ? "#917bcd" : "#FEED9F";
                    textColor = col === 0 ? "#000" : "#4C348C";
                    p = "#000";
                  }

                  if (isFirstRow && col === 0) borderRadius = "12px 0 0 0";
                  if (isFirstRow && col === 1) borderRadius = "0 12px 0 0";
                  if (isLastRow && col === 0) borderRadius = "0 0 0 12px";
                  if (isLastRow && col === 1) borderRadius = "0 0 12px 0";

                  if (isFirstRow && col === 0) bgColor = `linear-gradient(to right bottom, ${bgColor}, #FFFFFF)`;
                  if (isFirstRow && col === 1) bgColor = `linear-gradient(to left bottom, ${bgColor}, #FFFFFF)`;
                  if (isLastRow && col === 0) bgColor = `linear-gradient(to right top, ${bgColor}, #FFFFFF)`;
                  if (isLastRow && col === 1) bgColor = `linear-gradient(to left top, ${bgColor}, #FFFFFF)`;
                }

                return (
                  <Col md={6} key={subIdx} className="pb-2 pb-md-0">
                    <motion.div
                      initial={{ opacity: 0, x: subIdx % 2 === 0 ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      // className="d-flex align-items-start w-100 h-100 p-4"
                      className="d-flex flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start p-4 h-100"
                      style={{
                        background: bgColor,
                        color: textColor,
                        borderRadius
                      }}
                    >
                      <motion.img
                        src={sub.image}
                        alt={sub.title}
                        // className="me-3"
                        className="mb-3 mb-md-0 me-md-3"
                        style={{ width: "140px", height: "140px", objectFit: "cover" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
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
