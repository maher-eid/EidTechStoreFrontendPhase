import React from "react";
import { Link } from "react-router-dom";
import { productImages } from "../utils/imageImports";
const models = [
  { key: "IPhone13", name: "IPhone 13", image: productImages.IPhone13 },
  { key: "IPhone13Pro", name: "IPhone 13 Pro", image: productImages.IPhone13Pro },
  { key: "IPhone14", name: "IPhone 14", image: productImages.IPhone14 },
  { key: "IPhone14Pro", name: "IPhone 14 Pro", image: productImages.IPhone14Pro },
  { key: "IPhone14ProMax", name: "IPhone 14 Pro Max", image: productImages.IPhone14ProMax },
  { key: "IPhone16", name: "IPhone 16", image: productImages.IPhone16 },
  { key: "IPhone13ProMax", name: "IPhone 13 Pro Max", image: productImages.IPhone13ProMax },
  { key: "IPhone16Pro", name: "IPhone 16 Pro", image: productImages.IPhone16Pro },
  { key: "IPhone17air", name: "IPhone 17 Air", image: productImages.IPhone17air },
  { key: "IPhone16ProMax", name: "IPhone 16 Pro Max", image: productImages.IPhone16ProMax },
  { key: "IPhone17Pro", name: "IPhone 17 Pro", image: productImages.IPhone17Pro },
  { key: "IPhone17ProMax", name: "IPhone 17 Pro Max", image: productImages.IPhone17ProMax },
];

export default function IPhoneDetailsList() {
  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>All IPhone Models</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {models.map((m) => (
          <Link
            key={m.key}
            to={`/iphonedetails/${m.key}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #ccc",
              borderRadius: 10,
              padding: 15,
              textAlign: "center",
            }}
          >
            <img
              src={m.image}
              alt={m.name}
              style={{ width: "100%", borderRadius: 10, marginBottom: 10 }}
            />
            <h3>{m.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
