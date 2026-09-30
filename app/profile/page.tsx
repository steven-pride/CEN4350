"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // Mock initial profile data (will sync with Supabase profiles entity)
  const [profile, setProfile] = useState({
    displayName: "BoardGameFanatic",
    email: "gamer@example.com",
    memberSince: "September 2026",
  });

  const [displayName, setDisplayName] = useState(profile.displayName);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      displayName: displayName.trim(),
    }));
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
        <p className="mt-1 text-sm sm:text-base">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile Card & Form */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* User Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-semibold mb-1">
              Display Name <span className="text-red">*</span>
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="filter w-full"
              placeholder="Your display name"
            />
            <p className="text-xs mt-1">
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
              value={profile.email}
              className="filter w-full bg-gray-100 cursor-not-allowed"
            />
            <p className="text-xs mt-1">
              Managed securely through your Supabase account.
            </p>
          </div>

          {/* Member Info */}
          <div className="pt-2 text-sm border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between gap-1">
            <span><strong>Member Since:</strong> {profile.memberSince}</span>
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
          <h2 className="font-semibold">
            Account Session
          </h2>
          <p className="text-xs">
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
