import ScheduleCard from './ScheduleCard';
import logo from '../../assets/images/snowCode_logo_mini.svg';
import mark from '../../assets/images/snowCode_mark.svg';
import type {Schedule} from './types';

const mockData: Schedule[] = [
  {
    id: 1,
    count: 2,
    date: '5.28',
    assignments: [
      {
        id: 1,
        class_no: '005',
        course_name: '소프트웨어의 이해',
        prob_name: '음수 구별하기',
      },
      {
        id: 2,
        class_no: '001',
        course_name: '데이터 구조와 알고리즘',
        prob_name: '스택 (Stack) 구현하기',
      },
    ],
  },
  {
    id: 2,
    count: 3,
    date: '5.29',
    assignments: [
      {
        id: 1,
        class_no: '005',
        course_name: 'Python을 활용한 데이터 분석',
        prob_name: '날씨 데이터를 활용한 기온 변화 분석',
      },
      {
        id: 2,
        class_no: '001',
        course_name: '데이터 구조와 알고리즘',
        prob_name: 'Linked List 구현 및 노드 삽입/삭제 실습',
      },
      {
        id: 3,
        class_no: '002',
        course_name: '웹 개발 입문',
        prob_name: 'JavaScript로 간단한 계산기 만들기',
      },
    ],
  },
  {
    id: 3,
    count: 5,
    date: '5.31',
    assignments: [
      {
        id: 1,
        class_no: '002',
        course_name: '웹 개발 입문',
        prob_name: 'JavaScript로 간단한 계산기 만들기',
      },
    ],
  },
];

const ScheduleList = () => {
  return (
    <section>
      <span className='text-xl flex gap-2 ml-22'>
        <img src={logo} alt='snowCode-logo' />내 스케쥴
      </span>
      <div className='my-5'>
        {mockData.map((schedule) => (
          <div className='mb-10' key={schedule.id}>
            {schedule.assignments.map((assignment, index) =>
              index === 0 ? (
                <div className='flex items-start gap-6' key={assignment.id}>
                  <span className='text-secondary-black text-lg flex gap-1'>
                    <img src={mark} alt='shedule-mark' />
                    {schedule.date}
                  </span>
                  <ScheduleCard count={schedule.count} {...assignment} />
                </div>
              ) : (
                <div className='ml-22' key={assignment.id}>
                  <ScheduleCard count={schedule.count} {...assignment} />
                </div>
              )
            )}{' '}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleList;
