import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiPhone, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import logoImg from '../assets/logo.webp';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pendingData, setPendingData] = useState(null);
    const { loginWithEmail, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: '', phone: '' }
    });

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            try {
                const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const userInfo = await response.json();

                loginWithGoogle({
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                    googleId: userInfo.sub
                });

                toast.success('✅ Google Login Successful!');
                navigate('/');
            } catch (error) {
                toast.error("Failed to sign in with Google.");
            } finally {
                setLoading(false);
            }
        },
        onError: () => toast.error("Google Sign-In failed.")
    });

    const onSubmit = (data) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPendingData(data);
            setShowModal(true);
        }, 1500);
    };

    const handleVerify = () => {
        loginWithEmail(pendingData.email, pendingData.phone);
        toast.success('✅ Verified successfully!', { style: { borderRadius: '16px' } });
        setShowModal(false);
        navigate('/');
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-[#FFFDF9]">
            <SEO title="Login | Cookie Heaven" />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(139,69,19,0.08)] border border-amber-50">
                <div className="text-center mb-8 flex flex-col items-center">
                    <img src={logoImg} className="w-16 h-16 rounded-full border border-[#8B4513]/10 shadow-sm" alt="Logo" />
                    <h1 className="text-2xl font-bold text-[#5C2D0A] mt-4 mb-2">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Enter your Email and Phone to continue.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-[#4A4A4A]">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@gmail\.com$/i, message: 'Must be a valid Gmail.' } })}
                                placeholder="example@gmail.com"
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 outline-none transition-all text-sm focus:border-[#8B4513]"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-[#4A4A4A]">Mobile Number</label>
                        <div className="relative">
                            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="tel"
                                {...register('phone', { required: 'Phone is required.', pattern: { value: /^[0-9]{10}$/, message: 'Must be 10 digits.' } })}
                                placeholder="Enter 10-digit number"
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 outline-none transition-all text-sm focus:border-[#8B4513]"
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.phone.message}</p>}
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3.5 rounded-2xl font-bold text-white bg-[#8B4513] hover:bg-[#70380f] transition-all disabled:opacity-75 relative top-2 shadow-lg shadow-[#8B4513]/20">
                        {loading ? 'Processing...' : 'Continue with Email'}
                    </button>

                    <div className="flex items-center gap-4 py-3 relative">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-sm font-medium text-gray-400">OR</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>
                </form>

                <button onClick={handleGoogleLogin} className="w-full mt-2 flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 font-semibold text-sm transition-all bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300">
                    <FcGoogle size={24} /> Continue with Google
                </button>
            </motion.div>

            {/* Email Verification Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white p-8 rounded-[2rem] shadow-2xl relative z-10 w-full max-w-sm text-center border-2 border-[#8B4513]/10">
                            <div className="w-16 h-16 bg-[#FEF0E0] rounded-full flex items-center justify-center mx-auto mb-4 text-[#8B4513]">
                                <FiMail size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#5C2D0A] mb-2">Check Your Email</h2>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">A verification link has been sent to <b>{pendingData?.email}</b>.</p>
                            <p className="text-[11px] text-amber-600 mb-8 font-medium bg-amber-50 p-2 rounded-lg italic">(Frontend Demo Phase - No real email dispatched. Click bypass button below)</p>

                            <div className="flex flex-col gap-3">
                                <button onClick={handleVerify} className="w-full py-3.5 bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold rounded-xl transition-all shadow-md shadow-[#8B4513]/20">
                                    Simulate Verification
                                </button>
                                <button onClick={() => setShowModal(false)} className="w-full py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
