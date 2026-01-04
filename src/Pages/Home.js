import React, { useState } from "react";
import ProductCard from "../Components/ProductCard";
import CardSlider from "../Components/CardsSlider";
import { productImages } from "../utils/imageImports";
const API_URL = process.env.REACT_APP_API_URL;


export default function Home() {
  const [activeSection, setActiveSection] = useState("about");

  const allPhones = [
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

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "5px" }}>Welcome to Eid Tech Store</h2>
      <p style={{ marginBottom: "20px" }}>Find the best deals on your favorite gadgets!</p>


      <div style={{ marginTop: "25px", marginBottom: "20px" }}>
        <span
          onClick={() => setActiveSection("about")}
          style={{
            marginRight: "20px",
            cursor: "pointer",
            fontWeight: activeSection === "about" ? "bold" : "normal",
            textDecoration: activeSection === "about" ? "underline" : "none",
          }}
        >
          About Us
        </span>

        <span
          onClick={() => setActiveSection("offers")}
          style={{
            cursor: "pointer",
            fontWeight: activeSection === "offers" ? "bold" : "normal",
            textDecoration: activeSection === "offers" ? "underline" : "none",
          }}
        >
          Special Offers
        </span>
      </div>

    
      {activeSection === "about" && (
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#f9f9f9",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
            lineHeight: "1.7",
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>About Us</h2>

          <p style={{ marginBottom: "14px" }}>
            Eid Tech Store is your trusted destination for the latest iPhones and premium tech devices.
            We focus on providing quality products, fair prices, and a smooth shopping experience.
          </p>

          <p style={{ marginBottom: "14px" }}>
            Every device in our collection is selected for performance and reliability. Whether you're upgrading
            or searching for a good deal, we help you choose the right device with confidence.
          </p>

          <p>
            We appreciate your support and continue working to bring you more products and better service every day.
          </p>
      <CardSlider products={allPhones} />

        </div>
      )}

  
      {activeSection === "offers" && (
        <div style={{ textAlign: "center", padding: "20px" }}>

      
          <div
            style={{
              width: "100%",
              padding: "25px",
              marginBottom: "20px",
              background: "linear-gradient(90deg, #d62828, #ff4d4d)",
              color: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "28px" }}>🎄 Christmas Mega Deals 🎁</h2>
            <p style={{ marginTop: "8px", fontSize: "18px" }}>
              Huge discounts on iPhones — limited time only!
            </p>
          </div>

          
          <div
            style={{
              background: "#fff3f3",
              padding: "25px",
              borderRadius: "12px",
              maxWidth: "800px",
              margin: "0 auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#d62828", marginBottom: "10px" }}>Christmas Special Offers</h3>

            <ul style={{ listStyle: "none", padding: 0, lineHeight: 1.8 }}>
              <li>• iPhone 16 Pro Max — <strong>$150 OFF</strong></li>
              <li>• Buy any iPhone 14 → <strong>Free Screen Protector</strong></li>
              <li>• iPhone 13 Pro — <strong>$499 Christmas Price</strong></li>
              <li>• Free delivery on orders above $300</li>
              <li>• Extra <strong>10% student discount</strong></li>
            </ul>

            <p style={{ marginTop: "20px", fontSize: "15px" }}>
              Offer ends December 27 — don’t miss it!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
