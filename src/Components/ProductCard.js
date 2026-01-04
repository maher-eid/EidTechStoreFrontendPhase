import "../Assets/ProductCard.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { productImages } from "../utils/imageImports";

const ProductCard = ({ product, compact = false, onDelete, onDetailsClick }) => {
  const navigate = useNavigate();
  const { addToCart, showNotification } = useContext(CartContext);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  if (!product) return null;

  const handleAdd = () => {
    if (!isAuthenticated()) {
      showNotification?.("Please login to add items to cart");
      navigate("/login");
      return;
    }

    addToCart(product, 1);
    showNotification?.(`${product.name} added to cart!`);
  };

  return (
    <div className={"card" + (compact ? " compact" : "")}>
      <img
        src={product.image}
        alt={product.name}
        className="card-img"
        onError={(e) => {
          e.currentTarget.src = productImages.logo;
        }}
      />

      <h3>{product.name}</h3>
      <p>${product.price}</p>

      <button onClick={handleAdd} className="buy-btn">
        Add to Cart
      </button>

      {/* DETAILS — ALWAYS SHOWN */}
      <Link
        to={`/iphonedetails/${product.model || product.id}`}
        style={{
          display: "inline-block",
          marginTop: 8,
          padding: "8px 12px",
          borderRadius: 6,
          background: "#444",
          color: "white",
          textDecoration: "none",
          fontSize: 14,
        }}
      >
        Details
      </Link>

      {/* ADMIN DELETE — ALL CARDS */}
      {isAdmin() && onDelete && (
        <button
          onClick={() => onDelete(product.id)}
          style={{
            marginTop: 10,
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
            width: "100%",
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ProductCard;
