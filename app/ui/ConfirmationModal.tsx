"use client";

import clsx from "clsx";
import { useState } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  disabled?: boolean
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity"
      role="dialog"
    >
      <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
        <h3 id="modal-title" className="text-lg font-bold text-gray-900">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          {message}
        </p>
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-5 rounded-md transition text-center cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {setIsDeleting(true); onConfirm();}}
            disabled={isDeleting}
            className={clsx('w-full sm:w-auto font-medium py-2 px-5 rounded-md text-white transition text-center cursor-pointer disabled:opacity-50', { 'bg-red-700 hover:bg-red-600': isDanger, 'bg-ludavault-gold hover:bg-ludavault-blue': !isDanger })} 
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
