import toast from "react-hot-toast";
import ConfirmToast from "./ConfirmToast";

export function showConfirmToast({ message, onConfirm, onCancel }) {
  toast.custom((t) => (
    <ConfirmToast
      id={t.id}
      message={message}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  ));
}
