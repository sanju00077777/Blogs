import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import blogs from '../../Utils/MockData';

const categoryBackgrounds = {
    Programming: "url('/media/programming.jpg')",
    Travelling: "url('/media/Travelling.jpg')",
    Cooking: "url('/media/cooking.jpg')",
    Workouts: "url('/media/Fitness.jpg')",
    Health: "url('/media/Health.jpg')",
    default: "url('/media/Banner.jpg')"
};

function DedicatedBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for the skeleton effect
        setIsLoading(true);
        const timer = setTimeout(() => {
            const foundBlog = blogs.find(b => b.id === parseInt(id));
            setBlog(foundBlog || blogs[0]);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 max-w-4xl mx-auto px-6">
                <div className="animate-pulse flex space-x-4 mb-8">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-8 bg-slate-700 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                        <div className="space-y-3 pt-10">
                            <div className="h-4 bg-slate-700 rounded"></div>
                            <div className="h-4 bg-slate-700 rounded"></div>
                            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const bgImage = categoryBackgrounds[blog.category] || categoryBackgrounds.default;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
        >
            {/* Dynamic Hero Section */}
            <div 
                className="relative h-[60vh] flex items-end justify-center pb-20 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{ backgroundImage: bgImage }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/40"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center">
                    <Link to="/" className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium mb-8 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Articles
                    </Link>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1 mb-6 rounded-full glass border border-white/20 text-sm font-semibold tracking-wider uppercase">
                            {blog.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white text-glow leading-tight">
                            {blog.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <main className="max-w-3xl mx-auto px-6 py-16">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="prose prose-invert prose-lg text-slate-300 font-body leading-relaxed"
                >
                    {/* Just splitting the content into paragraphs for better readability if possible, otherwise render normally */}
                    {blog.content.split('. ').map((sentence, index, array) => {
                        if(sentence) {
                             return <p key={index} className="mb-6">{sentence}{(index !== array.length -1) ? '.' : ''}</p>
                        }
                        return null;
                    })}
                </motion.div>
            </main>
        </motion.div>
    );
}

export default DedicatedBlog;