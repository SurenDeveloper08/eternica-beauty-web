import React, { useState } from "react";
import { motion } from "framer-motion";
import HomeProducts from "../HomeProducts/HomeProducts";
const ProductDetailsTabs = ({ description, specifications }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="my-5">
      {/* Tab Headers */}
      <div className="d-flex justify-content-center border-bottom mb-3">
        {[
          { key: "description", label: "Description" },
          { key: "specifications", label: "Specifications" },
        ].map((tab) => (
          <button
            key={tab.key}
            className="btn bg-transparent fw-semibold mx-3"
            style={{
              borderBottom: activeTab === tab.key ? "3px solid #4C348C" : "",
              borderRadius: 0,
              color: activeTab === tab.key ? "#4C348C" : "#666",
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-3 bg-white"
      >
        {activeTab === "description" && (
          <p className="text-muted">{description}</p>
        )}

        {activeTab === "specifications" && (
          <ul className="list-unstyled mb-0">
            {specifications.map((spec, idx) => (
              <li key={idx} className="mb-2">
                <strong>{spec.label}: </strong> {spec.value}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default ProductDetailsTabs;
