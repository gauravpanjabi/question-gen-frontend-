import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  onTimerEnd: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [alertShown, setAlertShown] = useState<boolean>(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 10 && !alertShown) {
          setAlertShown(true);
          alert('Just 10 Seconds left');
        }

        if (prevTime <= 0) {
          clearInterval(countdownInterval);
          onTimerEnd(); // Call the callback when timer reaches 00:00
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [alertShown, onTimerEnd]);

  const formatTime = (time: number) => {
    if (time <= 0) {
      return '00:00';
    }

    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <p>Time Left: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default CountdownTimer;

