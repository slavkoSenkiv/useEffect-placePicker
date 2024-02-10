import { useEffect, useState } from "react";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        prevTime = prevTime - 10;
        return prevTime;
      });

      return () => {
        clearInterval(interval);
      };
    }, 10);
  }, []);

  return <progress value={remainingTime} max={timer} />;
}
