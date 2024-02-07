import { useEffect, useRef } from "react";

export default function Modal({ open, children }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, []);

  return (
    <dialog ref={dialog} className="modal">
      {children}
    </dialog>
  );
}
