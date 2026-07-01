import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiClock, FiHash, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = useRef(location.state || {}).current;

  useEffect(() => {
    if (!orderData.orderId) {
      navigate('/shop', { replace: true });
    }
  }, [orderData.orderId, navigate]);

  if (!orderData.orderId) return null;

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-16" style={{ backgroundColor: '#FFF8F2' }}>
      <SEO title="Order Placed | Cookie Heaven" description="Your Cookie Heaven order has been placed successfully!" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-xl border p-8 md:p-10 text-center"
        style={{ borderColor: 'rgba(139,69,19,0.08)' }}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: '#FEF3C7' }}
        >
          <span className="text-4xl">🎉</span>
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#5C2D0A' }}>
          Order Placed Successfully!
        </h1>
        <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
          Thank you for your order. Your freshly baked cookies are now being prepared with love and care.
        </p>

        <div className="rounded-2xl p-5 mb-8 text-left space-y-3" style={{ backgroundColor: '#FFF8F2' }}>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF3C7' }}>
              <FiClock className="text-amber-600" size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Estimated Delivery</p>
              <p className="font-semibold text-sm" style={{ color: '#2D2D2D' }}>30–45 Minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8F5E9' }}>
              <FiHash className="text-green-600" size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Order ID</p>
              <p className="font-semibold text-sm" style={{ color: '#2D2D2D' }}>{orderData.orderId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F3E5F5' }}>
              <FiCheckCircle className="text-purple-600" size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Payment</p>
              <p className="font-semibold text-sm" style={{ color: '#2D2D2D' }}>{orderData.paymentMethod || 'Cash on Delivery'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/shop')}
            className="w-full py-3.5 rounded-2xl text-base font-semibold text-white flex items-center justify-center gap-2.5 transition-all"
            style={{
              background: 'linear-gradient(135deg, #8B4513, #A0522D)',
              boxShadow: '0 8px 24px rgba(139,69,19,0.35)'
            }}
          >
            <FiShoppingBag size={18} />
            Continue Shopping
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full py-3.5 rounded-2xl text-base font-semibold flex items-center justify-center gap-2.5 transition-all"
            style={{ color: '#8B4513', backgroundColor: '#FFF8F2' }}
          >
            View Orders
            <FiArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
