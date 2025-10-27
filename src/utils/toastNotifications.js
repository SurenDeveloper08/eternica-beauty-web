import toast from "react-hot-toast";

export const showLocalToast = (message, targetRef, type = "success") => {
  if (!targetRef?.current) return;

  const rect = targetRef.current.getBoundingClientRect();

  toast.custom(
    (t) => (
      <div
        style={{
          position: "absolute",
          top: rect.bottom + window.scrollY + 8, // 8px below the element
          left: rect.left + window.scrollX,
          padding: "10px 15px",
          backgroundColor:
            type === "success" ? "#d4edda" :
            type === "error" ? "#f8d7da" :
            type === "info" ? "#d1ecf1" : "#fff3cd",
          color:
            type === "success" ? "#155724" :
            type === "error" ? "#721c24" :
            type === "info" ? "#0c5460" : "#856404",
          border: "1px solid",
          borderColor:
            type === "success" ? "#155724" :
            type === "error" ? "#721c24" :
            type === "info" ? "#0c5460" : "#856404",
          borderRadius: "5px",
          zIndex: 9999,
        }}
      >
        {message}
      </div>
    ),
    { duration: 3000 } // auto-hide after 3s
  );
};
