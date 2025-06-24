import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <TrendingUp className="h-12 w-12 text-white" />
            <span className="text-4xl font-bold text-white">Affluent</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Build. Learn.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Grow.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join a community dedicated to wealth building, business excellence, and continuous learning. 
          Transform your mindset, elevate your success.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('products')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Explore Products</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button 
            onClick={() => scrollToSection('digital')}
            className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Digital Resources
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
            <div className="text-gray-300">Community Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
            <div className="text-gray-300">Success Stories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
            <div className="text-gray-300">Premium Resources</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;