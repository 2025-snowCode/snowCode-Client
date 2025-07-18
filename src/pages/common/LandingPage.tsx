import snowCodeEntry from '/src/assets/images/snowCode_entry.svg';
import googleLogo from '/src/assets/images/google_logo.svg';
import ActionButton from '../../components/common/ActionButton';

export default function LandingPage() {
  return (
    <div className='flex flex-col justify-center items-center min-h-[calc(100vh-120px)] text-center'>
      <img src={snowCodeEntry} alt='로고' className='w-[433px] h-[433px]' />

      <div className='flex flex-col gap-[60px] -mt-12'>
        <div className='flex flex-col gap-7'>
          <span className='text-black-primary text-4xl font-semibold leading-[150%]'>
            환영합니다!
            <br />
            사용자 유형을 선택해주세요.
          </span>

          <div className='flex gap-11 justify-center'>
            <ActionButton label='학생' />
            <ActionButton label='관리자' />
          </div>
        </div>

        <button
          className='flex gap-2 justify-center text-black-primary text-lg font-normal leading-[150%] underline decoration-solid'
          aria-label='구글 이메일 로그인'>
          <img src={googleLogo} alt='로고' className='w-[26px] h-[26px]' />
          구글 이메일으로 로그인
        </button>
      </div>
    </div>
  );
}
