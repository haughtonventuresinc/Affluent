import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import DigitalGoods from './components/DigitalGoods';
import WealthResources from './components/WealthResources';
import BookClub from './components/BookClub';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;