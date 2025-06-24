import { TrendingUp, DollarSign, PieChart, Target, ExternalLink } from 'lucide-react';

const WealthResources = () => {
  const platforms = [
    {
      name: 'Robinhood',
      description: 'Commission-free investing for stocks, ETFs, and crypto',
      category: 'Brokerage',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-green-400 to-green-600',
      features: ['$0 Commissions', 'Fractional Shares', 'Crypto Trading']
    },
    {
      name: 'Webull',
      description: 'Advanced trading platform with comprehensive research tools',
      category: 'Trading',
      icon: <PieChart className="h-6 w-6" />,
      color: 'from-blue-400 to-blue-600',
      features: ['Advanced Charts', 'Pre/After Market', 'Paper Trading']
    },
    {
      name: 'M1 Finance',
      description: 'Automated investing with portfolio management features',
      category: 'Robo-Advisor',
      icon: <Target className="h-6 w-6" />,
      color: 'from-purple-400 to-purple-600',
      features: ['Auto-Investing', 'Portfolio Pies', 'Low Minimums']
    },
    {
      name: 'Coinbase',
      description: 'Leading cryptocurrency exchange and wallet platform',
      category: 'Cryptocurrency',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'from-orange-400 to-orange-600',
      features: ['Secure Storage', '100+ Coins', 'DeFi Access']
    }
  ];

  const tools = [
    {
      title: 'Investment Calculator',
      description: 'Calculate compound growth and investment returns',
      icon: <TrendingUp className="h-8 w-8 text-green-600" />
    },
    {
      title: 'Portfolio Tracker',
      description: 'Monitor your investments across multiple accounts',
      icon: <PieChart className="h-8 w-8 text-blue-600" />
    },
    {
      title: 'Risk Assessment',
      description: 'Evaluate your investment risk tolerance',
      icon: <Target className="h-8 w-8 text-purple-600" />
    }
  ];

  return (
    <section id="resources" className="py-20 bg-gradient-to-tl from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wealth Building Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Curated investment platforms and tools to help you start and grow your wealth-building journey.
          </p>
        </div>

        {/* Investment Platforms */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Recommended Investment Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div key={index} className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`h-2 bg-gradient-to-r ${platform.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color} text-white`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{platform.name}</h4>
                      <span className="text-sm text-gray-500">{platform.category}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{platform.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {platform.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-gradient-to-r ${platform.color} rounded-full`}></div>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${platform.color} text-white py-2 px-4 rounded-lg font-semibold text-sm hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105`}>
                    <span>Start Investing</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Tools */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Financial Planning Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="group text-center p-6 rounded-xl bg-gray-50/80 hover:bg-gray-100/90 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  {tool.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <button className="text-gray-900 font-semibold hover:text-gray-700 transition-colors">
                  Use Tool →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Wealth Journey?</h3>
            <p className="mb-6 text-white/80">Join thousands of successful investors who started with our recommendations</p>
            <button className="bg-gray-300 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-400 transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WealthResources;