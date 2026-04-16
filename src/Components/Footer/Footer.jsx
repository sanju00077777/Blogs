import React from 'react';

function Footer() {
    return (
        <footer className="w-full glass border-t border-white/10 py-6 mt-10">
            <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 font-body">
                <p className=''>Developed by Sanjeev</p> 
                <p className="text-sm mt-2 text-slate-500">© {new Date().getFullYear()} Our Blogs. All rights reserved.</p>
            </div>
        </footer>
    );
}
export default Footer;