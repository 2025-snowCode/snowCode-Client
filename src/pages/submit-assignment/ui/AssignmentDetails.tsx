import {useNavigate, useParams} from 'react-router-dom';
import ArrowleftIcon from '@/assets/svg/arrowleftIcon.svg?react';
import type {TAssignmentDetails} from '@/entities/assignment/model/schemas';
import IndexCircle from './circle/IndexCircle';

interface AssignmentDetailsProps extends TAssignmentDetails {
  index?: number;
}
const AssignmentDetails = ({
  index,
  title,
  description,
  testcases,
}: AssignmentDetailsProps) => {
  const navigate = useNavigate();
  const {courseId} = useParams();

  return (
    <section className='h-full py-6.5 pl-15.5 pr-8.5 font-medium text-primary-black overflow-y-auto'>
      {/* 과제 제목 및 설명 */}
      <div className='relative flex items-center'>
        <button
          className='cursor-pointer absolute -left-9.5'
          onClick={() => navigate(`/admin/courses/${courseId}`)}>
          <ArrowleftIcon className='w-4.5 h-4.5' />
        </button>

        <h2 className='relative flex-center gap-3'>
          <IndexCircle
            index={index || 0}
            color='primary'
            className='w-6.5 h-6.5'
          />
          <span className='text-xl/9'>{title}</span>
        </h2>
      </div>
      <p className='mt-4 text-lg/7.5'>{description}</p>

      {/* 입, 출력 예제 */}
      <div className='mt-8'>
        <h3 className='bg-[#EDE9FF] rounded-t-[10px] px-7 py-3 text-base/[27px]'>
          입/출력 예제
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
