import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, setTimeLeft }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
        setTime(prevTime => {
            const newTime = prevTime - 1;
            setTimeLeft(newTime);
            return newTime;
        });
    }, 1000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, onTimeUp]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className={`font-mono text-3xl font-bold ${time < 60 ? 'text-blue-600 animate-pulse' : 'text-black'}`}>
      {formatTime(time)}
    </div>
  );
};

export default Timer;