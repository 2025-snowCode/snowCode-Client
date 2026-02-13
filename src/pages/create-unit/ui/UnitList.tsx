import Button from '@/components/common/Button';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import Badge from '@/components/common/Badge';
import ArrowrightIcon from '@/assets/svg/arrowrightIcon.svg?react';
import type {AllUnitsResponse} from '@/models/course';

interface UnitListProps {
  unitList: AllUnitsResponse['response']['units'];
  onUnitClick: (id: number) => void;
  selectedUnitId?: number | null;
  onChangeIndex: (index: number) => void;
  onAddNewUnit?: () => void;
}

const UnitList = ({
  unitList,
  onUnitClick,
  selectedUnitId,
  onChangeIndex,
  onAddNewUnit,
}: UnitListProps) => {
  const handleSelectUnit = (id: number) => {
    onUnitClick(id);

    // 선택된 단원의 인덱스 찾기
    const index = unitList.findIndex((unit) => unit.id === id);
    onChangeIndex(index + 1);
  };

  return (
    <div className='flex flex-col h-full'>
      {/* 단원 리스트 헤더 */}
      <h2 className='px-12 mt-8 mb-7.5 text-2xl/9 font-semibold'>단원 보기</h2>

      {/* 단원 목록 */}
      <ul className='border-y border-stroke divide-y divide-stroke overflow-y-auto'>
        {/* 단원 아이템 */}
        {unitList.map(({id, title, assignmentCount}) => (
          <li
            onClick={() => handleSelectUnit(id)}
            key={id}
            className={`flex flex-col py-5 px-12 gap-2.5 cursor-pointer ${selectedUnitId === id ? 'bg-background' : ''}`}>
            {/* 단원 인덱스 배지 */}
            <div>
              <Badge variant='index' kind='problem'>
                {assignmentCount}
              </Badge>
            </div>

            {/* 단원 제목 및 화살표 아이콘 */}
            <div className='flex justify-between items-center'>
              <h3 className='text-lg/normal font-medium'>{title}</h3>
              {id === selectedUnitId && <ArrowrightIcon className='w-4.5' />}
            </div>
          </li>
        ))}
      </ul>

      {/* 단원 추가 버튼 */}
      <div className='px-12 mt-4.5'>
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

export default UnitList;
