import {useNavigate} from 'react-router-dom';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import {kakaoLogin} from '@/entities/auth/api/authApi';
import {kakaoService} from '../lib/kakaoService';

/**
 * 카카오 로그인 프로세스를 처리하는 커스텀 훅
 */
export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const {login} = useUserStore();

  const handleLogin = async (code: string, state: string | null) => {
    const [role, studentId] = (state ?? '').split(':') as [
      'ADMIN' | 'USER',
      string,
    ];

    if (!code || !role) {
      alert('카카오 로그인에 실패했습니다.');
      navigate('/');
      return;
    }

    try {
      // 1. 카카오 액세스 토큰 발급
      const kakaoAccessToken = await kakaoService.getAccessToken(code);
      
      // 2. 백엔드 로그인 처리 (JWT 발급)
      const {userName, userType, accessToken: jwtToken} = await kakaoLogin(
        kakaoAccessToken,
        role,
        studentId
      );

      // 3. 사용자 정보 저장 및 이동
      login(userName, userType, jwtToken);
      navigate(userType === 'admin' ? '/admin' : '/student');
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/');
    }
  };

  return {handleLogin};
};
