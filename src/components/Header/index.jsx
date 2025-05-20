"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Close, Person, ShoppingCart } from "@mui/icons-material"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/useToast"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out successfully",
        type: "success",
      })
    } catch (error) {
      toast({
        title: "Failed to logout",
        description: error.message,
        type: "error",
      })
    }
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md text-gray-800" : "bg-transparent text-white"}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer">ServiceHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services">
              <span className="hover:text-blue-400 transition cursor-pointer">Services</span>
            </Link>
            <Link href="/about">
              <span className="hover:text-blue-400 transition cursor-pointer">About</span>
            </Link>
            <Link href="/contact">
              <span className="hover:text-blue-400 transition cursor-pointer">Contact</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/bookings">
                  <span className="hover:text-blue-400 transition cursor-pointer flex items-center">
                    <ShoppingCart className="mr-1" fontSize="small" />
                    My Bookings
                  </span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 hover:text-blue-400 transition">
                    <Person fontSize="small" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile">
                      <span className="block px-4 py-2 text-gray-800 hover:bg-blue-50 cursor-pointer">Profile</span>
                    </Link>
                    {user.role === "admin" && (
                      <Link href="/admin">
                        <span className="block px-4 py-2 text-gray-800 hover:bg-blue-50 cursor-pointer">
                          Admin Dashboard
                        </span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <span className="hover:text-blue-400 transition cursor-pointer">Login</span>
                </Link>
                <Link href="/signup">
                  <span
                    className={`px-4 py-2 rounded-lg ${isScrolled ? "bg-blue-600 text-white" : "bg-white text-blue-600"} hover:bg-opacity-90 transition cursor-pointer`}
                  >
                    Sign Up
                  </span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white text-gray-800"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <Link href="/services" onClick={() => setIsMenuOpen(false)}>
                <span className="block py-2 hover:text-blue-600 transition cursor-pointer">Services</span>
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                <span className="block py-2 hover:text-blue-600 transition cursor-pointer">About</span>
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <span className="block py-2 hover:text-blue-600 transition cursor-pointer">Contact</span>
              </Link>

              {user ? (
                <>
                  <Link href="/bookings" onClick={() => setIsMenuOpen(false)}>
                    <span className="block py-2 hover:text-blue-600 transition cursor-pointer">My Bookings</span>
                  </Link>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    <span className="block py-2 hover:text-blue-600 transition cursor-pointer">Profile</span>
                  </Link>
                  {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                      <span className="block py-2 hover:text-blue-600 transition cursor-pointer">Admin Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="block py-2 text-left text-red-600 hover:text-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <span className="block py-2 hover:text-blue-600 transition cursor-pointer">Login</span>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <span className="block py-2 px-4 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition cursor-pointer">
                      Sign Up
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
