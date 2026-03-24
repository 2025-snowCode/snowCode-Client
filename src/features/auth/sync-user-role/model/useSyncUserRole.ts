import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';

export function useSyncUserRole() {
  const {pathname} = useLocation();
  const {setUserType} = useUserStore();

  useEffect(() => {
    const userType = pathname.startsWith('/admin')
      ? 'admin'
      : pathname.startsWith('/student')
        ? 'student'
        : 'guest';
    setUserType(userType);
  }, [pathname, setUserType]);
}
