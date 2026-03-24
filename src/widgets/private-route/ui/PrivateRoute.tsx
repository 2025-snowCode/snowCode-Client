import {Navigate, Outlet} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';

interface PrivateRouteProps {
  allowedRoles?: ('admin' | 'student')[];
}

export default function PrivateRoute({allowedRoles}: PrivateRouteProps) {
  const {isAuthenticated, userType} = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userType as 'admin' | 'student')) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
