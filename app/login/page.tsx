"use client";

import { useState } from "react";
import Link from "next/link";
import NotificationBar, { Notification, NotificationType } from "@/app/ui/NotificationBar";
import { login } from "@/app/lib/authActions";


export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [notification, setNotification] = useState<Notification>({
    type: NotificationType.None,
    message: "",
  });

  const resetNotificationBar = () => {
    setNotification({ type: NotificationType.None, message: "" });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetNotificationBar();

    if (!formData.email || !formData.password) {
      setNotification({ type: NotificationType.Error, message: "Please fill in both email and password." });
      return;
    }

    setNotification({ type: NotificationType.Info, message: "Logging in..." });
    const signInError = await login(formData);
     if (signInError) {
      setNotification({ type: NotificationType.Error, message: signInError });
      return;
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 my-8">
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-xs space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-ludavault-gold">
            Welcome Back
          </h1>
          <p className="text-sm">
            Log in to access your LudaVault board game collection.
          </p>
        </div>

        {/* Notification bar */}
        <NotificationBar notification={notification} />

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email Address <span className="text-red">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={notification.type === NotificationType.Info}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="filter w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">
              Password <span className="text-red">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={notification.type === NotificationType.Info}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="filter w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={notification.type === NotificationType.Info}
            className="w-full bg-ludavault-gold hover:bg-ludavault-blue text-white font-medium py-2.5 px-4 rounded-md shadow-xs transition text-center"
          >
            Log In
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm border-t border-gray-100 pt-4">
          {"Don't have an account? "}
          <Link href="/signup" className="text-blue-700 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
