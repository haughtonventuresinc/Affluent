import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to start your journey to financial freedom? We'd love to hear from you and help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-black rounded-2xl p-8 text-gray-300">
            <h3 className="text-2xl font-bold text-gray-300 mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="products">Product Question</option>
                  <option value="digital">Digital Resources</option>
                  <option value="bookclub">Book Club</option>
                  <option value="affiliate">Affiliate Program</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-white text-black py-4 px-6 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Let's connect</h3>
              <p className="text-gray-800 mb-8 leading-relaxed">
                Whether you have questions about our products, want to join our community, or are interested 
                in partnerships, we're here to help you succeed on your journey to financial freedom.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-black rounded-lg hover:bg-gray-900 transition-colors">
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-gray-300" />
                </div>
                <div className='text-white'>
                  <h4 className="text-lg font-semibold">Email Us</h4>
                  <p className="">hello@triaffluent.xyz</p>
                </div>
              </div>


              <div className="flex items-center space-x-4 p-4 bg-black rounded-lg hover:bg-gray-900 transition-colors">
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-gray-300" />
                </div>
                <div className='text-white'>
                  <h4 className="text-lg font-semibold">Location</h4>
                  <p className="">Global Community</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-gray-700 to-gray-900 p-3 rounded-full text-gray-300 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-gray-700 to-gray-900 p-3 rounded-full text-gray-300 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-gray-700 to-gray-900 p-3 rounded-full text-gray-300 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Affiliate Program CTA */}
            <div className="bg-black rounded-xl p-6 text-gray-300">
              <h4 className="text-xl font-bold mb-3">Become an Affiliate</h4>
              <p className="text-gray-300 mb-4">
                Join our affiliate program and earn commissions by sharing products you believe in.
              </p>
              <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;