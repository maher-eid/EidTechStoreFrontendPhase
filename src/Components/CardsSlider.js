import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function CardsSlider({ products }) {
  const [index, setIndex] = useState(0);

  
  const chunkSize = 3;
  const slides = [];

  for (let i = 0; i < products.length; i += chunkSize) {
    slides.push(products.slice(i, i + chunkSize));
  }

  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div style={{ width: "100%", overflow: "hidden", marginBottom: "30px" }}>
      
    
      <div
        style={{
          display: "flex",
          width: `${slides.length * 100}%`,
          transform: `translateX(-${index * (100 / slides.length)}%)`,
          transition: "transform 0.7s ease-in-out",
        }}
      >
        {slides.map((group, i) => (
          <div
            key={i}
            style={{
              width: `${100 / slides.length}%`,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            {group.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        ))}
      </div>
 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          gap: "8px",
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: index === i ? "12px" : "8px",
              height: index === i ? "12px" : "8px",
              borderRadius: "50%",
              background: index === i ? "#0b5ed7" : "#999",
              cursor: "pointer",
              transition: "0.3s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
