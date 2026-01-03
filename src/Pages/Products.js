import React, { useState, useMemo, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { productImages } from "../utils/imageImports";
import { AuthContext } from "../context/AuthContext";

export default function Products() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL;


  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("none");
  const [dbProducts, setDbProducts] = useState([]);
  const baseProducts = [
    { id: 1, model: "IPhone13", name: "IPhone 13", price: 499, image: productImages.IPhone13 },
    { id: 2, model: "IPhone13Pro", name: "IPhone 13 Pro", price: 599, image: productImages.IPhone13Pro },
    { id: 3, model: "IPhone13ProMax", name: "IPhone 13 Pro Max", price: 699, image: productImages.IPhone13ProMax },

    { id: 4, model: "IPhone14", name: "IPhone 14", price: 649, image: productImages.IPhone14 },
    { id: 5, model: "IPhone14Pro", name: "IPhone 14 Pro", price: 749, image: productImages.IPhone14Pro },
    { id: 6, model: "IPhone14ProMax", name: "IPhone 14 Pro Max", price: 849, image: productImages.IPhone14ProMax },

    { id: 7, model: "IPhone16", name: "IPhone 16", price: 899, image: productImages.IPhone16 },
    { id: 8, model: "IPhone16Pro", name: "IPhone 16 Pro", price: 999, image: productImages.IPhone16Pro },
    { id: 9, model: "IPhone16ProMax", name: "IPhone 16 Pro Max", price: 1099, image: productImages.IPhone16ProMax },

    { id: 10, model: "IPhone17air", name: "IPhone 17 Air", price: 1199, image: productImages.IPhone17air },
    { id: 11, model: "IPhone17Pro", name: "IPhone 17 Pro", price: 1299, image: productImages.IPhone17Pro },
    { id: 12, model: "IPhone17ProMax", name: "IPhone 17 Pro Max", price: 1399, image: productImages.IPhone17ProMax },
  ];

  useEffect(() => {
    const fetchDbProducts = async () => {
      try {
      const res = await fetch(`${API_URL}/products`);
        const data = await res.json();

        setDbProducts(data);
      } catch (err) {
        console.error("Failed to load DB products");
      }
    };

    fetchDbProducts();
  }, []);

  const allProducts = useMemo(() => {
    return [...baseProducts, ...dbProducts];
  }, [dbProducts]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = allProducts.filter((p) =>
      p.name.toLowerCase().includes(q)
    );

    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [query, sort, allProducts]);

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Our Products</h2>

        {!isAuthenticated() && (
          <div style={{
            padding: "10px 20px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "6px"
          }}>
             Please{" "}
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0
              }}
            >
              login
            </button>{" "}
            to add items to cart
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          style={{ padding: 8, flex: 1, borderRadius: 6, border: "1px solid #d1d5db" }}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
        >
          <option value="none">Sort</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <button
          onClick={() => {
            setQuery("");
            setSort("none");
          }}
          style={{ padding: "8px 12px", borderRadius: 6 }}
        >
          Reset
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {filtered.map((p) => (
          <ProductCard key={`${p.id}-${p.name}`} product={p} />
        ))}
      </div>
    </div>
  );
}
