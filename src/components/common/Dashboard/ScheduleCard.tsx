import Badge from '../Badge';
import type {Assignment} from './types';
interface ScheduleCardProps extends Assignment {
  remainingDays: number;
}

const ScheduleCard = ({
  remainingDays,
  course,
  section,
  assignment,
}: ScheduleCardProps) => {
  return (
    <div className='flex items-start p-7 gap-6 border-0 bg-white w-[396px] mb-3 rounded-3xl shadow-card'>
      <Badge
        variant='schedule'
        schedule={remainingDays === 1 ? 'upcoming' : 'later'}>
        {remainingDays}
      </Badge>
      <div className='flex flex-col w-62'>
        <p className='text-lg'>{`${course} (${section})`}</p>
        <p className='text-base truncate font-light text-light-black'>
          {assignment}
        </p>
      </div>
    </div>
  );
};

export default ScheduleCard;
