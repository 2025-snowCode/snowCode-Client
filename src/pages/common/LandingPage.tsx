import {useState} from 'react';
import snowCodeEntry from '/src/assets/images/snowCode_entry.svg';
import snowCodeStudent from '/src/assets/images/snowCode_student.svg';
import snowCodeAdmin from '/src/assets/images/snowCode_admin.svg';
import googleLogo from '/src/assets/images/google_logo.svg';
import ActionButton from '../../components/common/ActionButton';

type HoverState = 'none' | 'student' | 'admin';

export default function LandingPage() {
  const [hover, setHover] = useState<HoverState>('none');
  const [selected, setSelected] = useState<'none' | 'student' | 'admin'>(
    'none'
  );

  const imgSrc =
    hover === 'student'
      ? snowCodeStudent
      : hover === 'admin'
      ? snowCodeAdmin
      : snowCodeEntry;

  return (
    <div className='flex flex-col justify-center items-center min-h-[calc(100vh-120px)] text-center'>
      <div
        className={`relative w-[433px] ${
          imgSrc === snowCodeStudent ? 'h-[439px]' : 'h-[433px]'
        }`}>
        <img
          src={imgSrc}
          alt='로고'
          className='w-full h-full transition-all duration-300'
        />
      </div>

      <div className='flex flex-col gap-[60px] -mt-12'>
        <div className='flex flex-col gap-7'>
          <span className='text-black-primary text-4xl font-semibold leading-[150%]'>
            환영합니다!
            <br />
            사용자 유형을 선택해주세요.
          </span>

          <div className='flex gap-11 justify-center'>
            <ActionButton
              label='학생'
              onClick={() => setSelected('student')}
              onMouseEnter={() => setHover('student')}
              onMouseLeave={() => selected === 'none' && setHover('none')}
              selected={selected === 'student'}
            />
            <ActionButton
              label='관리자'
              onClick={() => setSelected('admin')}
              onMouseEnter={() => setHover('admin')}
              onMouseLeave={() => selected === 'none' && setHover('none')}
              selected={selected === 'admin'}
            />
          </div>
        </div>

        <button
          className='flex gap-2 justify-center text-black-primary text-lg font-normal leading-[150%] underline decoration-solid'
          aria-label='구글 이메일 로그인'>
          <img src={googleLogo} alt='로고' className='w-[26px] h-[26px]' />
          구글 이메일로 로그인
        </button>
      </div>
    </div>
  );
}
