import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Header from './components/Header';

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('affluent_token') : null;
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}
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
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;