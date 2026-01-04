import "../Assets/Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <p style={{ margin: 0, fontWeight: 700 }}>EidTech</p>
        <p style={{ margin: "6px 0 0 0", color: "#475569" }}>© 2025 EidTech. All rights reserved.
 Contact: eidmaher09@gmail.com</p>
        <div style={{ marginTop: 10 }}>
          <a href="https://www.facebook.com/share/1Bz9cbEVaz/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#4267B2", textDecoration: "none" }}>
            Facebook
          </a>
          <a href="https://github.com/maher-eid/" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#333", textDecoration: "none" }}>
            GitHub
          </a>
          <a href="https://www.instagram.com/mahereidd?igsh=MTZ6MDN4ZzV5Y2Jpaw==" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#E4405F", textDecoration: "none" }}>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
