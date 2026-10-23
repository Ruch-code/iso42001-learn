import React, { useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  roles?: string[];
  app_metadata?: {
    approved?: boolean;
    pending_approval?: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isApproved: boolean;
  isPending: boolean;
}

// Use a global store approach - store auth state in window.localStorage
// so it's shared across all React islands
function getStoredAuth() {
  try {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem('iso42001-auth');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // Ignore localStorage errors
  }
  return null;
}

function setStoredAuth(auth: User | null) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('iso42001-auth', JSON.stringify(auth));
    }
  } catch (e) {
    // Ignore localStorage errors
  }
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isApproved: boolean;
  isPending: boolean;
}

// Initialize with stored state or null
const storedUser = getStoredAuth();

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function isBrowser() {
  return typeof window !== 'undefined';
}

function getIdentity() {
  return typeof window !== 'undefined' && window.netlifyIdentity ? window.netlifyIdentity : null;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(storedUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize netlify-identity-widget only once in browser
    if (!isBrowser()) return;
    
    // Only initialize if not already initialized
    if (!window.netlifyIdentity) {
      import('netlify-identity-widget').then(module => {
        window.netlifyIdentity = module.default;
        // Initialize the widget
        window.netlifyIdentity.init();
      });
    }
    
    // Sync with Netlify Identity
    const identity = getIdentity();
    const currentUser = identity ? identity.currentUser() : null;
    
    if (currentUser) {
      const userData = {
        id: currentUser.id,
        email: currentUser.email,
        roles: currentUser.app_metadata?.roles,
        app_metadata: {
          approved: currentUser.app_metadata?.approved,
          pending_approval: currentUser.app_metadata?.pending_approval,
        },
      };
      setUser(userData);
      setStoredAuth(userData);
    }
    
    setLoading(false);
  }, []);

  // Sync user changes to localStorage
  useEffect(() => {
    setStoredAuth(user);
  }, [user]);

  const signUp = async (email: string, password: string) => {
    if (!isBrowser() || !window.netlifyIdentity) return;
    await window.netlifyIdentity.open('signup');
  };

  const signIn = async (email: string, password: string) => {
    if (!isBrowser() || !window.netlifyIdentity) return;
    await window.netlifyIdentity.open('login');
  };

  const signOut = async () => {
    if (!isBrowser() || !window.netlifyIdentity) return;
    await window.netlifyIdentity.logout();
    setUser(null);
    setStoredAuth(null);
  };

  const identity = getIdentity();
  const currentUser = identity ? identity.currentUser() : null;
  const isApproved = currentUser?.app_metadata?.approved === true;
  const isPending = currentUser?.app_metadata?.pending_approval === true;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        isApproved,
        isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Modified useAuth that fails gracefully instead of throwing
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    // Return logged-out state gracefully instead of throwing
    return {
      user: null,
      loading: false,
      signUp: async () => {},
      signIn: async () => {},
      signOut: async () => {},
      isApproved: false,
      isPending: false,
    };
  }
  return context;
}
