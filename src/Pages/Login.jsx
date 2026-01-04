import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin, logout, user: currentUser } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;


  const [error, setError] = useState("");

  useEffect(() => {}, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleLogin = async () => {
    setError("");
    

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
     const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      authLogin(data.user);
      navigate("/products", { replace: true });
    } catch {
      setError("Server error");
    }
  };

  const handleRegister = async () => {
    setError("");

    if (!regName || !regEmail || !regPassword) {
      setError("Fill all fields");
      return;
    }

    if (regPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
const res = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Register failed");
        return;
      }

      authLogin(data.user);
      navigate("/products", { replace: true });
    } catch {
      setError("Server error");
    }
  };
  return (
    <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
      <div style={{ width: 420, padding: 30, border: "1px solid #ddd" }}>
        <h2>{currentUser ? "Account" : isRegistering ? "Register" : "Login"}</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

      
        {currentUser && (
          <>
            <p>Logged in as: <b>{currentUser.email}</b></p>
            <button onClick={handleLogout} style={{ width: "100%", padding: 10 }}>
              Logout
            </button>
          </>
        )}

        {!currentUser && !isRegistering && (
          <>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <div style={{ position: "relative", marginBottom: 10 }}>
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: 10, paddingRight: 40 }}
              />
              <span
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
              >
                show
              </span>
            </div>

            <button onClick={handleLogin} style={{ width: "100%", padding: 10 }}>
              Login
            </button>

            <p style={{ marginTop: 10 }}>
              No account?{" "}
              <button onClick={() => setIsRegistering(true)}>Register</button>
            </p>
          </>
        )}
        {!currentUser && isRegistering && (
          <>
            <input
              placeholder="Full name"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <input
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <div style={{ position: "relative", marginBottom: 10 }}>
              <input
                type={showRegPassword ? "text" : "password"}
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                style={{ width: "100%", padding: 10, paddingRight: 40 }}
              />
              <span
                onClick={() => setShowRegPassword(!showRegPassword)}
                style={{ position: "absolute", right: 10, top: "50%", cursor: "pointer" }}
              >
                show
              </span>
            </div>

            <div style={{ position: "relative", marginBottom: 10 }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: "100%", padding: 10, paddingRight: 40 }}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: "absolute", right: 10, top: "50%", cursor: "pointer" }}
              >
                show
              </span>
            </div>

            <button onClick={handleRegister} style={{ width: "100%", padding: 10 }}>
              Register
            </button>

            <p style={{ marginTop: 10 }}>
              Have account?{" "}
              <button onClick={() => setIsRegistering(false)}>Login</button>
              
            </p>
          </>
        )}
      </div>

     
      <div style={{
        position: "absolute",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        width: 250,
        padding: 20,
        background: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>Admin Account</h4>
        <p style={{ margin: "5px 0", fontSize: 14 }}>
          <strong>Email:</strong> admin@eidtech.com
        </p>
        <p style={{ margin: "5px 0", fontSize: 14 }}>
          <strong>Password:</strong> admin123
        </p>
      </div>
    </div>
  );
}
