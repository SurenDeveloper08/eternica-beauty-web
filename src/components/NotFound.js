import React from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="notfound-section d-flex align-items-center justify-content-center">
      <Container className="text-center">
        {/* Animated 404 */}
        <motion.h1
          className="display-1 fw-bold text-gradient mb-3"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="fw-semibold text-dark mb-3"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-muted mb-4 fs-5"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          The page you’re looking for doesn’t exist or has been moved.  
          Let’s get you back on track!
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            variant="dark"
            className="rounded-pill px-4 py-2 fw-semibold"
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default NotFound;
