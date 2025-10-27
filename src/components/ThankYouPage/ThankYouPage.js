import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Meta from "../../utils/Meta";

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if user directly visits /thank-you without order
  useEffect(() => {
    if (!location.state?.orderSuccess) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
    <Meta
                    title={"Success - Eternica Beauty"}
                    description={"Thank you for shopping at Eternica Beauty! Your natural oils, gym wipes are on their way to you. Fast delivery across the UAE and Middle East.."}
                    keywords={"skincare, beauty, oils, wipes, dispensers"}
                    canonical="https://eternicabeauty.com/contact"
                />
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center py-5"
      style={{ height: "60vh" }}
    >
      <motion.h2
        className="fw-bold mb-3"
        style={{ color: "#4C348C" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Thank You!
      </motion.h2>

      <motion.p
        className="lead"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Your order has been successfully placed.
        We’ll send you a confirmation email shortly.
      </motion.p>

      <motion.a
        href="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn text-white fw-bold mt-4"
        style={{
          background: "#4C348C",
          borderRadius: "10px",
          padding: "12px 24px",
          textDecoration: "none",
        }}
      >
        Continue Shopping
      </motion.a>
    </div>
    </>
  );
};

export default ThankYouPage;
