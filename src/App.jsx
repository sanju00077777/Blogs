import './App.css'
import Login from './Pages/Login/Login'
import NewPost from './Pages/NewPost/NewPost'
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import CategoryBlogs from './Pages/CategoryBlogs/CategoryBlogs';
import DedicatedBlog from './Pages/DedicatedBlog/DedicatedBlog';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("UserID");
  return isAuthenticated ? children : <Navigate to="/Login" replace />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("UserID");
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  const location = useLocation();
  const hiddenNavPaths = ['/Login'];
  const showNav = !hiddenNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen relative font-body text-slate-200">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 z-[-1] bg-background bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black"></div>

      {showNav && <Navbar />}
      
      <main className="pt-20 pb-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/NewPost' element={<ProtectedRoute><NewPost /></ProtectedRoute>} /> 
            <Route path='/Blogs/:category' element={<ProtectedRoute><CategoryBlogs /></ProtectedRoute>} />
            <Route path='/Blog/:id' element={<ProtectedRoute><DedicatedBlog /></ProtectedRoute>} />
          </Routes>
        </AnimatePresence>
      </main>

      {showNav && <Footer />}
    </div>
  )
}

export default App
