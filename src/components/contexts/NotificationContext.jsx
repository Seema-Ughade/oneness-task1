
import { createContext, useContext, useState } from "react"

// Notification Context
const NotificationContext = createContext()

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  // Generate a unique ID for each notification
  const generateId = () => Math.random().toString(36).substring(2, 9)

  // Add a new notification
  const addNotification = (title, message, type = "success") => {
    const id = generateId()

    setNotifications((prev) => [
      ...prev,
      {
        id,
        title,
        message,
        type,
      },
    ])

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      dismissNotification(id)
    }, 3000)

    return id
  }

  // Dismiss a notification by ID
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const notificationContext = {
    notifications,
    addNotification,
    dismissNotification,
  }

  return <NotificationContext.Provider value={notificationContext}>{children}</NotificationContext.Provider>
}

// Custom hook to use notification context
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

