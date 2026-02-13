import SurfaceCard from '@/components/common/SurfaceCard';
import UnitFormEditor from './ui/UnitFormEditor';
import UnitList from './ui/UnitList';
import {useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {
  allUnitsQueryOptions,
  unitQueryOptions,
} from '@/entities/unit/api/unitQueryOptions';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

const CreateUnitPage = () => {
  const {id} = useParams();
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1); //
  const {data: allUnits} = useSuspenseQuery(allUnitsQueryOptions(Number(id)));
  const {data: unit} = useQuery(unitQueryOptions(selectedUnitId));
  const [isEditing, setIsEditing] = useState(false);

  // 단원 목록에서 선택된 단원이 없을 때, 첫 번째 단원을 선택하도록 설정
  useEffect(() => {
    if (allUnits && allUnits.response.count !== 0 && selectedUnitId === null) {
      setSelectedUnitId(allUnits.response.units[0].id);
      setIsEditing(true); // 첫 번째 단원이 선택되면 편집 모드로 전환
    }
  }, [allUnits, selectedUnitId]);

  const onUnitClick = (id: number) => {
    setSelectedUnitId(id);
    setIsEditing(true); // 단원이 선택되면 편집 모드로 전환
  };

  const onAddNewUnit = () => {
    setSelectedUnitId(-1);
    setCurrentIndex(allUnits ? allUnits.response.count + 1 : 1); // 새 단원의 인덱스 설정
    setIsEditing(false); // 새 단원 추가 시 편집 모드 해제
  };

  return (
    <div className='flex justify-center gap-4 p-6'>
      {/* 단원 목차 섹션 */}
      <SurfaceCard className='w-112.5 min-w-0' size='large'>
        <UnitList
          unitList={allUnits?.response.units}
          onUnitClick={onUnitClick}
          onChangeIndex={(index) => setCurrentIndex(index)}
          selectedUnitId={selectedUnitId}
          onAddNewUnit={onAddNewUnit}
        />
      </SurfaceCard>

      {/* 단원 폼 섹션 */}
      <SurfaceCard className='w-185 min-w-0' size='large'>
        <UnitFormEditor
          unit={unit?.response}
          unitIndex={currentIndex}
          isEditing={isEditing}
        />
      </SurfaceCard>
    </div>
  );
};

export default CreateUnitPage;
