"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Search, FilterList } from "@mui/icons-material"
import { allServices } from "@/data/services"

export default function ServicesPage() {
  const [services, setServices] = useState(allServices)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const categories = ["All", "Cleaning", "Repair", "Installation", "Maintenance", "Renovation"]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    if (window.innerWidth < 768) {
      setIsFiltersOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Our Professional Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-blue-100 mb-6"
            >
              Find the perfect service for your home needs
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search for a service..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition">
                <Search />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200"
            >
              <FilterList /> {isFiltersOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters Sidebar */}
          <motion.div
            className={`md:w-1/4 bg-white p-6 rounded-xl shadow-sm ${isFiltersOpen ? "block" : "hidden md:block"}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left py-2 px-3 rounded-md transition ${
                      selectedCategory === category ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Price Range</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex justify-between">
                  <span>₹0</span>
                  <span>₹5000+</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Rating</h2>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      id={`rating-${rating}`}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-gray-700">
                      {rating} Stars & Above
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="md:w-3/4">
            {filteredServices.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No services found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={service.image || "/placeholder.svg?height=400&width=600"}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-semibold">Starting from ₹{service.startingPrice}</span>
                        <Link href={`/services/${service.id}`}>
                          <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                            Book Now
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
