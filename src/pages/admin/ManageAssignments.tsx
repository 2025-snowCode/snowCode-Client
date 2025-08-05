import AssignmentCard from '../../components/admin/assignments/AssignmentCard';
import CourseSelector from '../../components/admin/assignments/CourseSelector';
import type {Assignment} from '../../components/common/Dashboard/types';
import {AddIcon} from '../../assets/svg';
// import AddButton from '../../components/admin/AddButton';
import Button from '../../components/common/Button';

const assignments: Assignment[] = [
  {
    id: 1,
    course: '소프트웨어의 이해',
    section: '005',
    assignment: '음수 구별하기',
  },
  {
    id: 2,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
  {
    id: 3,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
  {
    id: 4,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
  {
    id: 5,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
  {
    id: 6,
    course: '데이터 구조와 알고리즘',
    section: '001',
    assignment: '스택 (Stack) 구현하기',
  },
];

const ManageAssignments = () => {
  return (
    <div className='w-[900px] h-[760px] bg-white rounded-[30px]'>
      <div className='flex flex-col h-1/4 px-14 justify-center border-b-1 border-stroke'>
        <h3 className='text-2xl font-semibold'>문제 관리</h3>
        <CourseSelector />
      </div>
      <div className='px-14'>
        <p className='mb-3 mt-10 font-medium text-lg'>
          {assignments.length}문제
        </p>
        <div className='flex flex-col'>
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} {...assignment} />
          ))}
        </div>
        <Button
          theme='secondaryPurpleStroke'
          text='문제 추가'
          icon={<AddIcon width={12} height={12} />}
        />
      </div>
    </div>
  );
};

export default ManageAssignments;
