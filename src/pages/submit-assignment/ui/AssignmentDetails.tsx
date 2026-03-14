import {useNavigate} from 'react-router-dom';
import ArrowleftIcon from '@/assets/svg/arrowleftIcon.svg?react';
import {mockAssignmentDetail} from '../mock';

const AssignmentDetails = () => {
  const navigate = useNavigate();
  const {title, description, testcases} = mockAssignmentDetail.response;

  return (
    <section className='py-10.5 pl-19.5 pr-10.5 font-medium text-primary-black'>
      {/* 과제 제목 및 설명 */}
      <div className='relative flex items-center'>
        <ArrowleftIcon
          onClick={() => navigate(-1)}
          className='absolute w-4.5 h-4.5 cursor-pointer -left-9.5'
        />
        {/* TODO: 인데스 배지 추가 */}
        <h2 className='relative text-2xl/9'>1. {title}</h2>
      </div>
      <p className='mt-7.5 text-[20px]/7.5'>{description}</p>

      {/* 입, 출력 예제 */}
      <div className='mt-12.5'>
        <h3 className='bg-[#EDE9FF] rounded-t-[10px] px-7 py-4 text-lg/[27px]'>
          입력 예제
        </h3>
        <ul className='bg-gray rounded-b-[10px] divide-y divide-purple-stroke'>
          {testcases.map(({id, testcase, answer}, idx) => (
            <li key={id} className='text-base/6 px-7 pt-5 pb-9.5'>
              <span className='text-secondary-black'>{`예제 ${idx + 1}`}</span>
              <dl className='text-light-black'>
                <dt className='mt-4'>입력</dt>
                <dd className='flex items-center w-full min-h-11.5 px-3 mt-1.5 bg-white border border-purple-stroke rounded-[10px]'>
                  <pre>{testcase}</pre>
                </dd>
                <dt className='mt-4'>출력</dt>
                <dd className='flex items-center w-full min-h-11.5 px-3 mt-1.5 bg-white border border-purple-stroke rounded-[10px]'>
                  <pre>{answer}</pre>
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AssignmentDetails;
