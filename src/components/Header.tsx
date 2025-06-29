import  { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1itbtu3vu8861oaa4es1d1td8sc.jpg" alt="Affluent Logo" className="h-10 object-contain filter brightness-150 contrast-125" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('digital')}
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Digital
            </button>
            <button 
              onClick={() => scrollToSection('resources')}
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Resources
            </button>
            <button 
              onClick={() => scrollToSection('bookclub')}
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Book Club
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Contact
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="ml-2 px-4 py-1 border border-blue-400 rounded text-blue-400 hover:bg-blue-400 hover:text-white transition-colors font-semibold"
            >
              Admin Login
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:text-gray-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block px-3 py-2 text-white hover:text-gray-300 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="block px-3 py-2 text-white hover:text-gray-300 font-medium"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('digital')}
                className="block px-3 py-2 text-white hover:text-gray-300 font-medium"
              >
                Digital
              </button>
              <button 
                onClick={() => scrollToSection('resources')}
                className="block px-3 py-2 text-white hover:text-gray-300 font-medium"
              >
                Resources
              </button>
              <button 
                onClick={() => scrollToSection('bookclub')}
                className="block px-3 py-2 text-white hover:text-gray-300 font-medium"
              >
                Book Club
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-white hover:text-gray-300 font-medium"
              >
                Contact
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); navigate('/admin'); }}
                className="block px-3 py-2 border border-blue-400 rounded text-blue-400 hover:bg-blue-400 hover:text-white font-semibold mt-2"
              >
                Admin Login
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;