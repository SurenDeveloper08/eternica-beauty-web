import React from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import './ImageZoom.css'
const ImageZoom = ({ src, alt }) => {

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <InnerImageZoom
        src={src}
        zoomSrc={src}
        alt={alt || "Product Image"}
        zoomType="hover"
        zoomPreload={true}
        className="rounded-md shadow-md bg-white"
      />
    </div>
  );
};

export default ImageZoom;
