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
    <div className='h-[55px] bg-gray flex items-center justify-between px-55 whitespace-nowrap'>
      <UnitLabel unitNo={index} />
      <span className='pl-[13.5px] text-lg text-secondary-black font-medium'>
        {title}
      </span>
      {!isOpen && <img src={lock} alt='잠금' />}
      <span className='text-base text-light-black font-normal'>{`${releaseDate.replaceAll(
        '-',
        '.'
      )} ~ ${dueDate.replaceAll('-', '.')}`}</span>
    </div>
  );
};

export default UnitHeader;
