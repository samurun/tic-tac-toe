import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

type ProtectedProps = {
  children: React.ReactNode;
};

export default function Protected({ children }: ProtectedProps) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to='/' />;
  }

  return children;
}
