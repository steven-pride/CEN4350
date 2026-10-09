"use client";

import { useState } from "react";
import Link from "next/link";
import NotificationBar, { Notification, NotificationType } from "@/app/ui/NotificationBar";
import { signup } from "../lib/authActions";

export default function Page() {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setNotification({ type: NotificationType.Error, message: "Passwords do not match." });
      return;
    }

    if (formData.password.length < 8) {
      setNotification({ type: NotificationType.Error, message: "Password must be at least 8 characters." });
      return;
    }

    setNotification({ type: NotificationType.Info, message: "Creating your account..." });
    
    const signUpError = await signup({
      email: formData.email,
      password: formData.password,
      displayName: formData.displayName,
    });

    if (signUpError) {
      setNotification({ type: NotificationType.Error, message: signUpError });
      return;
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 my-8">
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-xs space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-ludavault-gold">
            Create an Account
          </h1>
          <p className="text-sm">
            Start cataloging and tracking your board game vault today.
          </p>
        </div>

        {/* Notification bar */}
        <NotificationBar notification={notification} />

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-semibold mb-1">
              Display Name <span className="text-red">*</span>
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              disabled={notification.type === NotificationType.Info}
              placeholder="e.g. MeepleMaster"
              value={formData.displayName}
              onChange={handleChange}
              className="filter w-full"
            />
          </div>

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
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              className="filter w-full"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">
              Confirm Password <span className="text-red">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              disabled={notification.type === NotificationType.Info}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="filter w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-ludavault-gold hover:bg-ludavault-blue text-white font-medium py-2.5 px-4 rounded-md shadow-xs transition text-center"
            disabled={notification.type === NotificationType.Info}
          >
            Sign Up
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm border-t border-gray-100 pt-4">
          {"Already have an account? "}
          <Link href="/login" className="text-blue-700 font-semibold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
