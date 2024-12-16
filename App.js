import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [flagTimes, setFlagTimes] = useState([]);

  useEffect(() => {
    let timer;
    if (!paused) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [paused]);

  const toggleStartStop = () => {
    setPaused((prevPaused) => {
      if (prevPaused) {
        setTime(0);
      }
      return !prevPaused;
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString()}:${secs.toString()}`;

  };

  const flagTime = () => {
    setFlagTimes([...flagTimes, formatTime(time)]);
  };

  const clearFlags = () => {
    setFlagTimes([]);
    setTime(0);
    setPaused(true);
  };

  return (
    <div>
      <h1>Timer</h1>
      <p>{formatTime(time)}</p>
      <button onClick={toggleStartStop}>{paused ? 'Start' : 'Stop'}</button>
      <button onClick={flagTime}>Flag</button>
      <button onClick={clearFlags}>Clear</button>
      <div>
        <ol>
          {flagTimes.map((flagTime) => (
            <li>{flagTime}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
