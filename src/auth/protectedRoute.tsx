// src/auth/protectedRoute.tsx
import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { authentication } from '@/config/firebase';
import Warning from '@/components/warning';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      setShowWarning(true);
    }
  }, [loading, user]);

  if (loading) {
    return null; // o un spinner de carga si lo prefieres
  }

  if (showWarning) {
    return <Warning />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
