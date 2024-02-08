import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect;

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
      <ProgressBar timer={TIMER} />
    </div>
  );
}
