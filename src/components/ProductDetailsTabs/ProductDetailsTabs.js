import React, { useState } from "react";
import { motion } from "framer-motion";
import './ProductDetailsTabs.css'

const ProductDetailsTabs = ({
  name,
  countryNames,
  countryCode,
  cities,
  features,
  whyChoose,
  careInstructions,
  specifications
}) => {
  const [activeTab, setActiveTab] = useState("description");

  // Helper function to safely replace placeholders if data exists
  const safeReplace = (text) => {
    if (!text) return "";
    let replaced = text;
    if (countryNames && countryCode && countryNames[countryCode]) {
      replaced = replaced.replace("{country}", countryNames[countryCode]);
    }
    if (
      cities &&
      countryCode &&
      cities[countryCode] &&
      Array.isArray(cities[countryCode])
    ) {
      replaced = replaced.replace("{cities}", cities[countryCode].join(", "));
    }
    return replaced;
  };

  return (
    <div className="product-tabs-content mb-4">
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

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === "description" && (
          <motion.div
            className="left-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >

            {/* Key Features */}
            {features && features.length > 0 && (
              <>
                <h3>Key Features</h3>
                <ul>
                  {features.map((feature, i) => (
                    <li key={i}>{safeReplace(feature)}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Why Choose */}
            {whyChoose && whyChoose.length > 0 && (
              <>
                <h3>Why Choose This {name}?</h3>
                 <ul>
                {whyChoose.map((text, i) => (
                  <li key={i}>{safeReplace(text)}</li>
                ))}
                </ul>
              </>
            )}

            {/* Care Instructions */}
            {careInstructions && careInstructions.length > 0 && (
              <>
                <h3>Care Instructions</h3>
                {careInstructions.map((step, i) => (
                  <p key={i}>{step}</p>
                ))}
              </>
            )}

          </motion.div>
        )}

        {activeTab === "specifications" && (
          <ul className="list-unstyled mb-0">
            {specifications && specifications.length > 0 ? (
              specifications.map((spec, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{spec.key}: </strong> {spec.value}
                </li>
              ))
            ) : (
              <li>No specifications available.</li>
            )}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default ProductDetailsTabs;
