import { Link, useLocation } from 'react-router-dom';
import { Film, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/src/store/authStore';
import { Button } from './ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Talents', path: '/talents' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-cinema-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Film className="h-8 w-8 text-gold-500" />
              <span className="font-display text-xl font-bold tracking-tight text-white">
                FilmConnect <span className="text-gold-500">BD</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-gold-400 bg-white/5'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/post-job">
                  <Button variant="outline" size="sm" className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10">
                    Post a Job
                  </Button>
                </Link>
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  <div className="h-8 w-8 rounded-full bg-cinema-700 flex items-center justify-center overflow-hidden border border-white/10">
                    {user?.profilePhoto ? (
                      <img src={user.profilePhoto} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <UserIcon className="h-4 w-4" />
                    )}
                  </div>
                  <span>{user?.name}</span>
                </Link>
                <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-cinema-800">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/post-job"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gold-400 hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Post a Job
                </Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-400 hover:bg-white/5"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="mt-4 flex flex-col gap-2 px-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
