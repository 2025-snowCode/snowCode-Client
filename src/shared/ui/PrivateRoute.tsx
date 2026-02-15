import {Navigate, Outlet} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';

export default function PrivateRoute() {
  const {isAuthenticated} = useUserStore();
  return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
}
