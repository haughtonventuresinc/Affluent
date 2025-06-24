import React from 'react';
import { TrendingUp, Instagram, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    company: [
      { name: 'About Us', action: () => scrollToSection('about') },
      { name: 'Our Mission', action: () => scrollToSection('about') },
      { name: 'Contact', action: () => scrollToSection('contact') },
      { name: 'Affiliate Program', action: () => scrollToSection('contact') }
    ],
    products: [
      { name: 'Featured Drops', action: () => scrollToSection('products') },
      { name: 'Digital Resources', action: () => scrollToSection('digital') },
      { name: 'Investment Tools', action: () => scrollToSection('resources') },
      { name: 'Book Club', action: () => scrollToSection('bookclub') }
    ],
    resources: [
      { name: 'Wealth Building Guide', action: () => scrollToSection('digital') },
      { name: 'Investment Platforms', action: () => scrollToSection('resources') },
      { name: 'Business Templates', action: () => scrollToSection('digital') },
      { name: 'Success Stories', action: () => scrollToSection('about') }
    ],
    legal: [
      { name: 'Privacy Policy', action: () => {} },
      { name: 'Terms of Service', action: () => {} },
      { name: 'Cookie Policy', action: () => {} },
      { name: 'Refund Policy', action: () => {} }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold">Affluent</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building a community of ambitious individuals committed to financial literacy, 
              business excellence, and continuous personal development.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-gray-800 p-3 rounded-full hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-3 rounded-full hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-3 rounded-full hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-3 rounded-full hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={link.action}
                    className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={link.action}
                    className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={link.action}
                    className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Get the latest insights on wealth building, business strategies, and exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link, index) => (
                <button 
                  key={index}
                  onClick={link.action}
                  className="text-gray-400 hover:text-gray-300 transition-colors text-sm"
                >
                  {link.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                © 2024 Affluent. All rights reserved.
              </p>
              <button 
                onClick={scrollToTop}
                className="bg-gray-800 p-2 rounded-full hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;