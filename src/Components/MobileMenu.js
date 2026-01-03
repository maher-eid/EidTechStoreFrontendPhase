import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/MobileMenu.css';

export default function MobileMenu({ isOpen, onClose, cartQuantity }) {
  return (
    <>
      {isOpen && <div className="mobile-menu-overlay" onClick={onClose} />}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="mobile-links">
          <Link to="/home" onClick={onClose}>Home</Link>
          <Link to="/products" onClick={onClose}>Products</Link>
          <Link to="/contact" onClick={onClose}>Contact</Link>
          <Link to="/cart" onClick={onClose} className="cart-link">
            🛒 Cart ({cartQuantity})
          </Link>
        </div>
      </div>
    </>
  );
}