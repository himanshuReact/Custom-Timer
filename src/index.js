import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  });
  return seconds;
};

const Timer = () => {
  const seconds = useTimer();
  return (
    <div className="App">
      <div>Seconds: {seconds} </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Timer />, rootElement);
