import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        emailAddress: "",
        password: ""
    });

    function handleInput(e) {
        let value = e.target.value;
        let fieldName = e.target.name;
        setLoginDetails((prev) => { 
            return {
                ...prev,
                [fieldName]: value
            }
        });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        // Bypassing all backend validation for seamless UI testing
        sessionStorage.setItem("UserID", "mock_user_bypassed");
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center justify-center space-x-2 text-white font-heading font-bold text-2xl tracking-wider mb-2">
                        <Feather className="text-primary-400" size={28} />
                        <span>Our Blogs</span>
                    </Link>
                    <p className="text-slate-400">Welcome back! Please login to your account.</p>
                </div>

                <div className="glass p-8 rounded-2xl">
                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-body" 
                                placeholder="name@example.com" 
                                name="emailAddress" 
                                onChange={handleInput} 
                                value={loginDetails.emailAddress} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                            <input 
                                type="password" 
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-body" 
                                placeholder="••••••••" 
                                name="password" 
                                onChange={handleInput} 
                                value={loginDetails.password} 
                            />
                        </div>
                        <button 
                            className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-primary-500/30" 
                            type="submit" 
                        >
                            Login
                        </button>
                    </form>
                    

                </div>
            </motion.div>
        </div>
    );
}

export default Login;