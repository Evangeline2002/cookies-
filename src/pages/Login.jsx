import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import heroImg from '../assets/hero.png';
import logoImg from '../assets/logo.webp';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
};

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: { email: '', password: '', remember: false }
    });

    const onSubmit = (data) => {
        setLoading(true);
        setTimeout(() => {
            login(data.email.split('@')[0], '');
            toast.success(
                <div>
                    <div className="font-semibold text-gray-900">Login Successful!</div>
                    <div className="text-sm text-gray-500 mt-0.5">
                        Welcome back! Your account has been verified successfully.
                    </div>
                </div>,
                {
                    icon: <span className="text-xl">✅</span>,
                    style: { borderRadius: '16px', padding: '16px 20px' }
                }
            );
            setLoading(false);
            setTimeout(() => navigate('/checkout'), 2000);
        }, 1500);
    };

    return (
        <main className="min-h-screen flex" style={{ backgroundColor: '#FFF8F2' }}>
            <SEO
                title="Cookie Heaven | Login"
                description="Sign in to Cookie Heaven to order freshly baked premium cookies online with a secure and fast checkout experience."
            />

            {/* Left Side - Visual */}
            <div className="hidden lg:flex flex-1 relative items-center justify-center p-12 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #FFF8F2 0%, #FEF0E0 40%, #FDE8D0 100%)' }}
            >
                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[12%] left-[8%] text-6xl opacity-[0.15]"
                        aria-hidden="true"
                    >🍪</motion.div>
                    <motion.div
                        animate={{ y: [0, 24, 0], rotate: [0, -18, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-[30%] right-[10%] text-5xl opacity-[0.12]"
                        aria-hidden="true"
                    >🍫</motion.div>
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[20%] left-[15%] text-7xl opacity-[0.10]"
                        aria-hidden="true"
                    >🥛</motion.div>
                    <motion.div
                        animate={{ y: [0, 16, 0], rotate: [0, -8, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-[35%] right-[6%] text-4xl opacity-[0.12]"
                        aria-hidden="true"
                    >✨</motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.18, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)' }}
                        aria-hidden="true"
                    />
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative z-10"
                >
                    <div className="relative">
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -inset-4 rounded-[3.5rem] opacity-30 blur-2xl"
                            style={{ background: 'linear-gradient(135deg, #8B4513, #D97706)' }}
                        />
                        <img
                            src={heroImg}
                            alt="Freshly baked premium chocolate chip cookies"
                            className="w-full max-w-lg rounded-[2.5rem] shadow-2xl border-8 border-white/70 relative z-10"
                            style={{ boxShadow: '0 25px 60px rgba(139,69,19,0.2)' }}
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-2xl font-bold" style={{ color: '#8B4513' }}>
                            Freshly Baked with Love
                        </p>
                        <p className="text-gray-500 mt-1 text-sm">
                            Every order is baked fresh & delivered within 24 hours
                        </p>
                    </motion.div>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-8 left-8 flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-white/60"
                >
                    <span className="text-2xl">🏆</span>
                    <div>
                        <p className="font-semibold text-sm" style={{ color: '#8B4513' }}>Premium Bakery</p>
                        <p className="text-xs text-gray-400">Since 2020</p>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center px-5 py-16 lg:py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-[440px]"
                >
                    {/* Logo & Header */}
                    <motion.div variants={itemVariants} className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group" aria-label="Cookie Heaven Home">
                            <motion.img
                                whileHover={{ rotate: [0, -15, 15, -10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                src={logoImg}
                                className="h-16 w-16 rounded-full object-cover border-2 border-[var(--color-primary)]/10 shadow-md"
                                alt="Cookie Heaven Logo"
                            />
                            <span className="font-bold text-3xl tracking-tight" style={{ color: '#8B4513' }}>
                                Cookie Heaven
                            </span>
                        </Link>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: '#5C2D0A' }}>
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                            Sign in to continue your cookie shopping and place your order.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        variants={itemVariants}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="space-y-5"
                    >
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#4A4A4A' }}>
                                Email Address
                            </label>
                            <div className="relative">
                                <FiMail
                                    className="absolute left-4 top-1/2 -translate-y-1/2"
                                    size={18}
                                    style={{ color: errors.email ? '#EF4444' : '#9CA3AF' }}
                                />
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    aria-label="Email Address"
                                    aria-invalid={errors.email ? "true" : "false"}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Please enter a valid email address'
                                        }
                                    })}
                                    placeholder="you@example.com"
                                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 transition-all outline-none text-sm
                    ${errors.email
                                            ? 'border-red-400 bg-red-50 focus:bg-red-50'
                                            : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-[#8B4513]'
                                        }`}
                                    style={{ color: '#2D2D2D' }}
                                />
                            </div>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs mt-1.5 ml-1 font-medium"
                                    role="alert"
                                >
                                    {errors.email.message}
                                </motion.p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: '#4A4A4A' }}>
                                Password
                            </label>
                            <div className="relative">
                                <FiLock
                                    className="absolute left-4 top-1/2 -translate-y-1/2"
                                    size={18}
                                    style={{ color: errors.password ? '#EF4444' : '#9CA3AF' }}
                                />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    aria-label="Password"
                                    aria-invalid={errors.password ? "true" : "false"}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        }
                                    })}
                                    placeholder="••••••••"
                                    className={`w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 transition-all outline-none text-sm
                    ${errors.password
                                            ? 'border-red-400 bg-red-50 focus:bg-red-50'
                                            : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-[#8B4513]'
                                        }`}
                                    style={{ color: '#2D2D2D' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs mt-1.5 ml-1 font-medium"
                                    role="alert"
                                >
                                    {errors.password.message}
                                </motion.p>
                            )}
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                                <input
                                    type="checkbox"
                                    {...register('remember')}
                                    className="w-4 h-4 rounded border-gray-300 transition-colors"
                                    style={{ accentColor: '#8B4513' }}
                                />
                                <span className="text-gray-500 group-hover:text-gray-700 transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                to="/"
                                className="font-semibold transition-all hover:underline underline-offset-2"
                                style={{ color: '#8B4513' }}
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={loading ? {} : { scale: 1.02, y: -1 }}
                            whileTap={loading ? {} : { scale: 0.98 }}
                            className="w-full py-3.5 rounded-2xl text-base font-semibold text-white flex items-center justify-center gap-2.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{
                                background: loading
                                    ? 'linear-gradient(135deg, #A0522D, #8B4513)'
                                    : 'linear-gradient(135deg, #8B4513, #A0522D)',
                                boxShadow: loading
                                    ? 'none'
                                    : '0 8px 24px rgba(139,69,19,0.35)'
                            }}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <FiArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Divider */}
                    <motion.div variants={itemVariants} className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #D1D5DB, transparent)' }} />
                        <span className="text-sm font-medium text-gray-400">OR</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #D1D5DB, transparent)' }} />
                    </motion.div>

                    {/* Social Login */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.01, y: -1 }}
                            whileTap={{ scale: 0.99 }}
                            type="button"
                            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 font-medium text-sm transition-all bg-white"
                            style={{ borderColor: '#E5E7EB', color: '#374151' }}
                            aria-label="Continue with Google"
                        >
                            <FcGoogle size={22} />
                            Continue with Google
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.01, y: -1 }}
                            whileTap={{ scale: 0.99 }}
                            type="button"
                            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 font-medium text-sm transition-all bg-white"
                            style={{ borderColor: '#E5E7EB', color: '#374151' }}
                            aria-label="Continue with Facebook"
                        >
                            <FaFacebook size={22} style={{ color: '#1877F2' }} />
                            Continue with Facebook
                        </motion.button>
                    </motion.div>

                    {/* Bottom Text */}
                    <motion.p variants={itemVariants} className="text-center text-gray-500 mt-8 text-sm">
                        Don't have an account?{' '}
                        <Link
                            to="/shop"
                            className="font-semibold transition-all hover:underline underline-offset-2"
                            style={{ color: '#8B4513' }}
                        >
                            Create Account
                        </Link>
                    </motion.p>
                </motion.div>
            </div>
        </main>
    );
}
