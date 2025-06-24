import React from 'react';
import { BookOpen, Play, Download, Award } from 'lucide-react';

const DigitalGoods = () => {
  const digitalItems = [
    {
      id: 1,
      title: 'Wealth Building Masterclass',
      type: 'Course',
      price: '$197',
      description: 'Complete guide to building sustainable wealth through strategic investing and business development.',
      icon: <Play className="h-6 w-6" />,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['12 HD Video Modules', 'PDF Workbook', 'Live Q&A Access', 'Lifetime Updates']
    },
    {
      id: 2,
      title: 'The Millionaire Mindset',
      type: 'Ebook',
      price: '$29',
      description: 'Transform your thinking patterns and develop the mental framework of successful entrepreneurs.',
      icon: <BookOpen className="h-6 w-6" />,
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['200+ Pages', 'Action Worksheets', 'Audio Version', 'Mobile Optimized']
    },
    {
      id: 3,
      title: 'Business Blueprint Pack',
      type: 'Templates',
      price: '$79',
      description: 'Essential templates and frameworks for launching and scaling your business ventures.',
      icon: <Award className="h-6 w-6" />,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['20+ Templates', 'Business Plan Guide', 'Financial Models', 'Legal Checklists']
    }
  ];

  return (
    <section id="digital" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Digital Knowledge Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium digital resources designed to accelerate your journey to financial freedom and business success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {digitalItems.map((item) => (
            <div key={item.id} className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  {item.icon}
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {item.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-3xl font-bold text-white">{item.price}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                
                <div className="space-y-2 mb-6">
                  {item.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 rounded-full font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105">
                  <Download className="h-4 w-4" />
                  <span>Get Access</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">All-Access Pass</h3>
            <p className="text-gray-300 mb-6">Get unlimited access to all current and future digital resources</p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-2xl text-gray-300 line-through">$499</span>
              <span className="text-4xl font-bold text-yellow-400">$297</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">40% OFF</span>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105">
              Unlock Everything
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalGoods;