"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle, Print, Download, ArrowForward, Home } from "@mui/icons-material"
import { useToast } from "@/hooks/useToast"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("id")
  const { toast } = useToast()

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to get booking details
    const fetchBooking = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock booking data
        setBooking({
          id: bookingId || "BK12345678",
          service: "Home Cleaning",
          package: "Standard",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          time: "09:00 AM - 11:00 AM",
          address: "123 Main Street, Apartment 4B, Bangalore, 560001",
          amount: 1499,
          paymentId: "PAY" + Math.random().toString(36).substring(2, 10).toUpperCase(),
          status: "Confirmed",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load booking details",
          type: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingId, toast])

  const handleDownloadReceipt = () => {
    toast({
      title: "Receipt Downloaded",
      description: "Your receipt has been downloaded successfully",
      type: "success",
    })
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <Link href="/">
            <span className="text-blue-600 hover:underline cursor-pointer">Return to home</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="text-green-500" style={{ fontSize: 40 }} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600">
                Your booking has been confirmed and a confirmation email has been sent to your registered email address.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-medium text-gray-800">{booking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-green-600">{booking.status}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="font-medium text-gray-800">{booking.service}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Package</p>
                    <p className="font-medium text-gray-800">{booking.package}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-800">{booking.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-800">{booking.time}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Service Address</p>
                  <p className="font-medium text-gray-800">{booking.address}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount Paid</p>
                    <p className="font-medium text-gray-800">₹{booking.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment ID</p>
                    <p className="font-medium text-gray-800">{booking.paymentId}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h2>

              <div className="space-y-4 text-gray-600">
                <p>
                  <span className="font-medium">1.</span> Our service professional will arrive at your address on the
                  scheduled date and time.
                </p>
                <p>
                  <span className="font-medium">2.</span> You'll receive a reminder notification 24 hours before your
                  service.
                </p>
                <p>
                  <span className="font-medium">3.</span> You can view, reschedule, or cancel this booking from your
                  account dashboard.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadReceipt}
                  className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <Download className="mr-2" fontSize="small" /> Download Receipt
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrintReceipt}
                  className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <Print className="mr-2" fontSize="small" /> Print Receipt
                </motion.button>
              </div>

              <Link href="/bookings">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  View My Bookings <ArrowForward className="ml-2" fontSize="small" />
                </motion.span>
              </Link>
            </div>
          </motion.div>

          <div className="text-center">
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-blue-600 hover:underline cursor-pointer"
              >
                <Home className="mr-2" fontSize="small" /> Return to Home
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
