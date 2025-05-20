"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Search } from "@mui/icons-material"

const HomePageHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional Services at Your Doorstep</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Book trusted professionals for all your home service needs
          </p>

          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search for a service..."
              className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition">
              <Search />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/services">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer"
              >
                Browse Services
              </motion.span>
            </Link>
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                Sign Up Now
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  )
}

export default HomePageHero
