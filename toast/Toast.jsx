import { useEffect } from "react";
import useToast from "../hooks/useToast";

const variantStyles = {
  success: { backgroundColor: "#22c55e" },
  error: { backgroundColor: "#ef4444" },
  warning: { backgroundColor: "#f59e0b" },
  info: { backgroundColor: "#3b82f6" },
};

const baseStyle = {
  padding: "12px 16px",
  borderRadius: "6px",
  minWidth: "250px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const Toast = ({ id, message, variant = "info", duration = 3000 }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, removeToast]);

  return (
    <div style={{ ...baseStyle, ...variantStyles[variant] }}>
      <span>{message}</span>
      <button
        onClick={() => removeToast(id)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  );
};

export default Toast;
