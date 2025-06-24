import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import DigitalGoods from './components/DigitalGoods';
import WealthResources from './components/WealthResources';
import BookClub from './components/BookClub';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedProducts />
      <DigitalGoods />
      <WealthResources />
      <BookClub />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;