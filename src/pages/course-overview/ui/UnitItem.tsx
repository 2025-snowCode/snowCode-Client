import AssignmentList from './AssignmentList';
import type {Unit} from '@/models/course';
import Lock from '@/assets/svg/lock.svg?react';
import Badge from '@/components/common/Badge';
import {formatDate} from '@/utils/course';

interface UnitProps extends Unit {
  index: number;
}

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

// 단원 헤더 컴포넌트
type UnitHeaderProps = Omit<
  UnitProps,
  'id' | 'assignmentCount' | 'assignments'
>;

const UnitHeader = ({
  index,
  title,
  isOpen,
  releaseDate,
  dueDate,
}: UnitHeaderProps) => {
  const deadline = `${formatDate(releaseDate)} ~ ${formatDate(dueDate)}`;

  return (
    <header className='bg-gray w-full p-4'>
      <div className='max-w-4xl mx-auto flex items-center justify-between'>
        {/* 좌측: 인덱스, 제목, 잠금 아이콘 */}
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

        {/* 우측: 데드라인 */}
        <div className='shrink-0 text-base text-light-black font-normal min-w-0 whitespace-nowrap'>
          <time dateTime={releaseDate}>{deadline}</time>
        </div>
      </div>
    </header>
  );
};

export default UnitItem;
