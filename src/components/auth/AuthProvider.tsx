import React, { useContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

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

const AuthContext = React.createContext<{
  user: {
    id: string;
    email: string;
    roles?: string[];
    app_metadata?: {
      approved?: boolean;
      pending_approval?: boolean;
    };
  } | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isApproved: boolean;
  isPending: boolean;
} | undefined>(undefined);

function isBrowser() {
  return typeof window !== 'undefined';
}

function getIdentity() {
  return typeof window !== 'undefined' && window.netlifyIdentity ? window.netlifyIdentity : null;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    roles?: string[];
    app_metadata?: {
      approved?: boolean;
      pending_approval?: boolean;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.netlifyIdentity) {
      setLoading(false);
      return;
    }

    const identity = window.netlifyIdentity;
    identity.on('init', (user) => {
      setUser(user);
      setLoading(false);
    });

    identity.on('login', (user) => setUser(user));
    identity.on('logout', () => setUser(null));

    identity.init();
  }, []);

  const signUp = async (email: string, password: string) => {
    if (typeof window === 'undefined' || !window.netlifyIdentity) return;
    await window.netlifyIdentity.open('signup');
  };

  const signIn = async (email: string, password: string) => {
    if (typeof window === 'undefined' || !window.netlifyIdentity) return;
    await window.netlifyIdentity.open('login');
  };

  const signOut = async () => {
    if (typeof window === 'undefined' || !window.netlifyIdentity) return;
    await window.netlifyIdentity.logout();
  };

  const identity = getIdentity();
  const currentUser = identity ? identity.currentUser() : null;
  const isApproved = user?.app_metadata?.approved === true;
  const isPending = user?.app_metadata?.pending_approval === true;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        isApproved: !!isApproved,
        isPending: !!isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

