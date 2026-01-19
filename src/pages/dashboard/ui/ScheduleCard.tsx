import Badge from '@/components/common/Badge';
import type {ScheduleCardProps} from '../models/types';

const ScheduleCard = ({
  remainingDays,
  course,
  section,
  assignment,
}: ScheduleCardProps) => {
  return (
    <li className='bg-white w-92 flex items-start px-6 py-5 gap-5 rounded-3xl shadow-card'>
      {/* 남은 일수 배지 */}
      <div className='w-20 shrink-0 flex '>
        <Badge
          variant='schedule'
          schedule={remainingDays <= 1 ? 'upcoming' : 'later'}>
          {remainingDays}
        </Badge>
      </div>

      {/* 과제 정보 */}
      <div className='flex flex-col flex-1 min-w-0'>
        <h3 className='text-lg/normal font-medium'>{`${course} (${section})`}</h3>
        <p className='text-base/normal font-light text-light-black truncate'>
          {assignment}
        </p>
      </div>
    </li>
  );
};

export default ScheduleCard;
