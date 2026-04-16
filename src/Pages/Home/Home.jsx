import React, { useState, useEffect } from "react";
import TrendingBlog from "../../Components/TrendingBlog/TrendingBlog";
import blogs from "../../Utils/MockData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const categories = ["All", "Programming", "Cooking", "Workouts", "Health", "Travelling"];

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredBlogs(blogs);
        } else {
            setFilteredBlogs(blogs.filter(blog => blog.category === selectedCategory));
        }
    }, [selectedCategory]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-6"
        >
            {/* Hero Section */}
            <div className="py-20 text-center">
                <motion.h1 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-600 mb-6"
                >
                    Discover The Best Reads
                </motion.h1>
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg max-w-2xl mx-auto"
                >
                    Explore trending topics, insightful tutorials, and inspiring stories curated just for you.
                </motion.p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat, index) => (
                    <motion.button
                        key={cat}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            selectedCategory === cat 
                                ? "bg-primary-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                                : "glass text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>

            {/* Blog Grid */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map(blog => (
                        <TrendingBlog key={blog.id} blog={blog} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-slate-400">
                        No blogs found in this category.
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default Home;