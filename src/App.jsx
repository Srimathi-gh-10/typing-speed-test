import React, { useState } from "react";
import TypingBox from "./components/TypingBox";
import passages from "./data/passages";
import "./styles/App.css";

const App = () => {
  const [text, setText] = useState(passages[0]);
  const [strictMode, setStrictMode] = useState(true);
  const [key, setKey] = useState(0); // force reset

  const restartTest = () => {
    const newText = passages[Math.floor(Math.random() * passages.length)];
    setText(newText);
    setKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <h1 className="title">🔥 Typing Speed Test</h1>

      <div className="text-box">
        {text}
      </div>

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