import { Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
// NOTE: Assuming your Button component is styled appropriately for its container
import { Button } from "@/components/ui/button" 

export default function Header() {
  return (
    // Header background is now dark/black, matching the AdBanner style
    <header className="sticky top-0 bg-gray-900 z-40 shadow-xl border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Slightly increased height for premium feel */}
          {/* Logo/Brand - White text on dark background */}
          <div className="flex items-center space-x-3">
            {/* Logo box now uses the red accent */}
            <div className="bg-red-600 p-2 rounded-xl"> 
              <Globe className="h-7 w-7 text-white" />
            </div>
            {/* Brand name text is white */}
            <span className="text-xl font-extrabold text-white tracking-wide">Abraham Translation Service</span>
          </div>

          {/* Navigation and Call to Action (Desktop) */}
          <nav className="hidden md:flex space-x-10 items-center">
            {/* Navigation links: White text, Red underline on hover */}
            <a
              href="#services"
              className="text-gray-300 font-medium relative hover:text-white transition-all duration-300 group"
            >
              Services
              <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <a
              href="#about"
              className="text-gray-300 font-medium relative hover:text-white transition-all duration-300 group"
            >
              About
              <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <a
              href="#contact"
              className="text-gray-300 font-medium relative hover:text-white transition-all duration-300 group"
            >
              Contact
              <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            
            <Link
              href="/client/submit"
              // Primary CTA: Red
              className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-[1.02] flex items-center font-semibold"
            >
              Send Your Document <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}