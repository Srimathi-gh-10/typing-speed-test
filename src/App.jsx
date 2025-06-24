import React, { useState, useEffect } from "react";
import TypingBox from "./components/TypingBox";
import passages from "./data/passages";
import "./styles/App.css";

const App = () => {
  const [text, setText] = useState(passages[0]);
  const [strictMode, setStrictMode] = useState(true);
  const [key, setKey] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.body.className = storedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const restartTest = () => {
    const newText = passages[Math.floor(Math.random() * passages.length)];
    setText(newText);
    setKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <div className="top-bar">
        <h1 className="title">🔥 Typing Speed Test</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="text-box">{text}</div>

      <TypingBox key={key} text={text} strictMode={strictMode} />

      <div className="btns">
        <button onClick={restartTest}>🔁 Restart</button>
        <button onClick={() => setStrictMode(!strictMode)}>
          {strictMode ? "🚫 Strict Mode ON" : "✅ Strict Mode OFF"}
        </button>
      </div>
    </div>
  );
};

export default App;