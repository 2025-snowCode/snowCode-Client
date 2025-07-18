import type {Assignment} from './types';
interface Props extends Assignment {
  remainingDays: number;
}

const ScheduleCard = (props: Props) => {
  return (
    <div className='flex items-start p-7 gap-6 border-0 bg-white w-[396px] mb-5 rounded-3xl'>
      <div className='border-0 text-white bg-radial-[at_38%_100%] from-[#7D63FF] to-[#AB9AFF] px-4 py-1 rounded-full whitespace-nowrap'>
        {`${props.remainingDays}일 전`}
      </div>
      <div className='flex flex-col'>
        <p className='text-lg'>{`${props.course} (${props.section})`}</p>
        <p className='text-base truncate font-light text-light-black'>
          {props.assignment}
        </p>
      </div>
    </div>
  );
};

export default ScheduleCard;
