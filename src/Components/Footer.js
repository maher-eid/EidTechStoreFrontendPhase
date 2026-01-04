import "../Assets/Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 1 }}></div>
        <p style={{ margin: 0, fontWeight: 700, textAlign: "center", flex: 1 }}>EidTech</p>
        <div style={{ flex: 1, textAlign: "right" }}>
          <a href="https://www.facebook.com/share/1Bz9cbEVaz/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#000", textDecoration: "none" }}>
            Facebook
          </a>
          <a href="https://github.com/maher-eid/" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#000", textDecoration: "none" }}>
            GitHub
          </a>
          <a href="https://www.instagram.com/mahereidd?igsh=MTZ6MDN4ZzV5Y2Jpaw==" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#000", textDecoration: "none" }}>
            Instagram
          </a>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <p style={{ margin: "6px 0 0 0", color: "#ccc" }}>© 2025 EidTech. All rights reserved. Contact: eidmaher09@gmail.com</p>
      </div>
    </footer>
  );
}
