"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowBack, CalendarMonth, LocationOn, CreditCard, Event, Security } from "@mui/icons-material"
import { allServices } from "@/data/services"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/useToast"
import Script from "next/script"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const [service, setService] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    instructions: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [isProcessing, setIsProcessing] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  // Get serviceId and packageId from URL params
  const serviceId = searchParams.get("serviceId")
  const packageId = searchParams.get("packageId")

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to checkout",
        type: "info",
      })

      // Save booking intent to session storage
      if (serviceId && packageId) {
        sessionStorage.setItem(
          "bookingIntent",
          JSON.stringify({
            serviceId,
            packageId,
          }),
        )
      }

      router.push("/login")
      return
    }

    // Find service and package
    if (serviceId) {
      const foundService = allServices.find((s) => s.id.toString() === serviceId)

      if (foundService) {
        // Add packages to the service (in a real app, this would come from the API)
        foundService.packages = [
          {
            id: 1,
            name: "Basic",
            price: foundService.startingPrice,
            description: "Essential service package",
            features: ["Standard service", "30-day warranty", "Customer support"],
          },
          {
            id: 2,
            name: "Standard",
            price: foundService.startingPrice * 1.5,
            description: "Most popular choice",
            features: ["Premium service", "60-day warranty", "Priority customer support", "Free follow-up visit"],
            recommended: true,
          },
          {
            id: 3,
            name: "Premium",
            price: foundService.startingPrice * 2,
            description: "Comprehensive service package",
            features: [
              "Premium service with additional benefits",
              "90-day warranty",
              "24/7 customer support",
              "Free follow-up visits",
              "Extended service hours",
            ],
          },
        ]

        setService(foundService)

        // Find selected package
        if (packageId) {
          const foundPackage = foundService.packages.find((p) => p.id.toString() === packageId)
          if (foundPackage) {
            setSelectedPackage(foundPackage)
          } else {
            setSelectedPackage(foundService.packages[0]) // Default to first package
          }
        } else {
          setSelectedPackage(foundService.packages[0]) // Default to first package
        }
      }
    }

    // Check for booking intent in session storage after login
    const checkBookingIntent = () => {
      const bookingIntent = sessionStorage.getItem("bookingIntent")
      if (bookingIntent && isAuthenticated) {
        try {
          const { serviceId, packageId } = JSON.parse(bookingIntent)
          if (serviceId && packageId && (!searchParams.get("serviceId") || !searchParams.get("packageId"))) {
            router.push(`/checkout?serviceId=${serviceId}&packageId=${packageId}`)
            sessionStorage.removeItem("bookingIntent")
          }
        } catch (error) {
          console.error("Error parsing booking intent:", error)
        }
      }
    }

    checkBookingIntent()
    setLoading(false)
  }, [serviceId, packageId, isAuthenticated, router, toast, searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Calculate pricing
  const subtotal = selectedPackage?.price || 0
  const taxRate = 0.18 // 18% GST
  const tax = subtotal * taxRate
  const total = subtotal + tax

  // Function to initialize Razorpay
  const initializeRazorpay = useCallback(() => {
    if (!window.Razorpay) {
      console.error("Razorpay SDK failed to load")
      return false
    }
    return true
  }, [])

  // Function to handle Razorpay payment
  const handleRazorpayPayment = useCallback(async () => {
    if (!initializeRazorpay()) {
      toast({
        title: "Payment Failed",
        description: "Razorpay SDK failed to load. Please try again later.",
        type: "error",
      })
      return
    }

    setIsProcessing(true)

    try {
      // In a real app, this would be an API call to create an order
      // For demo purposes, we're creating the order client-side
      const orderData = {
        amount: Math.round(total * 100), // Razorpay expects amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      }

      // Simulate API call to create order
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock order ID
      const orderId = `order_${Math.random().toString(36).substring(2, 15)}`

      const options = {
        key: "rzp_test_YourRazorpayTestKey", // Replace with your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ServiceHub",
        description: `Payment for ${service?.name} - ${selectedPackage?.name} Package`,
        order_id: orderId,
        handler: (response) => {
          // Handle successful payment
          handlePaymentSuccess(response)
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: formData.phone || "",
        },
        notes: {
          address: formData.address,
          service_id: service?.id,
          package_id: selectedPackage?.id,
        },
        theme: {
          color: "#2563EB",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
              type: "info",
            })
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Error creating Razorpay order:", error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        type: "error",
      })
      setIsProcessing(false)
    }
  }, [initializeRazorpay, total, service, selectedPackage, user, formData, toast])

  // Function to handle successful payment
  const handlePaymentSuccess = async (response) => {
    try {
      // In a real app, this would be an API call to verify payment
      // For demo purposes, we're simulating the verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a random booking ID
      const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase()

      toast({
        title: "Payment Successful!",
        description: `Your booking ID is ${bookingId}. A confirmation email has been sent.`,
        type: "success",
      })

      // Redirect to booking confirmation page
      router.push(`/booking-confirmation?id=${bookingId}`)
    } catch (error) {
      console.error("Error verifying payment:", error)
      toast({
        title: "Payment Verification Failed",
        description: "There was an error verifying your payment. Please contact support.",
        type: "error",
      })
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.date ||
      !formData.time ||
      !formData.address ||
      !formData.city ||
      !formData.pincode ||
      !formData.phone
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        type: "error",
      })
      return
    }

    if (paymentMethod === "razorpay") {
      handleRazorpayPayment()
    } else {
      setIsProcessing(true)

      try {
        // In a real app, this would be an API call to process payment and create booking
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Generate a random booking ID
        const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase()

        toast({
          title: "Booking Successful!",
          description: `Your booking ID is ${bookingId}. A confirmation email has been sent.`,
          type: "success",
        })

        // Redirect to booking confirmation page
        router.push(`/booking-confirmation?id=${bookingId}`)
      } catch (error) {
        toast({
          title: "Booking Failed",
          description: "There was an error processing your booking. Please try again.",
          type: "error",
        })
      } finally {
        setIsProcessing(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!service || !selectedPackage) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link href="/services">
            <span className="text-blue-600 hover:underline cursor-pointer">Browse all services</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Load Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onLoad={() => setRazorpayLoaded(true)} />

      <div className="container mx-auto px-4">
        <Link href={`/services/${service.id}`}>
          <span className="inline-flex items-center text-blue-600 hover:underline mb-6 cursor-pointer">
            <ArrowBack className="mr-2" fontSize="small" /> Back to service details
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6 md:p-8"
            >
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

              <form onSubmit={handleSubmit}>
                {/* Service Date and Time */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <CalendarMonth className="mr-2 text-blue-600" /> Schedule Service
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Time *
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a time slot</option>
                        <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                        <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                        <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                        <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Service Address */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <LocationOn className="mr-2 text-blue-600" /> Service Address
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="House/Flat No., Building Name, Street"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{6}"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10-digit mobile number"
                      />
                    </div>

                    <div>
                      <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        id="instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Any specific requirements or instructions for the service professional"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <CreditCard className="mr-2 text-blue-600" /> Payment Method
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="razorpay"
                        name="paymentMethod"
                        type="radio"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="razorpay" className="ml-3 block text-gray-700">
                        Razorpay (Credit/Debit Card, UPI, Netbanking)
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="card"
                        name="paymentMethod"
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="card" className="ml-3 block text-gray-700">
                        Credit/Debit Card (Direct)
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="upi"
                        name="paymentMethod"
                        type="radio"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="upi" className="ml-3 block text-gray-700">
                        UPI
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="netbanking"
                        name="paymentMethod"
                        type="radio"
                        checked={paymentMethod === "netbanking"}
                        onChange={() => setPaymentMethod("netbanking")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="netbanking" className="ml-3 block text-gray-700">
                        Net Banking
                      </label>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            placeholder="John Doe"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                      <div>
                        <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          id="upiId"
                          placeholder="yourname@upi"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                      <div>
                        <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
                          Select Bank
                        </label>
                        <select
                          id="bank"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select your bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center text-sm text-gray-600">
                    <Security className="mr-2 text-gray-500" fontSize="small" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing || (paymentMethod === "razorpay" && !razorpayLoaded)}
                  className="w-full bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 md:p-8 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

              <div className="flex items-start mb-6">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden mr-4">
                  <Image
                    src={service.image || "/placeholder.svg?height=200&width=200"}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{service.name}</h3>
                  <p className="text-gray-600">{selectedPackage.name} Package</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="text-gray-800">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Event className="mr-2 text-blue-600" fontSize="small" />
                  <span className="font-medium text-gray-800">Service Details</span>
                </div>
                <ul className="text-gray-600 space-y-2 mt-2">
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Duration: {service.duration}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Warranty: {selectedPackage.features.find((f) => f.includes("warranty"))}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Cancellation: Free up to 4 hours before service</span>
                  </li>
                </ul>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  By proceeding with the payment, you agree to our{" "}
                  <Link href="/terms-of-service">
                    <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span>
                  </Link>{" "}
                  and{" "}
                  <Link href="/refund-policy">
                    <span className="text-blue-600 hover:underline cursor-pointer">Refund Policy</span>
                  </Link>
                  .
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
