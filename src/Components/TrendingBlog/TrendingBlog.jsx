import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100 }
    }
};

function TrendingBlog({ blog }) {
    let image = '';
    switch (blog.category) {
        case "Travelling": image = 'Travelling.jpg'; break;
        case "Cooking": image = 'cooking.jpg'; break;
        case "Programming": image = 'programming.jpg'; break;
        case "Workouts": image = 'Fitness.jpg'; break;
        case "Health": image = 'Health.jpg'; break;
        default: image = "Banner.jpg"; break;
    }

    return (
        <motion.div variants={itemVariants} className="h-full">
            <Link to={`/Blog/${blog.id}`} className="block h-full group">
                <div className="glass rounded-xl overflow-hidden h-full transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={`/media/${image}`} 
                            alt={blog.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/10 uppercase tracking-wider">
                                {blog.category}
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                        <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
                            {blog.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                            {blog.previewDescription}
                        </p>
                        
                        <div className="flex items-center text-primary-400 font-medium text-sm mt-auto group-hover:text-primary-300">
                            Read Article 
                            <ArrowRight size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default TrendingBlog;