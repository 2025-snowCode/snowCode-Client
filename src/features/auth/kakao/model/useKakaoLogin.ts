import {useNavigate} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import {useMutation} from '@tanstack/react-query';
import {kakaoMutations} from '@/features/auth/kakao/api/kakaoMutations';
import {useCallback} from 'react';
import {ROUTES} from '@/shared/config/routes';

export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const {login} = useUserStore();

  const {mutate} = useMutation({
    ...kakaoMutations.kakaoLogin,
    onSuccess: ({response}) => {
      const userType = response.role === 'ADMIN' ? 'admin' : 'student';
      login(response.name, userType, response.accessToken);
      navigate(userType === 'admin' ? '/admin' : '/student');
    },
    onError: (error) => {
      console.error('Login error:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/');
    },
  });

  const handleLogin = useCallback(
    (code: string, state: string | null) => {
      const [role, studentId] = (state ?? '').split(':') as [
        'ADMIN' | 'USER',
        string,
      ];

      if (!code || !role || !['ADMIN', 'USER'].includes(role)) {
        alert('카카오 로그인에 실패했습니다.');
        navigate(ROUTES.ROOT);
        return;
      }

      mutate({code, role, studentId});
    },
    [navigate, mutate]
  );

  return {handleLogin};
};
