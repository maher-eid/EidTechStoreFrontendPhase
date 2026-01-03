import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AddProducts() {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 80 }}>Loading...</p>;
  }

  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to="/products" replace />;
  }

  const handleAddProduct = async () => {
  setError("");
  setSuccess("");

  if (!name || !price || !description || !image) {
    setError("Please fill all fields");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    const API_URL = process.env.REACT_APP_API_URL;

    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Failed to add product");
      return;
    }

    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    setSuccess("Product added successfully");
  } catch (err) {
    console.error(err);
    setError("Server error");
  }
};


  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Add Product (Admin)</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <textarea
        placeholder="Product description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ width: "100%", marginBottom: 20 }}
      />

      <button
        onClick={handleAddProduct}
        style={{ width: "100%", padding: 12, cursor: "pointer" }}
      >
        Add Product
      </button>
    </div>
  );
}
