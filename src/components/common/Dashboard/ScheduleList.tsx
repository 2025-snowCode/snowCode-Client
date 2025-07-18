import ScheduleCard from './ScheduleCard';
import logo from '../../../assets/images/snowCode_logo_mini.svg';
import mark from '../../../assets/images/snowCode_mark.svg';
import type {Schedule} from './types';

const schedules: Schedule[] = [
  {
    id: 1,
    remainingDays: 1,
    date: new Date('2025-05-29'),
    assignments: [
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
    ],
  },
  {
    id: 2,
    remainingDays: 2,
    date: new Date('2025-05-30'),
    assignments: [
      {
        id: 1,
        course: 'Python을 활용한 데이터 분석',
        section: '005',
        assignment: '날씨 데이터를 활용한 기온 변화 분석',
      },
      {
        id: 2,
        course: '데이터 구조와 알고리즘',
        section: '001',
        assignment: 'Linked List 구현 및 노드 삽입/삭제 실습',
      },
      {
        id: 3,
        course: '웹 개발 입문',
        section: '002',
        assignment: 'JavaScript로 간단한 계산기 만들기',
      },
    ],
  },
];

// date mm.dd 형식으로 변환
const changeDateFormat = (date: Date): string => {
  let m = (date.getMonth() + 1).toString();
  let d = date.getDate().toString();

  return `${m}.${d}`;
};

const ScheduleList = () => {
  return (
    <section>
      <span className='text-xl flex gap-2 ml-22'>
        <img src={logo} alt='snowCode-logo' />내 스케쥴
      </span>
      <div className='my-5'>
        {schedules.map((schedule) => (
          <div className='mb-10' key={schedule.id}>
            {schedule.assignments.map((assignment, index) =>
              index === 0 ? (
                <div className='flex items-start gap-6' key={assignment.id}>
                  <span className='text-secondary-black text-lg flex gap-1'>
                    <img src={mark} alt='shedule-mark' />
                    {changeDateFormat(schedule.date)}
                  </span>
                  <ScheduleCard
                    remainingDays={schedule.remainingDays}
                    {...assignment}
                  />
                </div>
              ) : (
                <div className='ml-22' key={assignment.id}>
                  <ScheduleCard
                    remainingDays={schedule.remainingDays}
                    {...assignment}
                  />
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
