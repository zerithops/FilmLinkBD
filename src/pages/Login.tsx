import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { useAuthStore } from '@/src/store/authStore';
import { Film } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      login(data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cinema-900/90 mix-blend-multiply" />
        <img 
          src="https://picsum.photos/seed/director/1920/1080?blur=4" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-900 via-transparent to-cinema-900" />
      </div>

      <Card className="w-full max-w-md relative z-10 glass-panel border-white/10">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Film className="h-10 w-10 text-gold-500" />
          </div>
          <CardTitle className="text-3xl font-display">Welcome Back</CardTitle>
          <p className="text-sm text-gray-400">Sign in to your FilmConnect BD account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            <Input
              label="Email"
              type="email"
              placeholder="director@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
              Sign In
            </Button>
            
            <div className="text-center mt-4 text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold-400 hover:text-gold-300 transition-colors">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
