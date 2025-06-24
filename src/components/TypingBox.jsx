import React, { useState, useEffect, useRef } from 'react';

const TypingBox = ({ text, strictMode }) => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (input.length > 1) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const words = input.trim().split(/\s+/).length;
      const cps = Math.round(input.length / ((Date.now() - startTime) / 1000));
      const wpm = Math.round(words / elapsedMinutes);
      setSpeed(cps); // update WPM below if preferred

      let correct = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] === text[i]) correct++;
      }
      setAccuracy(Math.round((correct / input.length) * 100));
    }
  }, [input]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (strictMode) {
      for (let i = 0; i < val.length; i++) {
        if (val[i] !== text[i]) return;
      }
    }
    setInput(val);
  };

  const timer = startTime ? `${Math.floor((Date.now() - startTime) / 1000)}s` : '0s';

  return (
    <>
      <textarea
        ref={inputRef}
        rows="4"
        placeholder="Start Typing..."
        value={input}
        onChange={handleChange}
      />
      <div className="stats">
        <div><strong>Speed</strong><br />{speed} <span className="sub">CPS</span></div>
        <div><strong>Accuracy</strong><br /><span style={{ color: 'lime' }}>{accuracy}%</span></div>
        <div><strong>WPM</strong><br />{Math.round((input.trim().split(/\s+/).length / ((Date.now() - startTime || 1) / 60000)) || 0)}</div>
      </div>
      <div className="time-btn">
        <button className="btn time">🕒 Time: {timer}</button>
      </div>
    </>
  );
};

export default TypingBox;