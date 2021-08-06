import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(mode, replace = false) {
    setMode(mode);
    // (replace) ? history[history.length-1] = mode : history.push(mode);
    if (replace) {
      setHistory(prev => ([...(prev.slice(0, -1)), mode]));
    } else {
      setHistory(prev => ([...prev, mode]));
    }
  }

  function back() {
    if (history.length === 1) {
      setMode(initial);
    } else {
      history.pop();
      setMode(history[history.length-1]);
    }
  }

  return { mode, transition, back };
}