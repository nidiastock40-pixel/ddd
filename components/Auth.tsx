
import React, { useState } from 'react';
import { TrendingUp, Mail, Lock, User, ArrowRight, Loader2, ArrowLeft, ShieldAlert } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthProps {
  onAuthSuccess: (user: UserType) => void;
}

type AuthState = 'login' | 'signup' | 'forgot-password';

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [state, setState] = useState<AuthState>('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Hardcoded Admin check
      if (state === 'login' && formData.email === 'admin@socialgrowth.com' && formData.password === 'adminPassword123') {
        const adminUser: UserType = {
          id: 'admin-001',
          email: formData.email,
          name: 'Super Admin',
          role: 'admin',
          balance: 99999.99,
          totalSpent: 0,
          totalOrders: 0,
          joinedDate: '01/01/2024',
        };
        onAuthSuccess(adminUser);
        setLoading(false);
        return;
      }

      if (state === 'forgot-password') {
        alert('Password reset link sent to ' + formData.email);
        setState('login');
        setLoading(false);
        return;
      }

      const mockUser: UserType = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: state === 'login' ? 'User' : formData.name,
        role: 'user',
        balance: 0,
        totalSpent: 0,
        totalOrders: 0,
        joinedDate: new Date().toLocaleDateString(),
      };
      onAuthSuccess(mockUser);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl mb-4 shadow-xl shadow-indigo-600/20">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">SocialGrowth</h1>
          <p className="text-slate-400">Secure AI-Powered Marketing Hub</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl">
          {state !== 'forgot-password' && (
            <div className="flex bg-slate-800/50 p-1 rounded-2xl mb-8">
              <button 
                onClick={() => setState('login')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${state === 'login' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setState('signup')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${state === 'signup' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Sign Up
              </button>
            </div>
          )}

          {state === 'forgot-password' && (
            <button onClick={() => setState('login')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </button>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {state === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  required 
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {state !== 'forgot-password' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                  {state === 'login' && (
                    <button 
                      type="button" 
                      onClick={() => setState('forgot-password')}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="password" 
                    required 
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {state === 'login' ? 'Sign In' : state === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {state === 'login' && (
            <div className="mt-8 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Admin Access</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                Email: admin@socialgrowth.com<br/>
                Pass: adminPassword123
              </p>
            </div>
          )}

          <p className="mt-8 text-center text-slate-500 text-sm">
            By continuing, you agree to our <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
