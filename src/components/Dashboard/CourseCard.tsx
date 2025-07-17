import {EllipsisIcon} from '../../assets/svg';
import type {Course} from './types';

interface Props extends Course {}

const CourseCard = (props: Props) => {
  return (
    <div className='min-h-36 rounded-3xl bg-gray border-0 flex-center my-5'>
      <section className='p-8 bg-white rounded-tl-3xl rounded-bl-3xl'>
        <p className='text-sm font-light text-light-black'>
          {`${props.courseYear}\\${props.courseSem}학기\\${props.classNum}분반`}
        </p>
        <h3 className='text-[22px]'>{props.courseName}</h3>
        <p className='text-base font-light text-secondary-black'>
          {props.courseDescription}
        </p>
      </section>
      <section className='relative'>
        <button className='absolute right-8'>
          <EllipsisIcon width={21.2} height={5} />
        </button>
        <div className='flex-center p-4'>
          <div className='flex-center flex-col whitespace-nowrap border-r border-[#7A768C] px-4'>
            <div>단원 수</div>
            <div>{`${props.moduleNum}개`}</div>
          </div>
          <div className='flex-center flex-col whitespace-nowrap px-4'>
            <div>문제 수</div>
            <div>{`${props.probNum}개`}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseCard;
