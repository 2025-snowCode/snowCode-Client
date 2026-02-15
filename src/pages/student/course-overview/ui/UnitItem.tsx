import AssignmentList from './AssignmentList';
import Lock from '@/assets/svg/lock.svg?react';
import Badge from '@/shared/ui/Badge';
import {formatPeriod} from '@/shared/lib/course';
import type {Unit} from '@/entities/course/model/types';

interface UnitProps extends Unit {
  index: number;
}

type UnitHeaderProps = Omit<UnitProps, 'id' | 'assignmentCount' | 'assignments'>;

const UnitItem = ({index, ...unit}: UnitProps) => {
  const isOpen = unit.isOpen ?? true;

  return (
    <section>
      <UnitHeader
        index={index + 1}
        title={unit.title}
        isOpen={isOpen}
        releaseDate={unit.releaseDate}
        dueDate={unit.dueDate}
      />
      <AssignmentList isOpen={isOpen} assignments={unit.assignments} />
    </section>
  );
};

const UnitHeader = ({
  index,
  title,
  isOpen,
  releaseDate,
  dueDate,
}: UnitHeaderProps) => {
  return (
    <header className='bg-gray w-full p-4'>
      <div className='max-w-4xl mx-auto flex items-center justify-between'>
        <div className='min-w-0 flex items-center gap-3.5'>
          <Badge variant='index' kind='unit'>
            {index}
          </Badge>

          <div className='flex items-center gap-2.5'>
            <h3 className='truncate text-lg text-secondary-black font-medium'>
              {title}
            </h3>
            {!isOpen && <Lock className='shrink-0' />}
          </div>
        </div>

        <div className='shrink-0 ml-2 text-base text-light-black font-normal min-w-0 whitespace-nowrap'>
          <span>{formatPeriod(releaseDate, dueDate)}</span>
        </div>
      </div>
    </header>
  );
};

export default UnitItem;
