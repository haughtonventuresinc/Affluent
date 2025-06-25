import { ShoppingBag, Star } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Affluent Classic Cap',
      price: '$45',
      image: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Premium quality cap with embroidered logo',
      badge: 'Limited Edition'
    },
    {
      id: 2,
      name: 'Executive Black Hat',
      price: '$55',
      image: 'https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Sophisticated design for the modern entrepreneur',
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'Success Mindset Beanie',
      price: '$35',
      image: 'https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Comfortable beanie for the ambitious minded',
      badge: 'New Drop'
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Drops
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exclusive apparel designed for the success-minded individual. Each piece represents excellence and ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Star className="h-5 w-5 text-gray-500 fill-current" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                  <button className="bg-black text-gray-300 px-6 py-3 rounded-full font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 px-8 py-4 rounded-full text-lg font-semibold hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;