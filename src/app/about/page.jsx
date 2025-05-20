"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, People, Security, Support, Star } from "@mui/icons-material"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              About ServiceHub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              We're on a mission to transform how people access home services by connecting them with trusted
              professionals for all their needs.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2018, ServiceHub began with a simple idea: make home services accessible, reliable, and
                hassle-free for everyone. What started as a small team of passionate individuals has grown into a
                nationwide platform connecting thousands of customers with skilled professionals every day.
              </p>
              <p className="text-gray-600 mb-4">
                Our founders experienced firsthand the challenges of finding reliable service providers for their homes.
                After one too many disappointing experiences, they decided to create a solution that would benefit both
                customers and service professionals.
              </p>
              <p className="text-gray-600">
                Today, ServiceHub is India's fastest-growing home services platform, operating in over 30 cities with
                plans to expand further. We've helped over 500,000 customers transform their homes and supported
                thousands of service professionals in growing their businesses.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="ServiceHub Team"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle className="text-blue-600" style={{ fontSize: 48 }} />,
                title: "Quality",
                description:
                  "We're committed to delivering exceptional service quality through rigorous professional vetting and continuous training.",
              },
              {
                icon: <People className="text-blue-600" style={{ fontSize: 48 }} />,
                title: "Community",
                description:
                  "We build meaningful relationships with our customers and service partners, creating a community based on trust and respect.",
              },
              {
                icon: <Security className="text-blue-600" style={{ fontSize: 48 }} />,
                title: "Trust",
                description:
                  "We prioritize safety and security in every interaction, ensuring peace of mind for our customers and partners.",
              },
              {
                icon: <Support className="text-blue-600" style={{ fontSize: 48 }} />,
                title: "Innovation",
                description:
                  "We continuously improve our platform and services, embracing technology to enhance the experience for everyone.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Meet Our Leadership Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              The passionate individuals driving our mission forward
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajiv Sharma",
                role: "Co-Founder & CEO",
                image: "/placeholder.svg?height=400&width=400",
                bio: "With over 15 years of experience in technology and operations, Rajiv leads our strategic vision and growth initiatives.",
              },
              {
                name: "Priya Patel",
                role: "Co-Founder & COO",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Priya oversees our day-to-day operations, ensuring seamless service delivery and customer satisfaction across all markets.",
              },
              {
                name: "Vikram Mehta",
                role: "CTO",
                image: "/placeholder.svg?height=400&width=400",
                bio: "A technology veteran, Vikram leads our engineering team in building innovative solutions that power our platform.",
              },
              {
                name: "Ananya Reddy",
                role: "VP of Customer Experience",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Ananya is dedicated to creating exceptional experiences for our customers at every touchpoint.",
              },
              {
                name: "Arjun Singh",
                role: "VP of Professional Relations",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Arjun works closely with our service professionals, helping them grow their businesses through our platform.",
              },
              {
                name: "Meera Kumar",
                role: "VP of Marketing",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Meera drives our brand strategy and marketing initiatives, helping us connect with customers across India.",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              ServiceHub by the Numbers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-blue-100"
            >
              Our impact since 2018
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "500,000+", label: "Happy Customers" },
              { number: "30+", label: "Cities Served" },
              { number: "10,000+", label: "Service Professionals" },
              { number: "4.8/5", label: "Average Rating", icon: <Star /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 mb-6"
            >
              Join the ServiceHub Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-8"
            >
              Whether you're looking for services or are a professional wanting to grow your business, we're here to
              help.
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/services">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Explore Services
                </motion.span>
              </Link>
              <Link href="/careers">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-white border-2 border-blue-600 text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                >
                  Join Our Team
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
