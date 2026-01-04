import "../Assets/ProductCard.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product, compact = false, onDelete }) => {
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
          e.currentTarget.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";
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
