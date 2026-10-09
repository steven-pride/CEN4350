"use client";

import { clsx } from "clsx";

export default function NotificationBar({ notification }: NotificationBarProps) {
    if (!notification || notification.type === NotificationType.None || !notification.message) {
    return null;
  }
    return (
        <div className={clsx('p-3 border text-sm rounded-md', { 'bg-red-50 border-red-200 text-red-700': notification.type === NotificationType.Error, 'bg-green-50 border-green-200 text-green-700': notification.type === NotificationType.Success, 'bg-gray-50 border-gray-200 text-gray-700': notification.type === NotificationType.Info })}>
            {notification.message}
        </div>
    );
}

export enum NotificationType {
  None = 0,
  Error = 1,
  Success = 2,
  Info = 3
}

export type Notification = {
    type: NotificationType;
    message: string;
}

export interface NotificationBarProps {
    notification: Notification;
}