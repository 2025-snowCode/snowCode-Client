import {useEffect, useRef} from 'react';
import {useKakaoLogin} from '@/features/auth/kakao/model/useKakaoLogin';

export default function KakaoCallbackPage() {
  const called = useRef(false);
  const {handleLogin} = useKakaoLogin();

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    handleLogin(code ?? '', state);
  }, [handleLogin]);

  return <div>로그인 처리 중...</div>;
}
