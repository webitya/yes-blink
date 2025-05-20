import Link from "next/link"
import { Facebook, Twitter, Instagram, LinkedIn, Phone, Email, LocationOn } from "@mui/icons-material"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">ServiceHub</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop solution for all home services. We connect you with trusted professionals to make your life
              easier.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <LinkedIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">Careers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/cleaning">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">Home Cleaning</span>
                </Link>
              </li>
              <li>
                <Link href="/services/plumbing">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">Plumbing</span>
                </Link>
              </li>
              <li>
                <Link href="/services/electrical">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">Electrical</span>
                </Link>
              </li>
              <li>
                <Link href="/services/appliance-repair">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">Appliance Repair</span>
                </Link>
              </li>
              <li>
                <Link href="/services/painting">
                  <span className="text-gray-400 hover:text-white transition cursor-pointer">Painting</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <LocationOn className="mr-2 text-gray-400" />
                <span className="text-gray-400">123 Service Street, Bangalore, Karnataka, India - 560001</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-gray-400" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Email className="mr-2 text-gray-400" />
                <a href="mailto:info@servicehub.com" className="text-gray-400 hover:text-white transition">
                  info@servicehub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ServiceHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy">
              <span className="text-gray-400 hover:text-white text-sm transition cursor-pointer">Privacy Policy</span>
            </Link>
            <Link href="/terms-of-service">
              <span className="text-gray-400 hover:text-white text-sm transition cursor-pointer">Terms of Service</span>
            </Link>
            <Link href="/refund-policy">
              <span className="text-gray-400 hover:text-white text-sm transition cursor-pointer">Refund Policy</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
