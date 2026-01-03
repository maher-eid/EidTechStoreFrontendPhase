// Navbar.jsx  ✅ FIXED (ADMIN CHECK ALIGNED WITH AuthContext)

import { Link } from "react-router-dom";
import "../Assets/Navbar.css";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import MobileMenu from "./MobileMenu";
import { productImages } from "../utils/imageImports";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalQuantity = cartItems.reduce(
    (s, item) => s + (item.quantity || 1),
    0
  );

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo-container">
        <img
          src={productImages.logo}
          alt="Store Logo"
          className="navbar-logo"
        />
        <span className="logo-text">Eid Tech Store</span>
      </div>

      {/* LINKS */}
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>

        {/* ✅ ADMIN ONLY LINK (FIXED) */}
        {isAuthenticated() && isAdmin() && (
          <Link to="/add-products">Add Products</Link>
        )}

        <Link to="/login">Login/Logout</Link>
        <Link to="/contact">Contact</Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart ({totalQuantity})
        </Link>
      </div>

      {/* MOBILE */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Menu"
      >
        ☰
      </button>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        cartQuantity={totalQuantity}
        isAdmin={isAuthenticated() && isAdmin()}
      />
    </nav>
  );
}
