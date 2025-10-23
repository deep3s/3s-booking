import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store/store';

// Protects routes by checking if user is authenticated
export default function ProtectedRoute() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  // If not authenticated, redirect to /auth
  if (!accessToken) {
    return <Navigate to="/auth" replace />;
  }
  // If authenticated, render child routes
  return <Outlet />;
}

