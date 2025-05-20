"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/useToast"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login failed")
      }

      const userData = await response.json()
      setUser(userData)

      // Check for booking intent in session storage
      const bookingIntent = sessionStorage.getItem("bookingIntent")
      if (bookingIntent) {
        try {
          const { serviceId, packageId } = JSON.parse(bookingIntent)
          if (serviceId && packageId) {
            router.push(`/checkout?serviceId=${serviceId}&packageId=${packageId}`)
            sessionStorage.removeItem("bookingIntent")
          }
        } catch (error) {
          console.error("Error parsing booking intent:", error)
        }
      }

      return userData
    } catch (error) {
      throw error
    }
  }

  const googleLogin = async () => {
    try {
      // Redirect to Google OAuth
      window.location.href = "/api/auth/google"
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Registration failed")
      }

      const newUser = await response.json()
      setUser(newUser)

      // Check for booking intent in session storage
      const bookingIntent = sessionStorage.getItem("bookingIntent")
      if (bookingIntent) {
        try {
          const { serviceId, packageId } = JSON.parse(bookingIntent)
          if (serviceId && packageId) {
            router.push(`/checkout?serviceId=${serviceId}&packageId=${packageId}`)
            sessionStorage.removeItem("bookingIntent")
          }
        } catch (error) {
          console.error("Error parsing booking intent:", error)
        }
      }

      return newUser
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      setUser(null)
      router.push("/")
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    googleLogin,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
