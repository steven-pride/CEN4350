"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotificationBar, { Notification, NotificationType } from "@/app/ui/NotificationBar";
import { getUser, updateUserDisplayName, updateUserPassword } from "@/app/lib/profileActions";
import { logout } from "@/app/lib/authActions";

export default function Page() {
  const router = useRouter();

  const [notification, setNotification] = useState<Notification>({
    type: NotificationType.None,
    message: "",
  });

  // Empty formData object with all fields initialized to empty strings
   const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    memberSince: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
  async function loadUserProfile() {
    const { user, error: userError } = await getUser();

    if (userError || !user) {
      router.push("/login");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      displayName: user.user_metadata?.display_name || "",
      email: user.email || "",
      memberSince: user.created_at ? new Date(user.created_at).toLocaleDateString() : "",
    }));
  }

  loadUserProfile();
}, [router]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetNotificationBar = () => {
    setNotification({ type: NotificationType.None, message: "" });
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    resetNotificationBar();
    const displayName = formData.displayName.trim();
    const { user, error: userError } = await getUser();

    if (userError || !user) {
      router.push("/signout");
      return;
    }

    const storedDisplayName = user.user_metadata?.display_name;

    if(formData.newPassword.length != 0) {
      if (formData.newPassword !== formData.confirmNewPassword) {
        setNotification({ type: NotificationType.Error, message: "Passwords do not match." });
        return;
      }

      if (formData.newPassword.length < 8) {
        setNotification({ type: NotificationType.Error, message: "Password must be at least 8 characters." });
        return;
      }

      setNotification({ type: NotificationType.Info, message: "Updating profile..." });
      const { error: updateError } = await updateUserPassword(formData.newPassword, formData.currentPassword);

      if (updateError) {
        setNotification({ type: NotificationType.Error, message: "Failed to update password." });
        return;
      } else {
        setNotification({ type: NotificationType.Success, message: "Password updated successfully." });
      }
    }

    if (displayName !== storedDisplayName) {
      const { error: updateError } = await updateUserDisplayName(displayName);

      if (updateError) {
        setNotification({ type: NotificationType.Error, message: "Failed to update display name." });
        return;
      } else {
        setNotification({ type: NotificationType.Success, message: "Profile updated successfully." });
      }

    }

    setFormData({...formData, ["displayName"]:displayName, ["newPassword"]:"", ["confirmNewPassword"]:"", ["currentPassword"]:""} )
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-ludavault-gold">
          My Profile
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile Card & Form */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-6">
        {/* Notification bar */}
        <NotificationBar notification={notification} />

        <form onSubmit={handleSave} className="space-y-6">
          {/* User Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-semibold mb-1">
              Display Name <span className="text-red-500">*</span>
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              disabled={notification.type === NotificationType.Info}
              value={formData.displayName}
              onChange={handleChange}
              className="filter w-full"
              placeholder="Your display name"
            />
            <p className="text-xs text-gray-500 mt-1">
              This name will be visible on your collection and reviews.
            </p>
          </div>

          {/* Email (Read Only) */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              disabled
              value={formData.email}
              className="filter w-full bg-gray-100 cursor-not-allowed text-gray-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              Managed securely through your Supabase account.
            </p>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">
              New Password
            </label>
            <input
                id="newPassword"
                name="newPassword"
                type="password"
                disabled={notification.type === NotificationType.Info}
                placeholder="At least 8 characters"
                value={formData.newPassword}
                onChange={handleChange}
                className="filter w-full"
            />
          </div>

          {/* Confirm New Password */}
          { formData.newPassword ? (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">
              New Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                required
                disabled={notification.type === NotificationType.Info}
                placeholder="Re-enter password"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="filter w-full"
            />
          </div> ) : ( <div/> )}

          {/* Current Password */}
          { formData.newPassword ? (
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">
              Current Password <span className="text-red-500">*</span>
            </label>
            <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                disabled={notification.type === 3}
                placeholder="Enter your current password"
                value={formData.currentPassword}
                onChange={handleChange}
                className="filter w-full"
            />
          </div> ) : ( <div/> )}

          {/* Member Info */}
          <div className="pt-2 text-sm text-gray-500 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between gap-1">
            <span><strong>Member Since:</strong> {formData.memberSince}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-ludavault-gold hover:bg-ludavault-blue text-white font-medium py-2 px-6 rounded-md shadow-xs transition text-center"
              disabled={notification.type === NotificationType.Info}
            >
              Save Changes
            </button>
            <Link
              href="/games"
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 font-medium py-2 px-6 rounded-md transition text-center"
            >
              Back to Collection
            </Link>
          </div>
        </form>
      </div>

      {/* Account Actions Card */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold text-gray-800">
            Account Session
          </h2>
          <p className="text-xs text-gray-500">
            Sign out of your active session on this device.
          </p>
        </div>
        <Link
          href="/signout"
          className="w-full sm:w-auto text-red-600 hover:bg-red-50 border border-red-200 font-medium py-2 px-5 rounded-md text-sm transition text-center"
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
}
