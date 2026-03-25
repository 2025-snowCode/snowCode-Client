import LoadingImg from '@/assets/images/snowCode_admin.svg?react';

const Loading = () => {
  return (
    <div className='inset-0 fixed flex-center flex-col gap'>
      <LoadingImg className='w-50 h-50 animate-bounce' />
      <span className='-mt-8 ml-3.5 text-base text-primary-black font-semibold animate-pulse'>
        로딩 중...
      </span>
    </div>
  );
};

export default Loading;
