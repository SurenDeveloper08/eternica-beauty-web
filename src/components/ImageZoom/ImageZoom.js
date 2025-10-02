import React from "react";
import ReactImageMagnify from "react-image-magnify";

const ImageZoom = ({ src, alt }) => {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: alt || "Product Image",
            isFluidWidth: true,
            src: src,
            style: {
                backgroundColor: "#fff",
                borderRadius: "8px",
                maxHeight: "500px",
                objectFit: "contain",
              },
          },
          largeImage: {
            src: src,
            width: 1200,
            height: 1800,
            
          },
          enlargedImageContainerStyle: {
              zIndex: 9999,
              background: "#fff",
              borderRadius: "0.375rem",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            },
            enlargedImageContainerDimensions: {
              width: "150%",
              height: "120%",
            },
        }}
      />
    </div>
  );
};

export default ImageZoom;
