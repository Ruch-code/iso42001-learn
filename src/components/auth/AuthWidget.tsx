import { useAuth } from './AuthProvider';
import { useState, useEffect } from 'react';

function isBrowser() {
  return typeof window !== 'undefined';
}

function getIdentity() {
  return typeof window !== 'undefined' && window.netlifyIdentity ? window.netlifyIdentity : null;
}

export default function AuthWidget() {
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (!isBrowser() || !window.netlifyIdentity) return;
      if (mode === 'signup') {
        await window.netlifyIdentity.open('signup');
      } else {
        await window.netlifyIdentity.open('login');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  if (!mounted) {
    return <div className="fixed bottom-4 right-4 z-50" />;
  }

  const identity = getIdentity();

  if (identity && !identity.currentUser()) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" />
        <div className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-blue-600 hover:underline font-medium"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => window.netlifyIdentity?.open(user ? 'settings' : 'login')}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors shadow-lg"
      >
        {user ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span>{user.email}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
        ) : (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Sign In</span>
          </span>
        )}
      </button>
    </div>
  );
}
