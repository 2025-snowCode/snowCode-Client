import UnitLabel from './UnitLabel';
import lock from '../../../assets/images/lock.svg';

interface UnitHeaderProps {
  index: number;
  title: string;
  isOpen?: boolean;
  releaseDate: string;
  dueDate: string;
}

const UnitHeader = ({
  index,
  title,
  isOpen,
  releaseDate,
  dueDate,
}: UnitHeaderProps) => {
  return (
    <div className='h-[55px] bg-gray flex items-center px-55 whitespace-nowrap'>
      <div className='flex items-center w-70%'>
        <UnitLabel unitNo={index} />
        <span className='pl-[13.5px] pr-[10.5px] text-lg text-secondary-black font-medium'>
          {title}
        </span>
        {!isOpen && <img src={lock} alt='잠금' />}
      </div>
      <span className='w-10% text-base text-light-black font-normal ml-auto'>{`${releaseDate.replaceAll(
        '-',
        '.'
      )} ~ ${dueDate.replaceAll('-', '.')}`}</span>
    </div>
  );
};

export default UnitHeader;
