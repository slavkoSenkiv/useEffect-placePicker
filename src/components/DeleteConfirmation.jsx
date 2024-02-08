import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  //const [timeLeft, setTimeLeft] = useState(TIMER);

  /* useEffect(() => {
    setTimeout(() => {
      onConfirm();
    }, TIMER);

  }, [onConfirm]); */
/*   setInterval(() => {
    setTimeLeft((prevTime) => prevTime - 10);
  }, 10); */

  return (
    <div id="delete-confirmation">
      <h2>Delete this place?</h2>
      <p>you can add this place back again</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button">
          no
        </button>
        <button onClick={onConfirm} className="button">
          yes
        </button>
      </div>
      {/* <ProgressBar timer={timeLeft} /> */}
    </div>
  );
}
