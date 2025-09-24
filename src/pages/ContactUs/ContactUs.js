import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelopeOpenText, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import './ContactUs.css'
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setError(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);

      // Clear messages after 5 seconds
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
    }
  };
  
  return (
    <div className="contact-page py-5" style={{ background: "linear-gradient(180deg, #FEED9F, #ffffff)" }}>
      <Container>
        {/* Title */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="fw-bold" style={{ color: "#4C348C" }}>
            Contact Us
          </h2>
          <p className="text-muted">We’d love to hear from you. Reach out to us anytime.</p>
        </motion.div>

        {/* Info Cards */}
        <Row className="mb-5 text-center g-4">
          {[
            {
              icon: <FaPhoneAlt />,
              title: "Call Us",
              text: "+971 52 398 7292",
            },
            {
              icon: <FaEnvelopeOpenText />,
              title: "Email Us",
              text: "sales@eternicabeauty.com",
            },
            {
              icon: <FaMapMarkedAlt />,
              title: "Address",
              text: "Eternica Beauty FZE, UAE",
            },
          ].map((item, idx) => (
            <Col md={4} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="p-4">
                  <motion.div
                    className="d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "#4C348C",
                      color: "#fff",
                      fontSize: "1.8rem",
                    }}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h6 className="fw-bold" style={{ color: "#4C348C" }}>
                    {item.title}
                  </h6>
                  <p className="mb-0 text-muted">{item.text}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Contact Form */}
        <Row>
          <Col className="mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <Card className="p-5 shadow-lg border-0 rounded-3">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="number"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="Enter your subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {success && <p className="text-success">{success}</p>}
                  {error && <p className="text-danger">{error}</p>}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      className="w-100 text-white fw-bold"
                      style={{
                        background: "linear-gradient(135deg, #4C348C, #6a4fc1)",
                        border: "none",
                        borderRadius: "25px",
                        padding: "12px",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </Form>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
