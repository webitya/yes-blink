"use client"

import { useToast } from "@/hooks/useToast"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Error, Info, Close } from "@mui/icons-material"
import { useEffect, useState } from "react"

export function Toaster() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

const toastIcons = {
  success: <CheckCircle className="text-green-500" />,
  error: <Error className="text-red-500" />,
  info: <Info className="text-blue-500" />,
}

const toastClasses = {
  success: "border-green-500 bg-green-50",
  error: "border-red-500 bg-red-50",
  info: "border-blue-500 bg-blue-50",
}

function Toast({ toast, onClose }) {
  const [progress, setProgress] = useState(100)
  const { id, title, description, type = "info", duration = 5000 } = toast

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 100 / (duration / 100)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [duration, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-lg border p-4 shadow-md ${toastClasses[type]} text-gray-800`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{toastIcons[type]}</div>
        <div className="flex-1">
          {title && <h3 className="font-medium">{title}</h3>}
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        <button onClick={onClose} className="flex-shrink-0 rounded-full p-1 hover:bg-gray-200 transition">
          <Close fontSize="small" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
        <div
          className={`h-full ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}
