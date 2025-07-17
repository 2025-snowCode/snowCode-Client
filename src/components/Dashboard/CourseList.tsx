import logo from '../../assets/images/snowCode_logo_mini.svg';
import CourseCard from './CourseCard';
import type {Course} from './types';

const mockData: Course[] = [
  {
    id: 1,
    courseName: '소프트웨어의 이해',
    courseYear: 2025,
    courseSem: '1',
    classNum: '005',
    courseDescription:
      'Python 언어를 기반으로 하여 프로그래밍에 대한 기본 원리를 학습한다.',
    moduleNum: 12,
    probNum: 36,
  },
  {
    id: 2,
    courseName: '데이터 구조와 알고리즘',
    courseYear: 2025,
    courseSem: '1',
    classNum: '001',
    courseDescription:
      '자료구조의 기본 원리와 다양한 알고리즘의 동작 원리를 학습하고 구현한다.',
    moduleNum: 18,
    probNum: 20,
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
        {mockData.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
