import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/src/components/Navbar';
import { Home } from '@/src/pages/Home';
import { Jobs } from '@/src/pages/Jobs';
import { Login } from '@/src/pages/Login';
import { Register } from '@/src/pages/Register';
import { Dashboard } from '@/src/pages/Dashboard';
import { PostJob } from '@/src/pages/PostJob';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/src/store/authStore';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div></div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

function AppContent() {
  const { login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          login(data.user);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [login, logout, setLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-cinema-900 text-gray-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/talents" element={<div className="p-8 text-center text-gray-400">Talents Directory Coming Soon</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/post-job" element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <footer className="border-t border-white/10 bg-cinema-900 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} FilmConnect BD. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
