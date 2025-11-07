import { MapPin, Phone, Clock } from "lucide-react"

export default function AdBanner() {
  return (
    // Black Background (bg-gray-900) for a premium, solid look
    <div className="bg-gray-900 text-gray-200 py-2 text-sm hidden md:block border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* KEY CHANGE: Using justify-between to push content to opposite ends */}
        <div className="flex justify-between items-center">
          
          {/* LEFT SIDE: Location (Starts immediately at the left margin) */}
          <div className="flex items-center space-x-2 transition-colors duration-200 hover:text-red-400 cursor-pointer">
            <MapPin className="h-4 w-4 text-red-600" />
            <span className="font-medium">Yeha Building, Addis Ababa</span>
          </div>

          {/* RIGHT SIDE: Phone Number and Hours (Pushed to the right margin) */}
          <div className="flex items-center space-x-8">
            
            {/* Phone Number - Most prominent on the right */}
            {/* Removed redundant 'call' text next to the icon */}
            <a href="tel:+25191141966" className="flex items-center space-x-2 transition-colors duration-200 hover:text-red-400 cursor-pointer">
              <Phone className="h-4 w-4 text-red-600" />
              <span className="font-semibold text-white">+25191141966</span>
            </a>
            
            {/* Hours */}
            <div className="flex items-center space-x-2 transition-colors duration-200">
              <Clock className="h-4 w-4 text-red-600" />
              <span>Mon-Fri: 9am - 6pm</span> {/* Corrected back to 9am-6pm standard hours */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}