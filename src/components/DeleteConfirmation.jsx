import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timeout);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Delete this place?</h2>
      <p>you can add this place back again</p>
      <div id="confirmation-actions">
        <ProgressBar timer={TIMER} />
        <button onClick={onCancel} className="button">
          no
        </button>
        <button onClick={onConfirm} className="button">
          yes
        </button>
      </div>
    </div>
  );
}
