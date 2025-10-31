import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ loading = true, size = 50, color = "#4c348c" }) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
      <div style={styles.overlay}>
        <ClipLoader loading={loading} size={size} color={color} />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 9999,
  },
};

export default Loader;
