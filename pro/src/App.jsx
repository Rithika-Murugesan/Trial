// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import SignupPage from "./Components/SignUpPage.jsx";
import Chatbot from "./Components/chatbot.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/bot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
