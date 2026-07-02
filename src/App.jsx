import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useCart } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import SEO from './components/SEO';
import { websiteSchema, orgSchema } from './utils/structuredData';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import CookieMenu from './pages/CookieMenu';
import GiftBoxes from './pages/GiftBoxes';
import Recipes from './pages/Recipes';
import NotFound from './pages/NotFound';

function App() {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO schema={[websiteSchema, orgSchema]} />
      <ScrollToTop />

      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/place-order" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/cookies" element={<CookieMenu />} />
          <Route path="/gift-boxes" element={<GiftBoxes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
