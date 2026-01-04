import React, { useState, useMemo, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { productImages } from "../utils/imageImports";
import { AuthContext } from "../context/AuthContext";

export default function Products() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL;

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("none");
  const [dbProducts, setDbProducts] = useState([]);

  // ❌ THESE SHOULD NEVER BE DELETED
  const baseProducts = [
    { id: "b1", name: "IPhone 13", price: 499, image: productImages.IPhone13 },
    { id: "b2", name: "IPhone 13 Pro", price: 599, image: productImages.IPhone13Pro },
    { id: "b3", name: "IPhone 13 Pro Max", price: 699, image: productImages.IPhone13ProMax },
  ];

  const handleDelete = async (id) => {
    if (!isAdmin()) return;

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      setDbProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Server error");
    }
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
            key={p.id}
            product={p}
            onDelete={dbProducts.some((dp) => dp.id === p.id) ? handleDelete : null}
          />
        ))}
      </div>
    </div>
  );
}
