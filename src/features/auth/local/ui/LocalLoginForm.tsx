import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/shared/config/routes';
import {localMutations} from '@/features/auth/local/api/localMutations';
import {useUserStore} from '@/entities/auth/model/useUserStore';

interface LocalLoginFormProps {
  isAdmin: boolean;
  studentId?: string;
}

export default function LocalLoginForm({
  isAdmin,
  studentId,
}: LocalLoginFormProps) {
  const navigate = useNavigate();
  const {login} = useUserStore();

  const [localName, setLocalName] = useState('');
  const [localEmail, setLocalEmail] = useState('');
  const [localOAuthToken, setLocalOAuthToken] = useState('');

  const {mutate: localLogin, isPending} = useMutation({
    ...localMutations.localLogin,
    onSuccess: (data) => {
      const userType = data.role === 'ADMIN' ? 'admin' : 'student';
      login(data.name, userType, data.accessToken, data.memberId);
      navigate(userType === 'admin' ? ROUTES.ADMIN.ROOT : ROUTES.STUDENT.ROOT);
    },
    onError: (error) => {
      console.error('Local login error:', error);
      alert('로컬 로그인에 실패했습니다. 입력 정보를 확인해주세요.');
    },
  });

  const handleLocalSubmit = () => {
    if (!localName || !localEmail.trim()) {
      alert('이름과 이메일을 입력해주세요.');
      return;
    }
    if (!isAdmin && !studentId) {
      alert('학번을 먼저 입력해주세요.');
      return;
    }
    localLogin({
      name: localName,
      role: isAdmin ? 'ADMIN' : 'USER',
      studentId,
      email: localEmail,
      oAuthToken: localOAuthToken,
    });
  };

  return (
    <form onSubmit={(e) => {e.preventDefault(); handleLocalSubmit();}}
    className='flex flex-col gap-3 w-95 text-left mt-6 animate-in fade-in slide-in-from-top-2 duration-300'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='locale-name' className='text-xs font-medium text-secondary-black'>
          테스트용 이름
        </label>
        <input
          id='locale-name'
          type='text'
          placeholder='이름'
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          className='border border-stroke rounded-md px-3 py-2.5 text-sm focus:border-primary outline-none transition-colors'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='local-email' className='text-xs font-medium text-secondary-black'>
          테스트용 이메일
        </label>
        <input
          id='local-email'
          type='email'
          placeholder='이메일'
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          className='border border-stroke rounded-md px-3 py-2.5 text-sm focus:border-primary outline-none transition-colors'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='local-oauth-token' className='text-xs font-medium text-secondary-black'>
          OAuth Token (선택 사항)
        </label>
        <input
          id='local-oauth-token'
          type='password'
          placeholder='OAuthToken'
          value={localOAuthToken}
          onChange={(e) => setLocalOAuthToken(e.target.value)}
          className='border border-stroke rounded-md px-3 py-2.5 text-sm focus:border-primary outline-none transition-colors'
        />
      </div>

      <button
        type='submit'
        disabled={isPending}
        className='bg-primary text-white text-sm font-semibold py-3.5 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all mt-2'>
        {isPending ? '로그인 중...' : '로컬 로그인 실행'}
      </button>
    </form>
  );
}
