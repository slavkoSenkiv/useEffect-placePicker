export default function DeleteConfirmation({ onConfirm, onCancel }) {

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
    </div>
  );
}
