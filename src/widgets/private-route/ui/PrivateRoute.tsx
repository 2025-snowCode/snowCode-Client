import {Navigate, Outlet} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import {ROUTES} from '@/shared/config/routes';

interface PrivateRouteProps {
  allowedRoles?: ('admin' | 'student')[];
}

export default function PrivateRoute({allowedRoles}: PrivateRouteProps) {
  const {isAuthenticated, userType} = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ROOT} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userType as 'admin' | 'student')) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
