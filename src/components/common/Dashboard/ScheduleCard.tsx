import type {Assignment} from './types';
interface Props extends Assignment {
  remainingDays: number;
}

const ScheduleCard = (props: Props) => {
  return (
    <div className='flex items-start p-7 gap-6 border-0 bg-white w-[396px] mb-3 rounded-3xl shadow-card'>
      <div
        className={`text-white px-4 py-1 rounded-full whitespace-nowrap ${
          props.remainingDays === 1
            ? 'bg-radial-[50%_50%_at_50%_50%] from-[#7D63FF] from-38% to-[#AB9AFF] to-100% border-0'
            : 'bg-[#403D4D] border-1 border-solid border-[#5C5B7F]'
        } `}>
        {`${props.remainingDays}일 전`}
      </div>
      <div className='flex flex-col w-62'>
        <p className='text-lg'>{`${props.course} (${props.section})`}</p>
        <p className='text-base truncate font-light text-light-black'>
          {props.assignment}
        </p>
      </div>
    </div>
  );
};

export default ScheduleCard;
