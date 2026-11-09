"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AlertSeverity } from "@/lib/constants/statuses";
import type { ID, ISODateString } from "@/types/common";

export type NotificationItem = {
  id: ID;
  title: string;
  body: string;
  severity: AlertSeverity;
  read: boolean;
  href: string | null;
  createdAt: ISODateString;
};

type NotificationContextValue = {
  notifications: NotificationItem[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: ID) => void;
  markAllAsRead: () => void;
  dismiss: (id: ID) => void;
  addNotification: (notification: NotificationItem) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

/**
 * In-app notification feed.
 * A real implementation would hydrate this via TanStack Query and subscribe
 * to a websocket or SSE stream for live updates. This provider holds the
 * client-side view of that state.
 */
export function NotificationContextProvider({
  children,
  initialNotifications = [],
}: {
  children: ReactNode;
  initialNotifications?: NotificationItem[];
}) {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const markAsRead = useCallback((id: ID) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismiss = useCallback((id: ID) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((notification: NotificationItem) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount,
      isLoading: false,
      markAsRead,
      markAllAsRead,
      dismiss,
      addNotification,
    }),
    [notifications, unreadCount, markAsRead, markAllAsRead, dismiss, addNotification],
  );

  return (
    <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextValue {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used within a NotificationContextProvider");
  }

  return context;
}
