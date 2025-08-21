import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  FileText,
  Clock,
  Shield,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Star,
  Users,
  Award,
  ArrowRight,

  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Abraham Translation Service</span>
            </div>
            <nav className="hidden md:flex  space-x-10">
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                Contact
              </a>
              <Link
                href="/client/submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                send you document
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                
                Professional Translation Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Bridge Languages,
                <span className="block text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Connect Worlds
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Expert translations in over 13 languages with guaranteed accuracy, confidentiality, and lightning-fast
                delivery. Specializing in legal, medical, and technical documents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/client/submit">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    upload you document
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/client/track">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Track Your Order
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 group">
                <div className="relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qadVvE3N3rZ5IvNcZu8MRuedxiMI2Z.png"
                    alt="Professional Translation Services - Multi-language keyboard"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Floating text overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-center text-white p-6">
                      <h3 className="text-2xl font-bold mb-2">WeTranslate</h3>
                      <p className="text-lg">Breaking Language Barriers</p>
                      <div className="flex items-center justify-center mt-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                  ✓ 13+ Languages
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🚀 Fast Delivery
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -z-10 top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -z-10 bottom-10 -right-10 w-16 h-16 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
              <div className="absolute -z-10 top-1/2 -right-20 w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-50 animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-full mb-4 mx-auto w-fit group-hover:scale-110 transition-all duration-300">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">500+</div>
              <div className="text-gray-600 font-medium">Satisfied Clients</div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-full mb-4 mx-auto w-fit group-hover:scale-110 transition-all duration-300">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                2,000+
              </div>
              <div className="text-gray-600 font-medium">Documents Translated</div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-full mb-4 mx-auto w-fit group-hover:scale-110 transition-all duration-300">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">13+</div>
              <div className="text-gray-600 font-medium">Languages Supported</div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-full mb-4 mx-auto w-fit group-hover:scale-110 transition-all duration-300">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">15+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="h-4 w-4 mr-2" />
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Translation Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized translation services across multiple industries with guaranteed accuracy and confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Legal Documents
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Contracts, court documents, patents, and legal correspondence with certified accuracy and legal
                  compliance.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center group-hover:text-gray-700 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Certified translations
                  </li>
                  <li className="flex items-center group-hover:text-gray-700 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Court-ready documents
                  </li>
                  <li className="flex items-center group-hover:text-gray-700 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Confidential handling
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-green-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                  <FileText className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  Medical Documents
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Medical records, research papers, and pharmaceutical documentation with precision and compliance.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center group-hover:text-gray-700 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    HIPAA compliant
                  </li>
                  <li className="flex items-center group-hover:text-gray-700 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Medical terminology expertise
                  </li>
                  <li className="flex items-center group-hover:text-gray-700 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Research paper formatting
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-purple-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                  <Globe className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  Technical & Business
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Manuals, marketing materials, and business documents for global markets and international expansion.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center group-hover:text-gray-700 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Technical accuracy
                  </li>
                  <li className="flex items-center group-hover:text-gray-700 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Cultural adaptation
                  </li>
                  <li className="flex items-center group-hover:text-gray-700 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Industry expertise
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Language Grid */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-10">Languages We Master</h3>
            <div className="flex flex-wrap justify-center gap-4">
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
                "Amharic",
                "Oromo",
                "Tigrinya",
              ].map((language, index) => (
                <Badge
                  key={language}
                  variant="secondary"
                  className={`px-6 py-3 text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 hover:scale-105 cursor-pointer transform hover:rotate-1 ${
                    ["Amharic", "Oromo", "Tigrinya"].includes(language)
                      ? "bg-gradient-to-r from-green-100 to-yellow-100 border-2 border-green-200 text-green-800 hover:from-green-200 hover:to-yellow-200"
                      : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {language}
                  {["Amharic", "Oromo", "Tigrinya"].includes(language) && <span className="ml-2 text-xs">🇪🇹</span>}
                </Badge>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-lg">
                <span className="font-semibold text-green-700">New:</span> Now supporting Ethiopian languages including
                Amharic, Oromo, and Tigrinya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
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
                  <Clock className="h-5 w-5 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Fast Delivery</h4>
                    <p className="text-sm text-gray-600">Rush orders available with 24-hour turnaround</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure & Confidential</h4>
                    <p className="text-sm text-gray-600">All documents handled with strict confidentiality</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="h-5 w-5 text-blue-600 mr-4 mt-1" />
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
                    <p className="text-gray-600">+25191141966</p>
                    <p className="text-sm text-gray-500">Monday - Saturday, 9 AM - 6 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Office Location</h4>
                    <p className="text-gray-600">Yeha Building</p>
                    <p className="text-gray-600">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Find Our Office</h4>
                <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <iframe
                    width="100%"
                    height="300"
                    src="https://maps.google.com/maps?q=yeha%20building&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    className="w-full h-[300px] rounded-lg"
                    title="Abraham Translation Service Office Location"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                    <p className="text-sm font-medium text-gray-900">📍 Our Office</p>
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
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
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
            <p>&copy; 2025 Abraham Translation Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
