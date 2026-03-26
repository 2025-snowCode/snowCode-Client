import ArrowrightIcon from '@/assets/svg/arrowrightIcon.svg?react';
import Badge from '@/shared/ui/badge/Badge';
import Button from '@/shared/ui/button/Button';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import type {TUnit} from '@/entities/unit/model/schemas';
import {useParams} from 'react-router-dom';

interface UnitListProps {
  unitList: Pick<TUnit, 'id' | 'title' | 'assignmentCount'>[] | undefined;
  onAddNewUnit: () => void;
  onClickUnit: (unitId: number) => void;
}

export const UnitList = ({
  unitList,
  onAddNewUnit,
  onClickUnit,
}: UnitListProps) => {
  const {unitId} = useParams();

  return (
    <div className='flex flex-col h-full custom-scrollbar'>
      {/* 단원 리스트 헤더 */}
      <h2 className='px-12 mt-8 mb-7.5 text-2xl/9 font-semibold'>단원 보기</h2>

      {/* 단원 목록 */}
      <ul className='border-y border-stroke divide-y divide-stroke overflow-y-auto'>
        {/* 단원 아이템 */}
        {unitList?.map(({id, title, assignmentCount}) => (
          <li
            onClick={() => onClickUnit(id)}
            key={id}
            className={`flex flex-col py-5 px-12 gap-2.5 cursor-pointer ${Number(unitId) === id ? 'bg-background' : ''}`}>
            {/* 과제 수 배지 */}
            <div>
              <Badge variant='index' kind='problem'>
                {assignmentCount}
              </Badge>
            </div>

            {/* 단원 제목 및 화살표 아이콘 */}
            <div className='flex justify-between items-center'>
              <h3 className='text-lg/normal font-medium'>{title}</h3>
              {id === Number(unitId) && <ArrowrightIcon className='w-4.5' />}
            </div>
          </li>
        ))}
      </ul>

      {/* 단원 추가 버튼 */}
      <div className='px-12 my-4.5'>
        <Button
          onClick={onAddNewUnit}
          color='primary'
          size='compact'
          content='mixed'>
          <AddIcon className='w-3 h-3 stroke-white' />
          단원 추가
        </Button>
      </div>
    </div>
  );
};
