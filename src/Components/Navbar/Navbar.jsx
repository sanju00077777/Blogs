import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Feather } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isLoggedIn = sessionStorage.getItem("UserID") !== null;

    const handleLogout = () => {
        sessionStorage.removeItem("UserID");
        window.location.href = "/";
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "New Post", path: "/NewPost" },
        ...(isLoggedIn ? [] : [{ name: "Login", path: "/Login" }])
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b-0 border-white/10 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-white font-heading font-bold text-xl tracking-wider">
                    <Feather className="text-primary-400" size={24} />
                    <span>Our Blogs</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                "text-sm font-medium transition-colors hover:text-primary-400 font-body relative",
                                location.pathname === link.path ? "text-primary-400" : "text-slate-300"
                            )}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400 rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                    {isLoggedIn && (
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium transition-colors hover:text-red-400 font-body relative text-slate-300"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-slate-300 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full glass border-t border-white/10 py-4 px-6 md:hidden flex flex-col gap-4 shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    "text-lg font-medium py-2 border-b border-white/5",
                                    location.pathname === link.path ? "text-primary-400" : "text-slate-300"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                                className="text-lg font-medium py-2 border-b border-white/5 text-slate-300 text-left"
                            >
                                Logout
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;