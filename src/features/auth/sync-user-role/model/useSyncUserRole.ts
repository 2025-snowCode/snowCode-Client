import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';

export function useSyncUserRole() {
  const {pathname} = useLocation();
  const {setUserType, isAuthenticated} = useUserStore();

  useEffect(() => {
    if (isAuthenticated) return;

    if (pathname.startsWith('/admin')) {
      setUserType('admin');
    } else if (pathname.startsWith('/student')) {
      setUserType('student');
    } else {
      setUserType('guest');
    }
  }, [pathname, setUserType, isAuthenticated]);
}
