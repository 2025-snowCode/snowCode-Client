import {useEffect, useRef} from 'react';
import {useKakaoLogin} from '@/features/auth/kakao/model/useKakaoLogin';

export default function KakaoCallbackPage() {
  const called = useRef(false);
  const {handleLogin} = useKakaoLogin();

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error) {
      console.warn(
        '카카오 로그인이 취소 되었거나 실패했습니다.',
        params.get('error_description')
      );
      return;
    }
    const code = params.get('code');
    const state = params.get('state');

    handleLogin(code ?? '', state);
  }, [handleLogin]);

  return <div>로그인 처리 중...</div>;
}
