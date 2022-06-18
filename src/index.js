import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const useCustomTimer = (maxTime) => {
  const [isRunning, setRunning] = useState(false);

  const [seconds, setSeconds] = useState(maxTime);
  let intervalIdRef = useRef(null);

  const handleStart = useCallback(() => {
    setRunning(true);
    console.log("start clicked");
    intervalIdRef.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  }, [setSeconds, setRunning]);
  const handleStop = useCallback(() => {
    console.log("stop clicked");
    setRunning(false);
    clearInterval(intervalIdRef.current);
    setSeconds(maxTime);
  }, [setSeconds, setRunning, maxTime]);

  useEffect(() => {
    if (seconds < 1) {
      // setRunning(false);
      // clearInterval(intervalIdRef.current);
      // setSeconds(maxTime);
      handleStop();
    }
  }, [seconds, handleStop]);

  useEffect(() => {
    // clear interval when component unmount happens
    return () => intervalIdRef && clearInterval(intervalIdRef.current);
  }, []);

  return {
    isRunning,
    handleStart,
    handleStop,
    seconds
  };
};

const Timer = () => {
  const { isRunning, handleStart, handleStop, seconds } = useCustomTimer(5);

  return (
    <div className="App">
      <div>Seconds: {seconds} </div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>End</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Timer />, rootElement);
