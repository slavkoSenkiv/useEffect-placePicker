import { useEffect, useState } from "react";

export default function ProgressBar({ timer}) {
  const [countdown, setCountdown] = useState(timer);
  return <progress value={countdown} max={timer} />;
}
