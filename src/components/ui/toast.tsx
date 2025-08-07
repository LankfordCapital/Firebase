import React from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
};

const Toast: React.FC<ToastProps> = ({ message, type = "info" }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#d4edda";
      case "error":
        return "#f8d7da";
      default:
        return "#d1ecf1";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "#155724";
      case "error":
        return "#721c24";
      default:
        return "#0c5460";
    }
  };

  return (
    <div
      style={{
        background: getBackgroundColor(),
        color: getTextColor(),
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        margin: "8px 0",
        minWidth: "200px",
        maxWidth: "400px",
      }}
      role="alert"
    >
      {message}
    </div>
  );
};

export { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport } from "wherever-they-are-defined";

