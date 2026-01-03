import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./bootstrap/css/bootstrap.min.css";



const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, showNotification, setQuantity } =
    useContext(CartContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  if (!isAuthenticated()) {
    return (
      <div style={{ 
        padding: "40px", 
        textAlign: "center",
        maxWidth: "600px",
        margin: "50px auto"
      }}>
        <h2>Login Required</h2>
        <p style={{ color: "#666", margin: "20px 0", fontSize: "18px" }}>
          You need to be logged in to view your cart and make purchases.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
     

      <h2>Your Cart 🛒</h2>
   



      {cartItems.length === 0 ? (
        
        <p>Your cart is empty.</p>
      ) : (
       
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
       

            {cartItems.map((item) => (
            
              <div
                key={item.id}
              style={{
                  border: "1px solid #ccc",
                borderRadius: "10px",
              padding: "10px",
                  width: "250px",
                 boxSizing: "border-box",
                }}
              >
                

                <img
                 src={item.image}
                 alt={item.name}
                  style={{
                 width: "100%",
                height: 140,
                   objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
               

                <h4 style={{ marginBottom: 6 }}>{item.name}</h4>
                

                <p style={{ margin: "6px 0" }}>${item.price}</p>
                <div
                  style={{
                 display: "flex",
                  alignItems: "center",
                 gap: 8,
                   margin: "8px 0",
                  }}
                >
             

                  <button
                    onClick={() =>
                      setQuantity(item.id, (item.quantity || 1) - 1)
                    }
                    className="btn btn-outline-secondary"
                    style={{ padding: "4px 8px" }}
                  >
                    -
                  </button>
                  <div style={{ minWidth: 28, textAlign: "center" }}>
                    {item.quantity || 1}
                  </div>
                 



                  <button
                    onClick={() =>
                      setQuantity(item.id, (item.quantity || 1) + 1)
                    }
                    className="btn btn-outline-secondary"
                    style={{ padding: "4px 8px" }}
                  >
                    +
                  </button>
            
                </div>



                <div style={{ display: "flex", gap: 8 }}>
                 

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
               
                </div>
              </div>
            ))}
          </div>
          <hr style={{ margin: "20px 0" }} />
          <h3>Total: ${total}</h3>
         
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button
              onClick={clearCart}
              style={{
                background: "#6c757d",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
  
            <button
              onClick={() => {
                if (cartItems.length === 0) return;
                const orderItems = cartItems.map(item => 
                  `${item.name} x${item.quantity || 1} - $${item.price * (item.quantity || 1)}`
                ).join('\n');
                
                const message = `Hello! I would like to place an order:\n\n${orderItems}\n\nTotal: $${total}`;
                const whatsappNumber = "76545166";
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                
                window.open(whatsappUrl, '_blank');
                
                showNotification(
                  `Opening WhatsApp to complete your order, ${user?.name || "Customer"}!`
                );
                
              
                setTimeout(() => {
                  clearCart();
                }, 1000);
              }}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "6px",
                cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                opacity: cartItems.length === 0 ? 0.6 : 1,
              }}
            >
              Checkout (WhatsApp)
            </button>
             
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;