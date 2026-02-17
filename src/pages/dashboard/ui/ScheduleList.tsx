import ScheduleCard from './ScheduleCard';
import EventMarkerIcon from '@/assets/svg/eventMarkerIcon.svg?react';
import {formatDateMonthDay} from '@/shared/lib/course';
import type {Schedule} from '@/entities/course/model/types';

interface ScheduleListProps {
  scheduleList: Schedule[];
}

// 스케줄 목록 컴포넌트
const ScheduleList = ({scheduleList}: ScheduleListProps) => {
  return (
    <ul className='flex flex-col gap-6'>
      {/* 날짜별 그룹 간의 간격 */}
      {scheduleList.map((schedule, index) => (
        <li className='flex items-start justify-start gap-5' key={index}>
          {/* 마감일 */}
          <div className='w-20 shrink-0'>
            <DeadLine date={schedule.date} />
          </div>

          {/* 스케쥴 카드 목록 */}
          <ul className='flex flex-col gap-3 w-full'>
            {schedule.assignments.map((assignment, idx) => (
              <ScheduleCard
                key={assignment.assignment + idx}
                remainingDays={schedule.remainingDays}
                {...assignment}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

// 마감일 컴포넌트
const DeadLine = ({date}: {date: string}) => {
  return (
    <span className='text-secondary-black text-lg flex items-center gap-1'>
      <EventMarkerIcon className='w-5 h-5 shrink-0' />
      <span className='font-medium'>{formatDateMonthDay(date)}</span>
    </span>
  );
};

export default ScheduleList;
