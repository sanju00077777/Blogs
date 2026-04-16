import React, { useState, useEffect } from "react";
import TrendingBlog from "../../Components/TrendingBlog/TrendingBlog";
import blogs from "../../Utils/MockData";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

function CategoryBlogs() {
    const [currentCategory, setCurrentCategory] = useState('Programming');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        if (category) {
            setCurrentCategory(category);
            setFilteredBlogs(blogs.filter(b => b.category === category));
        }
    }, [category]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-6 pt-10"
        >
            <Link to="/" className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium mb-8 transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Back to All Blogs
            </Link>

            <div className="mb-12">
                <motion.h1 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-4xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-600 inline-block mb-4"
                >
                    {currentCategory} Blogs
                </motion.h1>
                <div className="h-1 w-20 bg-primary-500 rounded-full"></div>
            </div>

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
                        No blogs found in the {currentCategory} category.
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default CategoryBlogs;