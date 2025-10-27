import React from "react";
import { color, motion } from "framer-motion";
import {
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { Container, Row, Col } from "react-bootstrap";
import "./DashboardPage.css";

const stats = [
  {
    title: "Total Sales",
    value: "AED 0",
    icon: <TrendingUpIcon fontSize="large" />,
    bg: "linear-gradient(135deg, #4C348C, #7D5AED)",
    color: "#fff",
  },
  {
    title: "Total Orders",
    value: "0",
    icon: <ShoppingCartIcon fontSize="large" />,
    bg: "linear-gradient(135deg, #FEED9F, #FFD966)",
    color: "#fff",
  },
  {
    title: "Total Products",
    value: "0",
    icon: <PeopleIcon fontSize="large" />,
    bg: "linear-gradient(135deg, #4C348C, #A48CF3)",
    color: "#fff",
  },
];

const DashboardPage = () => {
  return (
    <Container fluid className="dashboard-page py-4">
      <h3 className="fw-bold mb-4 text-center text-md-start" style={{ color: "#4C348C" }}>
        Dashboard Overview
      </h3>

      <Row className="g-4">
        {stats.map((stat, idx) => (
          <Col key={idx} xs={12} sm={6} lg={4}>
            <motion.div
              className="stat-card"
              style={{ background: stat.bg }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="icon-wrapper">{stat.icon}</div>
              <div className="text-wrapper">
                <h5>{stat.title}</h5>
                <h3 style={{ color: stat.color }}>{stat.value}</h3>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Example content below */}
      <motion.div
        className="mt-5 p-4 chart-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h5 className="fw-bold mb-3" style={{ color: "#4C348C" }}>Recent Activity</h5>
        <p className="text-muted mb-0">
          Welcome to your dashboard! Here you can track orders, revenue growth, and user activity.
          This layout is fully responsive and ready to integrate real analytics or charts.
        </p>
      </motion.div>
    </Container>
  );
};

export default DashboardPage;
