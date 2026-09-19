import { useAuth } from './AuthProvider';

interface ProtectedContentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedContent({ children, fallback }: ProtectedContentProps) {
  const { user, loading, isApproved, isPending } = useAuth();

  if (loading) {
    return (
      <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!window.netlifyIdentity) {
    return (
      <div class="text-center py-12 text-gray-500">
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (!window.netlifyIdentity?.currentUser()) {
    return (
      <div class="text-center py-12">
        <p class="text-gray-600 mb-4">Please sign in to access this content.</p>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.open('login');
              }
            `
          }}
        />
      </div>
    );
  }

  const user = window.netlifyIdentity.currentUser();
  const isApproved = user?.app_metadata?.approved === true;
  const isPending = user?.app_metadata?.pending_approval === true;

  if (isPending) {
    return (
      <div class="text-center py-12">
        <div class="inline-flex items-center gap-2 text-yellow-600 mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.36 0L3.36 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span class="font-medium">Account Pending Approval</span>
        </div>
        <p class="text-gray-600 mb-4">Your account is pending admin approval. You'll receive an email once approved.</p>
        <button
          onClick={() => window.netlifyIdentity?.logout()}
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Sign Out
        </button>
      </div>
    );
  }

  if (fallback && !user?.app_metadata?.approved) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}