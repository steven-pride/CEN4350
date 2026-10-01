"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [error, setError] = useState("");

  // Mock initial profile data (will sync with Supabase profiles entity)
   const [formData, setFormData] = useState({
    displayName: "BoardGameFanatic",
    email: "gamer@example.com",
    memberSince: "September 2026",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    let displayName = formData.displayName.trim();

    if(formData.newPassword.length != 0) {
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (formData.newPassword.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
    }

    setFormData({...formData, ["displayName"]:displayName, ["newPassword"]:"", ["confirmNewPassword"]:"", ["currentPassword"]:""} )
  };

  const handleSignOut = () => {
    // Mock sign out: route to login
    router.push("/login");
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
        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

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
        <button
          onClick={handleSignOut}
          className="w-full sm:w-auto text-red-600 hover:bg-red-50 border border-red-200 font-medium py-2 px-5 rounded-md text-sm transition text-center"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
