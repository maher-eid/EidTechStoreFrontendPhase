import React from "react";
import { useParams, Link } from "react-router-dom";
import { productImages } from "../utils/imageImports";
const API_URL = process.env.REACT_APP_API_URL;


 
const iphoneSpecs = {
  IPhone13: {
    title: "IPhone 13",
    price: 499,
    image: productImages.IPhone13,
    description:
      "The IPhone 13 offers a balance of performance and efficiency with the A15 Bionic chip and improved dual-camera system.",
    specs: {
      Display: "6.1-inch Super Retina XDR",
      Camera: "12MP Dual Camera",
      Chip: "A15 Bionic",
      Battery: "Up to 19 hours video playback",
      Storage: "128GB / 256GB / 512GB",
    },
  },

  IPhone13Pro: {
    title: "IPhone 13 Pro",
    price: 599,
    image: productImages.IPhone13Pro,
    description:
      "The IPhone 13 Pro brings ProMotion 120Hz, a triple-camera system, and top-tier performance with the A15 Bionic.",
    specs: {
      Display: "6.1-inch ProMotion 120Hz",
      Camera: "12MP Triple Camera",
      Chip: "A15 Bionic",
      Battery: "Up to 22 hours video playback",
      Storage: "128GB / 256GB / 512GB / 1TB",
    },
  },

  IPhone13ProMax: {
    title: "IPhone 13 Pro Max",
    price: 699,
    image: productImages.IPhone13ProMax,
    description:
      "The biggest and most powerful of the 13 lineup, with a massive battery and professional-level camera system.",
    specs: {
      Display: "6.7-inch ProMotion 120Hz",
      Camera: "12MP Triple Camera",
      Chip: "A15 Bionic",
      Battery: "Up to 28 hours video playback",
      Storage: "128GB / 256GB / 512GB / 1TB",
    },
  },

  IPhone14: {
    title: "IPhone 14",
    price: 649,
    image: productImages.IPhone14,
    description:
      "Better low-light performance, improved battery life, and crash detection technology for enhanced safety.",
    specs: {
      Display: "6.1-inch Super Retina XDR",
      Camera: "12MP Dual Camera",
      Chip: "A15 Bionic (Enhanced)",
      Battery: "Up to 20 hours video playback",
      Storage: "128GB / 256GB / 512GB",
    },
  },

  IPhone14Pro: {
    title: "IPhone 14 Pro",
    price: 749,
    image: productImages.IPhone14Pro,
    description:
      "Featuring Dynamic Island and an incredible 48MP main camera for the highest quality shots.",
    specs: {
      Display: "6.1-inch ProMotion 120Hz",
      Camera: "48MP Triple Camera",
      Chip: "A16 Bionic",
      Battery: "Up to 23 hours video playback",
      Storage: "128GB / 256GB / 512GB / 1TB",
    },
  },

  IPhone14ProMax: {
    title: "IPhone 14 Pro Max",
    price: 849,
    image: productImages.IPhone14ProMax,
    description:
      "The premium flagship with the best battery life and the most advanced camera system Apple offers.",
    specs: {
      Display: "6.7-inch ProMotion 120Hz",
      Camera: "48MP Triple Camera",
      Chip: "A16 Bionic",
      Battery: "Up to 29 hours video playback",
      Storage: "128GB / 256GB / 512GB / 1TB",
    },
  },

  IPhone16: {
    title: "IPhone 16",
    price: 899,
    image: productImages.IPhone16,
    description:
      "With an improved camera system and the new A18 chip, the IPhone 16 delivers performance and efficiency.",
    specs: {
      Display: "6.1-inch Super Retina XDR",
      Camera: "48MP Dual Camera",
      Chip: "A18",
      Battery: "Up to 25 hours video playback",
      Storage: "128GB / 256GB / 512GB",
    },
  },

  IPhone16Pro: {
    title: "IPhone 16 Pro",
    price: 999,
    image: productImages.IPhone16Pro,
    description:
      "Titanium design, upgraded cameras and the A18 Pro chip make this model a professional tool.",
    specs: {
      Display: "6.3-inch ProMotion 120Hz",
      Camera: "48MP Triple Camera",
      Chip: "A18 Pro",
      Battery: "Up to 27 hours video playback",
      Storage: "256GB / 512GB / 1TB",
    },
  },

  IPhone16ProMax: {
    title: "IPhone 16 Pro Max",
    price: 1099,
    image: productImages.IPhone16ProMax,
    description:
      "Apple’s largest display ever and the longest battery life on any IPhone. A true beast.",
    specs: {
      Display: "6.9-inch ProMotion 120Hz",
      Camera: "48MP Triple Camera",
      Chip: "A18 Pro",
      Battery: "Up to 32 hours video playback",
      Storage: "256GB / 512GB / 1TB",
    },
  },

  IPhone17air: {
    title: "IPhone 17 Air",
    price: 1199,
    image: productImages.IPhone17air,
    description:
      "The lightweight 17 Air introduces futuristic AirFrame technology for maximum strength with minimal weight.",
    specs: {
      Display: "6.2-inch LTPO OLED",
      Camera: "48MP Dual Camera",
      Chip: "A19",
      Battery: "Up to 24 hours video playback",
      Storage: "128GB / 256GB / 512GB",
    },
  },

  IPhone17Pro: {
    title: "IPhone 17 Pro",
    price: 1299,
    image: productImages.IPhone17Pro,
    description:
      "The 17 Pro brings the next generation AI-driven processing with the powerful A19 Pro chip.",
    specs: {
      Display: "6.3-inch ProMotion 120Hz",
      Camera: "48MP Triple Camera + AI enhancements",
      Chip: "A19 Pro",
      Battery: "Up to 30 hours video playback",
      Storage: "256GB / 512GB / 1TB",
    },
  },

  IPhone17ProMax: {
    title: "IPhone 17 Pro Max",
    price: 1399,
    image: productImages.IPhone17ProMax,
    description:
      "The ultimate flagship with unrivaled display, performance, camera quality and battery life.",
    specs: {
      Display: "7.0-inch ProMotion 120Hz",
      Camera: "48MP Quad Camera",
      Chip: "A19 Pro Max",
      Battery: "Up to 36 hours video playback",
      Storage: "256GB / 512GB / 1TB / 2TB",
    },
  },
};

export default function IPhoneDetails() {
  const { model } = useParams();
  const phone = iphoneSpecs[model];

  if (!phone) return <h2>Model not found.</h2>;

  return (
    <article style={{ maxWidth: 850, margin: "40px auto", padding: "20px" }}>
     
      <img
        src={phone.image}
        alt={phone.title}
        style={{ width: "100%", borderRadius: 12, marginBottom: 20 }}
      />

      
      <h1 style={{ marginBottom: 5 }}>{phone.title}</h1>
      <h2 style={{ color: "#0b5ed7", marginTop: 0 }}>${phone.price}</h2>

 
      <p style={{ fontSize: 17, lineHeight: 1.6 }}>{phone.description}</p>

      <hr style={{ margin: "25px 0" }} />

     
      <h3>Specifications</h3>
      <ul style={{ fontSize: 16, lineHeight: "1.7" }}>
        {Object.entries(phone.specs).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>

      <br />

    
      <Link
        to="/products"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 16px",
          borderRadius: 6,
          background: "#222",
          color: "white",
          textDecoration: "none",
        }}
      >
        ← Back to Products
      </Link>
    </article>
  );
}
