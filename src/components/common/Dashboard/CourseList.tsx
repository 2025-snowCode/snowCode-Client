import logo from '@/assets/images/snowCode_logo_mini.svg';
import CourseCard from './CourseCard';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import type {Course, UserType} from './types';
import Button from '../Button';

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

interface CourseListProps {
  userType: UserType;
}

// const onClickAdd = () => {

// }

const CourseList = ({userType}: CourseListProps) => {
  return (
    <section className='w-148'>
      <div className='flex-center justify-between'>
        <span className='flex text-xl gap-2'>
          <img src={logo} alt='snowCode-logo' />
          강의 목록
        </span>
        {userType === 'admin' && (
          <Button
            color='ghostWhite'
            size='compact'
            className='hover:opacity-70'>
            <AddIcon width={12} height={12} />
            추가
          </Button>
        )}
      </div>
      <div>
        {courses.map((course) => (
          <CourseCard key={course.id} userType={userType} {...course} />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
