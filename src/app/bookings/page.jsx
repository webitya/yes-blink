"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  CalendarMonth,
  AccessTime,
  LocationOn,
  CheckCircle,
  Cancel,
  Schedule,
  Download,
  ArrowForward,
  Search,
} from "@mui/icons-material"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/useToast"

export default function BookingsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to view your bookings",
        type: "info",
      })
      router.push("/login")
      return
    }

    // In a real app, this would be an API call to get user's bookings
    const fetchBookings = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock booking data
        const mockBookings = [
          {
            id: "BK12345678",
            service: "Home Cleaning",
            package: "Standard",
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            time: "09:00 AM - 11:00 AM",
            address: "123 Main Street, Apartment 4B, Bangalore, 560001",
            amount: 1499,
            status: "Confirmed",
            image: "/placeholder.svg?height=200&width=200",
          },
          {
            id: "BK23456789",
            service: "Plumbing Service",
            package: "Basic",
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            time: "02:00 PM - 04:00 PM",
            address: "123 Main Street, Apartment 4B, Bangalore, 560001",
            amount: 699,
            status: "Confirmed",
            image: "/placeholder.svg?height=200&width=200",
          },
          {
            id: "BK34567890",
            service: "AC Repair",
            package: "Premium",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            time: "10:00 AM - 12:00 PM",
            address: "123 Main Street, Apartment 4B, Bangalore, 560001",
            amount: 1999,
            status: "Completed",
            image: "/placeholder.svg?height=200&width=200",
          },
          {
            id: "BK45678901",
            service: "Pest Control",
            package: "Standard",
            date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            time: "11:00 AM - 01:00 PM",
            address: "123 Main Street, Apartment 4B, Bangalore, 560001",
            amount: 899,
            status: "Completed",
            image: "/placeholder.svg?height=200&width=200",
          },
          {
            id: "BK56789012",
            service: "Electrical Repair",
            package: "Basic",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            time: "03:00 PM - 05:00 PM",
            address: "123 Main Street, Apartment 4B, Bangalore, 560001",
            amount: 599,
            status: "Cancelled",
            image: "/placeholder.svg?height=200&width=200",
          },
        ]

        setBookings(mockBookings)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load bookings",
          type: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [isAuthenticated, router, toast])

  const handleDownloadReceipt = (bookingId) => {
    toast({
      title: "Receipt Downloaded",
      description: "Your receipt has been downloaded successfully",
      type: "success",
    })
  }

  const handleCancelBooking = (bookingId) => {
    // In a real app, this would be an API call to cancel the booking
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully",
      type: "success",
    })

    // Update booking status in the UI
    setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking)))
  }

  const handleRescheduleBooking = (bookingId) => {
    toast({
      title: "Reschedule Booking",
      description: "You'll be redirected to reschedule your booking",
      type: "info",
    })
  }

  // Filter bookings based on active tab and search term
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "upcoming") {
      return (booking.status === "Confirmed" || booking.status === "Rescheduled") && matchesSearch
    } else if (activeTab === "completed") {
      return booking.status === "Completed" && matchesSearch
    } else if (activeTab === "cancelled") {
      return booking.status === "Cancelled" && matchesSearch
    }

    return matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Bookings</h1>

            <div className="relative">
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fontSize="small" />
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-4 px-4 text-center font-medium ${
                  activeTab === "upcoming"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`flex-1 py-4 px-4 text-center font-medium ${
                  activeTab === "completed"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
              <button
                className={`flex-1 py-4 px-4 text-center font-medium ${
                  activeTab === "cancelled"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("cancelled")}
              >
                Cancelled
              </button>
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming bookings."
                  : activeTab === "completed"
                    ? "You don't have any completed bookings."
                    : "You don't have any cancelled bookings."}
              </p>
              <Link href="/services">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Book a Service
                </motion.span>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden">
                          <Image
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.service}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="md:w-3/4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">{booking.service}</h3>
                            <p className="text-gray-600">{booking.package} Package</p>
                          </div>

                          <div className="mt-2 md:mt-0">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "Completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : booking.status === "Cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {booking.status === "Confirmed" && <CheckCircle className="mr-1" fontSize="small" />}
                              {booking.status === "Completed" && <CheckCircle className="mr-1" fontSize="small" />}
                              {booking.status === "Cancelled" && <Cancel className="mr-1" fontSize="small" />}
                              {booking.status === "Rescheduled" && <Schedule className="mr-1" fontSize="small" />}
                              {booking.status}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <CalendarMonth className="mr-2 text-blue-600" fontSize="small" />
                            <span className="text-gray-700">{booking.date}</span>
                          </div>

                          <div className="flex items-center">
                            <AccessTime className="mr-2 text-blue-600" fontSize="small" />
                            <span className="text-gray-700">{booking.time}</span>
                          </div>

                          <div className="flex items-center">
                            <span className="font-medium text-gray-800">₹{booking.amount.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex items-start mb-4">
                          <LocationOn className="mr-2 text-blue-600 flex-shrink-0 mt-0.5" fontSize="small" />
                          <span className="text-gray-700">{booking.address}</span>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                          <Link href={`/booking-details/${booking.id}`}>
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 cursor-pointer"
                            >
                              View Details <ArrowForward className="ml-1" fontSize="small" />
                            </motion.span>
                          </Link>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDownloadReceipt(booking.id)}
                            className="inline-flex items-center text-gray-600 hover:text-gray-800"
                          >
                            <Download className="mr-1" fontSize="small" /> Receipt
                          </motion.button>

                          {booking.status === "Confirmed" && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRescheduleBooking(booking.id)}
                                className="inline-flex items-center text-yellow-600 hover:text-yellow-700"
                              >
                                <Schedule className="mr-1" fontSize="small" /> Reschedule
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCancelBooking(booking.id)}
                                className="inline-flex items-center text-red-600 hover:text-red-700"
                              >
                                <Cancel className="mr-1" fontSize="small" /> Cancel
                              </motion.button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Bookings CTA */}
          {bookings.length === 0 && (
            <div className="mt-8 bg-blue-50 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Ready to book your first service?</h3>
              <p className="text-blue-600 mb-6">
                Explore our wide range of professional services and book your first appointment today.
              </p>
              <Link href="/services">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Browse Services
                </motion.span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
