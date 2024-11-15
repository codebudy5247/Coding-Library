import { useState } from "react";
import { useSocket } from "./socketContext";

function App() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: "5px" }}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          style={{
            width: "200px",
            padding: "10px",
            height: "20px",
            border: "1px solid",
            borderRadius: "20px",
          }}
        />
        <button
          onClick={() => sendMessage(message)}
          style={{
            marginLeft: "10px",
            padding: "10px",
            border: "1px solid",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
      <div>
        <h1>All Messages:</h1>
        {messages.map((e,index) => (
          <li key={index}>{e}</li>
        ))}
      </div>
    </div>
  );
}

export default App;
