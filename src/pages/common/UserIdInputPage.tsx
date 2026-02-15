import {useState, useRef, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import SnowCodeEntryMini from '@/assets/images/snowCode_entry_mini.svg';
import kakaoLogo from '@/assets/images/kakao_logo.svg';
import ArrowleftIcon from '@/assets/svg/arrowleftIcon.svg?react';
import Button from '@/components/common/Button';
import {kakaoService} from '@/features/auth/kakao/lib/kakaoService';

export default function UserIdInputPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const type = new URLSearchParams(location.search).get('type');
  const isAdmin = type === 'admin';

  const length = 7;
  const [userId, setUserId] = useState<string[]>(new Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const {value} = e.target;
    if (!/^\d*$/.test(value)) return;

    const newId = [...userId];
    newId[index] = value.slice(-1);
    setUserId(newId);

    if (value && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const newId = [...userId];

    if (e.key === 'Backspace') {
      if (userId[index]) {
        newId[index] = '';
      } else if (index > 0) {
        newId[index - 1] = '';
        setActiveIndex(index - 1);
      }
      setUserId(newId);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const userIdString = userId.join('');
  const isComplete = userIdString.length === length;
  const kakaoEnabled = isComplete;

  const handleBeforeClick = () => {
    navigate('/');
  };

  const handleKakaoLogin = () => {
    const role = isAdmin ? 'ADMIN' : 'USER';
    window.location.href = kakaoService.getAuthUrl(role, userIdString);
  };

  return (
    <div className='relative flex flex-col items-center min-h-[calc(100vh-120px)] text-center'>
      <div className='absolute top-[43px] left-[60px] flex items-center gap-4'>
        <ArrowleftIcon className='w-[18px] h-[24px]' />
        <Button
          color='ghost'
          onClick={handleBeforeClick}
          size='none'
          className='leading-7 text-lg'>
          이전으로
        </Button>
      </div>
      <div className='w-[216px] h-[216px] mt-19'>
        <img src={SnowCodeEntryMini} alt='SnowCode Entry Mini' />
      </div>

      <div className='flex flex-col items-center gap-6'>
        <div className='text-[32px] text-primary-black not-italic font-semibold leading-[150%]'>
          학번을 입력해주세요
        </div>

        <div className='flex justify-center gap-2.5 mb-13'>
          {userId.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={digit}
              aria-label={`학번 자리 ${i + 1}`}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onClick={() => setActiveIndex(i)}
              className={`
                  w-10 h-12 text-center border rounded-md text-lg font-medium
                  ${
                    activeIndex === i
                      ? 'border-primary focus:outline-none focus:ring-0'
                      : digit
                        ? 'border-stroke text-primary-black'
                        : 'border-stroke'
                  }
                `}
            />
          ))}
        </div>

        <button
          disabled={!kakaoEnabled}
          onClick={handleKakaoLogin}
          className='flex items-center gap-2 justify-center text-primary-black text-lg font-semibold leading-[150%] bg-[#fade4a] w-[380px] py-4 rounded-lg mx-auto cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'>
          <img
            src={kakaoLogo}
            alt='카카오 로고'
            className='w-[26px] h-[26px]'
          />
          카카오 로그인
        </button>
      </div>
    </div>
  );
}
