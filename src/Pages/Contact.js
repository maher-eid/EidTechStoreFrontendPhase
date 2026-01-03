export default function Contact() {
 

  return (
    <div
      style={{
        padding: "24px",           
        maxWidth: "640px",        
        margin: "24px auto",        
        textAlign: "center",       
      }}
    >
      <h2 style={{ marginBottom: 8 }}>Contact</h2>
     

      <p style={{ color: "#475569", marginBottom: 12 }}>
        Questions or support? 
      </p>
      
      <form style={{ display: "flex", flexDirection: "column", gap: 10 }}>
       
        <input
          type="text"
          placeholder="Your Name"
          style={{
            padding: 10,                 
            borderRadius: 6,             
            border: "1px solid #e6e6e6",  
          }}
        />
      
        <input
          type="email"
          placeholder="Your Email"
          style={{
            padding: 10,
            borderRadius: 6,
            border: "1px solid #e6e6e6",
          }}
        />
        



        <textarea
          rows={4}
          placeholder="Message"
          style={{
            padding: 10,
            borderRadius: 6,
            border: "1px solid #e6e6e6",
          }}
        />
       
        <button
          type="submit"
          style={{
            padding: 10,             
            borderRadius: 6,          
            background: "#0b5ed7",    
            color: "white",           
            border: "none",           
          }}
        >
          Send
        </button>
        
      </form>
    </div>
  );
}
