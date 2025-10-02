import React from "react";
import { motion } from "framer-motion";
import wipesImg from "../../assets/green_gymwipes.jpg";
import dispenserImg from "../../assets/dispenser.jpg";
import wipesHover from "../../assets/black_gymwipes.jpg";
 import dispenserHover from "../../assets/dispenser.jpg";

const products = [
    {
        name: "Wipes",
        tagline: "Soft & hygienic for everyday use",
        image: wipesImg,
        hoverImage: wipesHover,
    },
    {
        name: "Dispenser",
        tagline: "Easy access, mess-free dispensing",
        image: dispenserImg,
        hoverImage: dispenserHover,
    },
    {
        name: "Oils",
        tagline: "Pure essential oils for wellness",
        image: 'https://admin.spaworlduae.com/upload/product/1754635989pro_img_451.jpg',
        hoverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSUXBjCwA52mu9HUO_bQzclworG1Y0jtpWbUSYddpymuz9EAmdsdnIYcsks7RDa6NXWrw&usqp=CAU",
    },
    {
        name: "Oils",
        tagline: "Pure essential oils for wellness",
        image: 'https://admin.spaworlduae.com/upload/product/1754635989pro_img_451.jpg',
        hoverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSUXBjCwA52mu9HUO_bQzclworG1Y0jtpWbUSYddpymuz9EAmdsdnIYcsks7RDa6NXWrw&usqp=CAU",
    },
    {
        name: "Oils",
        tagline: "Pure essential oils for wellness",
        image: 'https://admin.spaworlduae.com/upload/product/1754635989pro_img_451.jpg',
        hoverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSUXBjCwA52mu9HUO_bQzclworG1Y0jtpWbUSYddpymuz9EAmdsdnIYcsks7RDa6NXWrw&usqp=CAU",
    },
    {
        name: "Oils",
        tagline: "Pure essential oils for wellness",
        image: 'https://admin.spaworlduae.com/upload/product/1754635989pro_img_451.jpg',
        hoverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSUXBjCwA52mu9HUO_bQzclworG1Y0jtpWbUSYddpymuz9EAmdsdnIYcsks7RDa6NXWrw&usqp=CAU",
    },

];

const ProductShowcase = () => {
    return (
        <section className="py-5">
            <div className="container">
                <motion.h2
          className="text-center fw-bold mb-5"
          style={{ color: "#4C348C" }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
       Our Products
        </motion.h2>

        <div className="row g-4">
          {products.map((product, idx) => (
            <div className="col-md-4" key={idx}>
              <motion.div
                className="card border-0 shadow-sm rounded-4 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                  <div
                  className="position-relative"
                  style={{ height: "250px", overflow: "hidden" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                  <motion.img
                    src={product.hoverImage}
                    alt={`${product.name} hover`}
                    className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                 <motion.div
                  className="card-body text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h5
                    style={{ color: "#4C348C" }}
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.name}
                  </motion.h5>
                  <motion.p
                    className="mb-0"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {product.tagline}
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
