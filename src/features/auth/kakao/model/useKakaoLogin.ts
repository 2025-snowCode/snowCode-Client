import {useNavigate} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import {useKakaoMutation} from '@/features/auth/kakao/api/useKakaoMutation';
import {useCallback} from 'react';

/**
 * 카카오 로그인 프로세스를 처리하는 커스텀 훅
 */
export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const {login} = useUserStore();

  const {mutate} = useKakaoMutation({
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
        navigate('/');
        return;
      }

      mutate({code, role, studentId});
    },
    [navigate, mutate]
  );

  return {handleLogin};
};
