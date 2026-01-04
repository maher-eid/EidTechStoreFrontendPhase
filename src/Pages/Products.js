import React, { useState, useMemo, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { AuthContext } from "../context/AuthContext";
import { productImages } from "../utils/imageImports";

// Modal component for product details
const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  // Get specs from the iphoneSpecs object if available, otherwise use default
  const specs = product.specs || {
    Display: "N/A",
    Camera: "N/A",
    Chip: "N/A",
    Battery: "N/A",
    Storage: "N/A",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 20,
          maxWidth: 850,
          maxHeight: "90vh",
          overflowY: "auto",
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", borderRadius: 12, marginBottom: 20 }}
        />

        <h1 style={{ marginBottom: 5 }}>{product.name}</h1>
        <h2 style={{ color: "#0b5ed7", marginTop: 0 }}>${product.price}</h2>

        <p style={{ fontSize: 17, lineHeight: 1.6 }}>
          {product.description || "No description available."}
        </p>

        <hr style={{ margin: "25px 0" }} />

        <h3>Specifications</h3>
        <ul style={{ fontSize: 16, lineHeight: "1.7" }}>
          {Object.entries(specs).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>

        <br />

        <button
          onClick={onClose}
          style={{
            display: "inline-block",
            marginTop: 20,
            padding: "10px 16px",
            borderRadius: 6,
            background: "#222",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function Products() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL;

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("none");
  const [dbProducts, setDbProducts] = useState([]);

  const baseProducts = [
    { id: 1, name: "iPhone 16", price: 799, image: productImages.IPhone16, model: "IPhone16" },
    { id: 2, name: "iPhone 16 Pro", price: 999, image: productImages.IPhone16Pro, model: "IPhone16Pro" },
    { id: 3, name: "iPhone 16 Pro Max", price: 1199, image: productImages.IPhone16ProMax, model: "IPhone16ProMax" },
    { id: 4, name: "iPhone 17 Air", price: 699, image: productImages.IPhone17air, model: "IPhone17air" },
    { id: 5, name: "iPhone 17 Pro", price: 1099, image: productImages.IPhone17Pro, model: "IPhone17Pro" },
    { id: 6, name: "iPhone 17 Pro Max", price: 1299, image: productImages.IPhone17ProMax, model: "IPhone17ProMax" },
    { id: 7, name: "iPhone 14", price: 599, image: productImages.IPhone14, model: "IPhone14" },
    { id: 8, name: "iPhone 14 Pro", price: 799, image: productImages.IPhone14Pro, model: "IPhone14Pro" },
    { id: 9, name: "iPhone 14 Pro Max", price: 899, image: productImages.IPhone14ProMax, model: "IPhone14ProMax" },
    { id: 10, name: "iPhone 13", price: 499, image: productImages.IPhone13, model: "IPhone13" },
    { id: 11, name: "iPhone 13 Pro", price: 699, image: productImages.IPhone13Pro, model: "IPhone13Pro" },
    { id: 12, name: "iPhone 13 Pro Max", price: 799, image: productImages.IPhone13ProMax, model: "IPhone13ProMax" },
  ];



  const handleDelete = async (id) => {
    if (!isAdmin()) return;

    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      setDbProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Server error");
    }
  };

  const handleDetailsClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchDbProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setDbProducts(data);
      } catch {
        console.error("Failed to load DB products");
      }
    };

    fetchDbProducts();
  }, [API_URL]);

  const allProducts = useMemo(
    () => [...baseProducts, ...dbProducts],
    [dbProducts]
  );

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [query, sort, allProducts]);

  return (
    <div style={{ padding: 28 }}>
      <h2>Our Products</h2>

      {!isAuthenticated() && (
        <button onClick={() => navigate("/login")}>Login</button>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {filtered.map((p) => (
          <ProductCard
            key={`${p.id}-${p.name}`}
            product={p}
            onDelete={isAdmin() ? handleDelete : null}
            onDetailsClick={handleDetailsClick}
          />
        ))}
      </div>
    </div>
  );
}
