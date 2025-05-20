"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { LocationOn, Work, School, ArrowForward, Search } from "@mui/icons-material"
import { useToast } from "@/hooks/useToast"

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const { toast } = useToast()

  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Bangalore",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "We're looking for a Senior Software Engineer to join our engineering team and help build scalable solutions for our platform.",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore",
      type: "Full-time",
      experience: "4+ years",
      description: "Join our product team to drive the vision and strategy for our service marketplace platform.",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Mumbai",
      type: "Full-time",
      experience: "2-4 years",
      description: "Help create beautiful, intuitive experiences for our customers and service professionals.",
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "Operations",
      location: "Delhi",
      type: "Full-time",
      experience: "2-3 years",
      description: "Work with our customers to ensure they have an exceptional experience with our platform.",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Bangalore",
      type: "Full-time",
      experience: "2-4 years",
      description: "Drive growth and brand awareness through innovative marketing campaigns.",
    },
    {
      id: 6,
      title: "Data Analyst",
      department: "Analytics",
      location: "Hyderabad",
      type: "Full-time",
      experience: "1-3 years",
      description: "Extract insights from our data to help drive business decisions and improve our platform.",
    },
    {
      id: 7,
      title: "HR Specialist",
      department: "Human Resources",
      location: "Bangalore",
      type: "Full-time",
      experience: "2-4 years",
      description: "Help build and nurture our company culture while supporting our growing team.",
    },
    {
      id: 8,
      title: "Backend Developer",
      department: "Engineering",
      location: "Mumbai",
      type: "Full-time",
      experience: "2-4 years",
      description: "Build robust backend systems that power our platform and integrate with various services.",
    },
  ]

  // Get unique departments and locations for filters
  const departments = ["All", ...new Set(jobListings.map((job) => job.department))]
  const locations = ["All", ...new Set(jobListings.map((job) => job.location))]

  // Filter job listings based on search term and filters
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment
    const matchesLocation = selectedLocation === "All" || job.location === selectedLocation
    return matchesSearch && matchesDepartment && matchesLocation
  })

  const handleApply = (jobId) => {
    toast({
      title: "Application Started",
      description: "You'll be redirected to complete your application.",
      type: "info",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Join Our Team
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              Help us transform the home services industry and build meaningful careers along the way
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition">
                <Search />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Why Join ServiceHub?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              Build your career at one of India's fastest-growing home services platforms
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Meaningful Impact",
                description:
                  "Your work directly improves the lives of our customers and service professionals across India.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                title: "Growth & Learning",
                description:
                  "We invest in your development with continuous learning opportunities and clear career paths.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                title: "Innovative Culture",
                description: "Join a team that values creativity, collaboration, and challenging the status quo.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-48">
                  <Image src={benefit.image || "/placeholder.svg"} alt={benefit.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Our Benefits
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              We take care of our team so they can focus on taking care of our customers
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Competitive Salary & Equity",
              "Health Insurance for You & Family",
              "Flexible Work Arrangements",
              "Learning & Development Budget",
              "Paid Time Off & Holidays",
              "Wellness Programs",
              "Team Retreats & Events",
              "Home Service Discounts",
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <p className="text-gray-800 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Open Positions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              Find your perfect role and join our growing team
            </motion.p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:w-1/3">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Listings */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Work className="mr-1 text-blue-600" fontSize="small" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center">
                            <LocationOn className="mr-1 text-blue-600" fontSize="small" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <School className="mr-1 text-blue-600" fontSize="small" />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApply(job.id)}
                        className="mt-4 md:mt-0 bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                      >
                        Apply Now <ArrowForward className="ml-1" fontSize="small" />
                      </motion.button>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Our Application Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              What to expect when you apply to ServiceHub
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Application Review",
                description: "Our recruiting team reviews your application and resume.",
              },
              {
                step: "2",
                title: "Initial Interview",
                description: "A phone or video call to discuss your experience and interest.",
              },
              {
                step: "3",
                title: "Technical Assessment",
                description: "Role-specific assessment to evaluate your skills.",
              },
              {
                step: "4",
                title: "Final Interviews",
                description: "Meet with the team and leadership to ensure mutual fit.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              Don't See the Right Role?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-blue-100 mb-8"
            >
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in
              mind for future opportunities.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
              onClick={() => {
                toast({
                  title: "General Application",
                  description: "You'll be redirected to submit your general application.",
                  type: "info",
                })
              }}
            >
              Submit General Application
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  )
}
