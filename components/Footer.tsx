import { Globe } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Description */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-blue-400" /> 
              <span className="text-xl font-bold">
                Abraham Translation Service
              </span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Professional translation and legal service you can trust. Guaranteed accuracy, strict confidentiality, and fast turnaround for all your critical documents.
            </p>
          </div>

          {/* Column 2: Core Services */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/services/legal" className="hover:text-blue-400 transition-colors">Legal Translation</Link></li>
              <li><Link href="/services/medical" className="hover:text-blue-400 transition-colors">Medical Translation</Link></li>
              <li><Link href="/services/technical" className="hover:text-blue-400 transition-colors">Technical Translation</Link></li>
              <li><Link href="/services/business" className="hover:text-blue-400 transition-colors">Business Documents</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Client Access */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Client Access</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/client/submit" className="hover:text-blue-400 transition-colors">
                  Get Quote
                </Link>
              </li>
              <li>
                <Link href="/client/track" className="hover:text-blue-400 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Legal & Contact - NEW TRUST SECTION */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Legal & Info</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-blue-400 transition-colors">Confidentiality</Link></li>
              <li className="pt-2">
                <span className="text-white">Call Us: +25191141966</span> 
              </li>
            </ul>
          </div>
        </div>

        {/* FINAL BOTTOM BAR */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 Abraham Translation Service. All rights reserved.</p>
          <p className="mt-1">
            Developed by{" "}
            <a 
              href="https://gebrie.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Gebre
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}