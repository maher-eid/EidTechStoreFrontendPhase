import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";  
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import IPhoneDetails from "./Pages/IPhoneDetails";
import AddProducts from "./Pages/AddProducts";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />

            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-products" element={<AddProducts />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/iphonedetails/:model" element={<IPhoneDetails />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
