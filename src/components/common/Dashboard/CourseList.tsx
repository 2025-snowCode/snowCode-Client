import logo from '../../../assets/images/snowCode_logo_mini.svg';
import CourseCard from './CourseCard';
import type {Course} from './types';

const courses: Course[] = [
  {
    id: 1,
    year: 2025,
    semester: 'FIRST',
    section: '005',
    title: '소프트웨어의 이해',
    description:
      'Python 언어를 기반으로 하여 프로그래밍에 대한 기본 원리를 학습한다.',
    unitCount: 12,
    assignmentCount: 36,
  },
  {
    id: 2,
    year: 2025,
    semester: 'FIRST',
    section: '001',
    title: '데이터 구조와 알고리즘',
    description:
      '자료구조의 기본 원리와 다양한 알고리즘의 동작 원리를 학습하고 구현한다.',
    unitCount: 18,
    assignmentCount: 20,
  },
];

const CourseList = () => {
  return (
    <section className='w-148'>
      <div className='flex-center justify-between'>
        <span className='flex text-xl gap-2'>
          <img src={logo} alt='snowCode-logo' />
          강의 목록
        </span>
        <div className='flex gap-4 text-base'>
          <button className='bg-white border-0 px-3 py-0.5 rounded-[10px]'>
            + 추가
          </button>
          <button>더보기</button>
        </div>
      </div>
      <div>
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
