import { Target, Users, TrendingUp, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Purpose-Driven',
      description: 'Every resource, product, and community interaction is designed to accelerate your path to financial freedom and business success.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community First',
      description: 'We believe in the power of collective growth. Success is amplified when shared with others on the same journey.'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Continuous Growth',
      description: 'Learning never stops. We provide cutting-edge strategies and timeless principles for sustained personal and financial growth.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Excellence Standard',
      description: 'We maintain the highest standards in everything we do, from product quality to community support and educational content.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Community Members' },
    { number: '500+', label: 'Success Stories' },
    { number: '100+', label: 'Resources Created' },
    { number: '50+', label: 'Partner Platforms' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Affluent
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're building more than a brand – we're cultivating a movement of ambitious individuals 
            committed to financial literacy, business excellence, and continuous personal development.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To democratize access to wealth-building knowledge and create a community where 
              entrepreneurial minds can connect, learn, and prosper together. We believe that 
              financial freedom is not a privilege – it's a skill that can be learned and mastered.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-white/80 to-gray-100/90 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team & Community */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-tl from-white/80 to-gray-100/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Built by Entrepreneurs</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Affluent was founded by successful entrepreneurs who understand the challenges of building 
              wealth and scaling businesses. We've walked the path and want to make it easier for others 
              to follow.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team combines decades of experience in finance, business development, marketing, and 
              education to create resources that truly make a difference in people's lives.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              When you become part of Affluent, you're not just buying products – you're joining a 
              community of ambitious individuals who support each other's growth and success.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"></div>
                <span className="text-gray-700">Exclusive member-only content and events</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"></div>
                <span className="text-gray-700">Direct access to successful entrepreneurs</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"></div>
                <span className="text-gray-700">Networking opportunities with like-minded individuals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"></div>
                <span className="text-gray-700">Early access to new products and resources</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;