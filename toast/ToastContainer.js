//stacking logic for toasts

import { useContext } from "react";
import ToastContext from "./ToastContext";
import Toast from "./Toast";

const containerStyle = {
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const ToastContainer = () => {
  const { toasts } = useContext(ToastContext);
  return (
    <div style={containerStyle}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
