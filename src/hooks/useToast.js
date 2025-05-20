"use client"

import { createContext, useContext, useState, useCallback } from "react"

const ToastContext = createContext({
  toasts: [],
  toast: () => {},
  removeToast: () => {},
})

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, type = "info", duration = 5000 }) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, type, duration }])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return <ToastContext.Provider value={{ toasts, toast, removeToast }}>{children}</ToastContext.Provider>
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Initialize the context with default values
if (typeof window !== "undefined") {
  if (!window.__TOAST_CONTEXT__) {
    window.__TOAST_CONTEXT__ = {
      toasts: [],
      toast: ({ title, description, type, duration }) => {
        console.warn("ToastProvider not found. Toast will not be displayed.")
        return Math.random().toString(36).substring(2, 9)
      },
      removeToast: () => {
        console.warn("ToastProvider not found. Cannot remove toast.")
      },
    }
  }
}

export default useToast
