import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import SnowCodeEntry from '@/assets/images/snowCode_entry.svg?react';
import {ROUTES} from '@/shared/config/routes';
import SnowCodeStudent from '@/assets/images/snowCode_student.svg?react';
import SnowCodeAdmin from '@/assets/images/snowCode_admin.svg?react';
import ArrowrightIcon from '@/assets/svg/arrowrightIcon.svg?react';
import Button from '@/shared/ui/button/Button';

type HoverState = 'none' | 'student' | 'admin';

export default function LandingPage() {
  const navigate = useNavigate();
  const [hover, setHover] = useState<HoverState>('none');
  const [selected, setSelected] = useState<'none' | 'student' | 'admin'>(
    'none'
  );

  const handleNextClick = () => {
    if (selected === 'student') {
      navigate(`${ROUTES.USER_ID}?type=student`);
    } else if (selected === 'admin') {
      navigate(`${ROUTES.USER_ID}?type=admin`);
    } else {
      alert('사용자 유형을 선택해주세요!');
    }
  };

  const LogoImg =
    hover === 'student'
      ? SnowCodeStudent
      : hover === 'admin'
        ? SnowCodeAdmin
        : SnowCodeEntry;

  return (
    <div className='relative flex flex-col justify-center items-center text-center'>
      {/* 상단 오른쪽 "다음으로" 버튼 */}
      <div className='absolute top-0 right-15 flex items-center gap-4'>
        <ArrowrightIcon className='w-4.5 h-6' />
        <Button
          color='ghost'
          onClick={handleNextClick}
          size='none'
          className='leading-7 text-lg'>
          다음으로
        </Button>
      </div>

      {/* 로고 이미지 (선택/호버에 따라 이미지 변경) */}
      <div
        className={`relative w-100 flex-center transition-all duration-800 ${hover !== 'none' ? 'scale-115' : ''}`}>
        <LogoImg className='w-full h-full' />
      </div>

      {/* 텍스트 및 버튼 영역 */}
      <div className='flex flex-col -mt-12'>
        <div className='flex flex-col gap-7'>
          <span className='text-black-primary text-4xl font-semibold leading-[150%]'>
            환영합니다!
            <br />
            사용자 유형을 선택해주세요.
          </span>

          <div className='flex gap-11 justify-center'>
            <Button
              color={selected === 'student' ? 'primary' : 'secondary'}
              size='wide'
              onClick={() => setSelected('student')}
              onMouseEnter={() => setHover('student')}
              onMouseLeave={() => selected === 'none' && setHover('none')}>
              학생
            </Button>
            <Button
              color={selected === 'admin' ? 'primary' : 'secondary'}
              size='wide'
              onClick={() => setSelected('admin')}
              onMouseEnter={() => setHover('admin')}
              onMouseLeave={() => selected === 'none' && setHover('none')}>
              관리자
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
