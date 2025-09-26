import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to backend
  const sendMessage = async () => {
  if (!question.trim()) return;

  setMessages(prev => [...prev, { from: "user", text: question }]);
  setLoading(true);

  try {
    const res = await axios.post(
      "http://10.11.245.204:3000/api/chatbot",
      { prompt: question },
      { headers: { "Content-Type": "application/json" } }
    );
    const botText = res.data.answer || "Sorry, I couldn't process that.";
    setMessages(prev => [...prev, { from: "bot", text: botText }]);
  } catch (err) {
    console.error("Chatbot error:", err);
    setMessages(prev => [
      ...prev,
      { from: "bot", text: "⚠️ Error: Unable to connect to backend." },
    ]);
  } finally {
    setLoading(false);
    setQuestion("");
  }
};

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.from === "user" ? "user" : "bot"}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about users..."
          className="input-field"
          disabled={loading}
        />
        <button onClick={sendMessage} className="send-button" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>

      {/* Inline styles */}
      <style>{`
        .chatbot-container {
          max-width: 500px;
          margin: 40px auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }

        .chat-window {
          height: 400px;
          overflow-y: auto;
          padding: 16px;
          background: #f9f9f9;
        }

        .message {
          margin: 8px 0;
          padding: 10px 14px;
          border-radius: 18px;
          max-width: 70%;
          font-size: 14px;
          word-wrap: break-word;
        }

        .user {
          background: #1e88e5;
          color: #fff;
          margin-left: auto;
        }

        .bot {
          background: #e0e0e0;
          color: #000;
          margin-right: auto;
        }

        .input-container {
          display: flex;
          border-top: 1px solid #ddd;
          padding: 10px;
          background: #fff;
        }

        .input-field {
          flex: 1;
          border: 1px solid #ccc;
          border-radius: 25px;
          padding: 10px;
          outline: none;
        }

        .send-button {
          background: #1e88e5;
          border: none;
          color: white;
          padding: 10px 18px;
          margin-left: 10px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 14px;
        }

        .send-button:disabled {
          background: #aaa;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
