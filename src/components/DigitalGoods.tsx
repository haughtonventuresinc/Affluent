import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Play, BookOpen, Award } from 'lucide-react';

interface DigitalGood {
  id: string;
  title: string;
  type: string;
  price: string;
  description: string;
  image: string;
  features?: string[];
}

const DigitalGoods: React.FC = () => {
  const [digitalItems, setDigitalItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/digitalgoods')
      .then(res => res.json())
      .then(setDigitalItems)
      .catch(() => setError('Failed to load digital goods'))
      .finally(() => setLoading(false));
  }, []);

  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center py-16 text-lg text-gray-500">Loading digital goods...</div>;
  }
  if (error) {
    return <div className="text-center py-16 text-lg text-red-500">{error}</div>;
  }
  return (
    <section id="digital" className="py-20 bg-gradient-to-br from-gray-200 to-gray-100">
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
          {digitalItems.map((item: DigitalGood) => {
            let Icon = Play;
            if (item.type.toLowerCase().includes('ebook')) Icon = BookOpen;
            else if (item.type.toLowerCase().includes('template')) Icon = Award;
            else if (item.type.toLowerCase().includes('course')) Icon = Play;
            return (
              <div key={item.id} className="group bg-gradient-to-br from-white/80 to-gray-100/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {/* Icon top left */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Icon className="h-6 w-6 text-gray-900" />
                  </div>
                  {/* Type badge top right */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">{item.type}</span>
                  </div>
                  {/* Price bottom center */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                    <span className="text-3xl font-bold text-gray-300">{item.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  {Array.isArray(item.features) && item.features.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {item.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    className="w-full bg-black text-gray-300 py-3 rounded-full font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
                    onClick={() => navigate('/checkout', {
                      state: {
                        product: {
                          name: item.title,
                          price: item.price,
                          description: item.description,
                          image: item.image,
                        }
                      }
                    })}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    <span>Get Access</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* All-Access Pass Section - Now dynamic */}
        <AllAccessPassSection />
      </div>
    </section>
  );
};



const AllAccessPassSection: React.FC = () => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/allaccess')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch All-Access Pass');
        return res.json();
      })
      .then(setData)
      .catch(() => setError('Failed to load All-Access Pass'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="mt-16 text-center text-gray-400">Loading All-Access Pass...</div>;
  if (error) return <div className="mt-16 text-center text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="mt-16 text-center">
      <div className="bg-black rounded-2xl p-8 text-gray-300">
        <h3 className="">{data.title || 'All-Access Pass'}</h3>
        <p className="text-gray-300 mb-6">{data.description || 'Get unlimited access to all current and future digital resources'}</p>
        <div className="flex items-center justify-center space-x-4 mb-6">
          {data.originalPrice && <span className="text-2xl text-gray-300 line-through">{data.originalPrice}</span>}
          <span className="text-4xl font-bold text-white">{data.price}</span>
          {data.discountLabel && <span className="bg-red-500 text-gray-300 px-3 py-1 rounded-full text-sm">{data.discountLabel}</span>}
        </div>
        <button
          className="border-2 border-white text-gray-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          onClick={() => navigate('/checkout', {
            state: {
              product: {
                name: data.title,
                price: data.price,
                description: data.description,
                image: data.image,
              }
            }
          })}
        >
          Unlock Everything
        </button>
      </div>
    </div>
  );
};

export default DigitalGoods;