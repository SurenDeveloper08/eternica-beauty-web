import React from "react";
import ImageZoom from "../../components/ImageZoom/ImageZoom"; // Optional custom zoom component
import "./ProductGallery.css";

const ProductGallery = ({ productName, images = [], selectedImage, setSelectedImage }) => {
  if (!images.length) return null;

  return (
    <div className="gallery-section">
      {/* --- Main Image --- */}
      <div className="main-image-wrapper">
        <ImageZoom
          src={selectedImage || images[0].image}
          alt={productName}
          className="main-image fade-in"
        />
      </div>

      {/* --- Thumbnails --- */}
      <div className="thumbs-wrapper">
        {images.map((img) => (
          <div
            key={img._id}
            className={`thumb ${selectedImage === img.image ? "active" : ""}`}
            onClick={() => setSelectedImage(img.image)}
          >
            <img src={img.image} alt={`thumb-${img._id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
