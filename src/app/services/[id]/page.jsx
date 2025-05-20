"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, AccessTime, Check, ArrowBack, ShoppingCart } from "@mui/icons-material"
import { allServices } from "@/data/services"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/useToast"

export default function ServiceDetailPage({ params }) {
  const { id } = params
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would be an API call
    const foundService = allServices.find((s) => s.id.toString() === id)

    if (foundService) {
      // Add packages to the service
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
      setSelectedPackage(foundService.packages[1]) // Default to Standard package
    }

    setLoading(false)
  }, [id])

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to book a service",
        type: "info",
      })

      // Save booking intent to session storage
      sessionStorage.setItem(
        "bookingIntent",
        JSON.stringify({
          serviceId: service.id,
          packageId: selectedPackage.id,
        }),
      )

      router.push("/login")
      return
    }

    // Navigate to checkout with the selected service and package
    router.push(`/checkout?serviceId=${service.id}&packageId=${selectedPackage.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link href="/services">
            <span className="text-blue-600 hover:underline cursor-pointer">Back to all services</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link href="/services">
          <span className="inline-flex items-center text-blue-600 hover:underline mb-6 cursor-pointer">
            <ArrowBack className="mr-2" fontSize="small" /> Back to all services
          </span>
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-64 md:h-96">
            <Image
              src={service.image || "/placeholder.svg?height=600&width=1200"}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
                >
                  {service.name}
                </motion.h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        fontSize="small"
                        className={i < Math.floor(service.rating) ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span>
                    {service.rating} ({Math.floor(Math.random() * 500) + 100} reviews)
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="text-2xl font-bold text-blue-600">Starting from ₹{service.startingPrice}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-semibold mb-4">About this service</h2>
              <p className="text-gray-700 mb-6">
                {service.description} Our professional team ensures high-quality service delivery with attention to
                detail. We use premium products and equipment to deliver exceptional results that exceed your
                expectations. All our professionals are verified, trained, and experienced to handle your requirements
                efficiently.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <AccessTime className="mr-2 text-blue-600" /> Service Duration
                  </h3>
                  <p className="text-gray-700">{service.duration}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">What's Included</h3>
                  <ul className="text-gray-700">
                    <li className="flex items-start mb-1">
                      <Check className="mr-2 text-green-500 flex-shrink-0 mt-0.5" fontSize="small" />
                      <span>Professional service by trained experts</span>
                    </li>
                    <li className="flex items-start mb-1">
                      <Check className="mr-2 text-green-500 flex-shrink-0 mt-0.5" fontSize="small" />
                      <span>Quality equipment and products</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 text-green-500 flex-shrink-0 mt-0.5" fontSize="small" />
                      <span>Service warranty</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-semibold mb-6">Choose a package</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {service.packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ y: -5 }}
                    className={`border rounded-xl p-6 cursor-pointer transition-all ${
                      selectedPackage?.id === pkg.id
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-blue-300"
                    } ${pkg.recommended ? "relative" : ""}`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    {pkg.recommended && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        RECOMMENDED
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-4">₹{pkg.price}</p>

                    <ul className="mb-6 space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="mr-2 text-green-500 flex-shrink-0 mt-0.5" fontSize="small" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-2 rounded-lg transition ${
                        selectedPackage?.id === pkg.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      {selectedPackage?.id === pkg.id ? "Selected" : "Select"}
                    </button>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookNow}
                className="w-full md:w-auto flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition"
              >
                <ShoppingCart className="mr-2" /> Book Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
