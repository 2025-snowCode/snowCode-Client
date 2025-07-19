import {EllipsisIcon} from '../../../assets/svg';
import type {Course} from './types';

interface Props extends Course {}

const getSemesterNumber = (semester: string): string => {
  switch (semester) {
    case 'FIRST':
      return '1';
    case 'SUMMER':
      return '여름';
    case 'SECOND':
      return '2';
    case 'WINTER':
      return '겨울';
    default:
      return 'unknown';
  }
};

const CourseCard = (props: Props) => {
  props.semester;
  return (
    <div className='min-h-36 rounded-3xl bg-gray border-0 flex-center my-5 shadow-card'>
      <section className='p-8 bg-white rounded-tl-3xl rounded-bl-3xl'>
        <p className='text-sm font-light text-light-black'>
          {`${props.year}\\${getSemesterNumber(props.semester)}학기\\${
            props.section
          }분반`}
        </p>
        <h3 className='text-[22px]'>{props.title}</h3>
        <p className='text-base font-light text-secondary-black'>
          {props.description}
        </p>
      </section>
      <section className='relative'>
        <button className='absolute right-8'>
          <EllipsisIcon width={21.2} height={5} />
        </button>
        <div className='flex-center p-4'>
          <div className='flex-center flex-col whitespace-nowrap border-r border-[#7A768C] px-4'>
            <div>단원 수</div>
            <div>{`${props.unitCount}개`}</div>
          </div>
          <div className='flex-center flex-col whitespace-nowrap px-4'>
            <div>문제 수</div>
            <div>{`${props.assignmentCount}개`}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseCard;
