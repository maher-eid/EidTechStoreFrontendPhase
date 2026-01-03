import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({ message: "", visible: false });

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const setQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const showNotification = (message, duration = 3000) => {
    setNotification({ message, visible: true });
    setTimeout(() => setNotification({ message: "", visible: false }), duration);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, setQuantity, clearCart, notification, showNotification }}
    >
      {children}
    </CartContext.Provider>
  );
};
