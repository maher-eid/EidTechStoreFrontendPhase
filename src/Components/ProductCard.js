import "../Assets/ProductCard.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";       
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product, compact = false }) => {
  const navigate = useNavigate();
  const { addToCart, showNotification } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  if (!product) {
    return <div className="product-card">No product data</div>;
  }

  const handleAdd = () => {
    if (!isAuthenticated()) {
      if (typeof showNotification === "function") {
        showNotification("Please login to add items to cart");
      }
      navigate("/login");
      return;
    }
    
    addToCart(product, 1);
    if (typeof showNotification === "function") {
      showNotification(`${product.name} added to cart!`);
    }
  };

  return (
    <div className={"card" + (compact ? " compact" : "")}>
      <img
        src={product.image}
        alt={product.name}
        className="card-img"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://via.placeholder.com/400x300?text=No+Image";
        }}
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      {/* Buttons */}
      <button onClick={handleAdd} className="buy-btn">
        Add to Cart
      </button>

      {/* 🔹 NEW Details button */}
      {product.model && (
        <Link
          to={`/iphonedetails/${product.model}`}
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
      )}
    </div>
  );
};

export default ProductCard;
