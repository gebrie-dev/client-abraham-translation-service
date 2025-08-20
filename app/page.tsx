import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, FileText, Clock, Shield, CheckCircle, Mail, Phone, MapPin, Star, Users, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Abraham Translation Service</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <Link
                href="/client/submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Quote
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Professional Translation Services
              <span className="block text-blue-600">You Can Trust</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Expert translations in over 10 languages with guaranteed accuracy, confidentiality, and on-time delivery.
              Specializing in legal, medical, and technical documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/client/submit">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/client/track">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg bg-transparent"
                >
                  Track Your Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Satisfied Clients</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2,000+</div>
              <div className="text-gray-600">Documents Translated</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10+</div>
              <div className="text-gray-600">Languages Supported</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Translation Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized translation services across multiple industries with guaranteed accuracy and confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Documents</h3>
                <p className="text-gray-600 mb-4">
                  Contracts, court documents, patents, and legal correspondence with certified accuracy.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Certified translations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Court-ready documents
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Confidential handling
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Documents</h3>
                <p className="text-gray-600 mb-4">
                  Medical records, research papers, and pharmaceutical documentation with precision.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    HIPAA compliant
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Medical terminology expertise
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Research paper formatting
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical & Business</h3>
                <p className="text-gray-600 mb-4">
                  Manuals, marketing materials, and business documents for global markets.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Technical accuracy
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Cultural adaptation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Industry expertise
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Language Grid */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Languages We Support</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "English",
                "Spanish",
                "French",
                "German",
                "Italian",
                "Portuguese",
                "Russian",
                "Chinese",
                "Japanese",
                "Korean",
                "Arabic",
              ].map((language) => (
                <Badge key={language} variant="secondary" className="px-4 py-2 text-sm">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Abraham Translation Service</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of experience in professional translation services, Abraham Translation Service has
                built a reputation for accuracy, reliability, and exceptional customer service.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of certified translators specializes in legal, medical, and technical documents, ensuring that
                every translation meets the highest standards of quality and confidentiality.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Certified and experienced translators</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">100% confidentiality guaranteed</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Fast turnaround times</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Competitive pricing</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Star className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Why Choose Us?</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Fast Delivery</h4>
                    <p className="text-sm text-gray-600">Rush orders available with 24-hour turnaround</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure & Confidential</h4>
                    <p className="text-sm text-gray-600">All documents handled with strict confidentiality</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Guaranteed</h4>
                    <p className="text-sm text-gray-600">100% accuracy guarantee with free revisions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to get started? Contact us for a free quote or to discuss your translation needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@abrahamtranslation.com</p>
                    <p className="text-gray-600">quotes@abrahamtranslation.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">123 Translation Street</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get a Free Quote</h3>
                <p className="text-gray-600 mb-6">
                  Upload your document and get an instant quote for professional translation services.
                </p>

                <div className="space-y-4">
                  <Link href="/client/submit">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                      Submit Document for Quote
                    </Button>
                  </Link>

                  <div className="text-center text-gray-500">or</div>

                  <Link href="/client/track">
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-3 text-lg bg-transparent"
                    >
                      Track Existing Order
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Upload your document securely</li>
                    <li>2. Receive instant quote and timeline</li>
                    <li>3. Approve and make payment</li>
                    <li>4. Get your professional translation</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Abraham Translation Service</span>
              </div>
              <p className="text-gray-400 mb-4">
                Professional translation services you can trust. Specializing in legal, medical, and technical documents
                with guaranteed accuracy and confidentiality.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Legal Translation</li>
                <li>Medical Translation</li>
                <li>Technical Translation</li>
                <li>Business Documents</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/client/submit" className="hover:text-white transition-colors">
                    Get Quote
                  </Link>
                </li>
                <li>
                  <Link href="/client/track" className="hover:text-white transition-colors">
                    Track Order
                  </Link>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Abraham Translation Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
