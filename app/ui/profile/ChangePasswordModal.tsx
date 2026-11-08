"use client";

import { useState } from "react";
import NotificationBar, { Notification, NotificationType } from "@/app/ui/NotificationBar";
import { updateUserPassword } from "@/app/lib/profileActions";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification>({
    type: NotificationType.None,
    message: "",
  });

  if (!isOpen) return null;

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setNotification({ type: NotificationType.None, message: "" });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification({ type: NotificationType.None, message: "" });

    if (!currentPassword) {
      setNotification({ type: NotificationType.Error, message: "Current password is required." });
      return;
    }

    if (newPassword.length < 8) {
      setNotification({ type: NotificationType.Error, message: "Password must be at least 8 characters." });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setNotification({ type: NotificationType.Error, message: "Passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const { error } = await updateUserPassword(newPassword, currentPassword);

      if (error) {
        setNotification({ type: NotificationType.Error, message: error || "Failed to update password." });
        setLoading(false);
        return;
      }

      setLoading(false);
      handleClose();
      onSuccess();
    } catch (err: unknown) {
      setLoading(false);
      setNotification({ type: NotificationType.Error, message: "An unexpected error occurred." });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity"
      role="dialog"
    >
      <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all space-y-4">
        <h3 id="modal-title" className="text-lg font-bold text-gray-900">
          Change Password
        </h3>

        <NotificationBar notification={notification} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-semibold mb-1">
              Current Password <span className="text-red-500">*</span>
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              disabled={loading}
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="filter w-full"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold mb-1">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              disabled={loading}
              placeholder="At least 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="filter w-full"
            />
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-semibold mb-1">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              required
              disabled={loading}
              placeholder="Re-enter password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="filter w-full"
            />
          </div>

          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-5 rounded-md transition text-center cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-ludavault-gold hover:bg-ludavault-blue text-white font-medium py-2 px-5 rounded-md transition text-center cursor-pointer disabled:opacity-50"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
