import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../Assets/Notification.css";

function Notification() {
  const { notification } = useContext(CartContext);

  if (!notification || !notification.visible) return null;

  return (
    <div className="notification" role="status" aria-live="polite">
      {notification.message}
    </div>
  );
}
export default Notification;
