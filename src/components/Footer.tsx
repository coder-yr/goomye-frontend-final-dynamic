import { Phone, MessageCircle, Apple, Youtube, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const popularCategories = [
    "Staples",
    "Beverages",
    "Personal Care",
    "Home Care",
    "Baby Care",
    "Vegetables & Fruits",
    "Snacks & Foods",
    "Dairy & Bakery"
  ];

  const customerServices = [
    "About Us",
    "Terms & Conditions",
    "FAQ",
    "Privacy Policy",
    "E-waste Policy",
    "Cancellation & Return Policy"
  ];

  return (
    <footer className="w-full bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Contact */}
          <div className="space-y-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
              <img src="/logo.png" alt="GOOMYE Logo" />
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 mt-1" />
                  <div>
                    <div className="font-semibold">Whats App</div>
                    <div className="text-sm text-gray-400">+1 202-918-2132</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-1" />
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-sm text-gray-400">+1 202-918-2132</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Download App</h3>
              <div className="flex flex-col gap-3">
                <button className="h-12 px-4 bg-black rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <Apple className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-[10px]">DOWNLOAD ON THE</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                <button className="h-12 px-4 bg-black rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px]">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Spacer column */}
          <div></div>

          {/* Popular Categories */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b-2 border-white pb-2 inline-block">
              Most Popular Categories
            </h3>
            <ul className="space-y-3">
              {popularCategories.map((category, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b-2 border-white pb-2 inline-block">
              Customer Services
            </h3>
            <ul className="space-y-3">
              {customerServices.map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 pt-4">
              <a href="#" className="hover:text-gray-400 transition-colors" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2022 All rights reserved. GOOMYE.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
