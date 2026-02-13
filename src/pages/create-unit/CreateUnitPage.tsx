import SurfaceCard from '@/components/common/SurfaceCard';
import UnitFormEditor from './ui/UnitFormEditor';
import UnitList from './ui/UnitList';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  allUnitsQueryOptions,
  unitQueryOptions,
} from '@/entities/unit/api/unitQueryOptions';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {createUnit} from '@/entities/unit/api/unitApi';
import type {TUnitFormSchema} from './model/types';

const CreateUnitPage = () => {
  const {id} = useParams(); // 강의 ID
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isEditing, setIsEditing] = useState(false);
  const {data: allUnits} = useQuery(allUnitsQueryOptions(Number(id)));
  const {data: unit} = useQuery(unitQueryOptions(selectedUnitId));
  const queryClient = useQueryClient();

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

  // 단원 생성 뮤테이션
  const {mutate: addUnit} = useMutation({
    mutationFn: ({courseId, unit}: {courseId: number; unit: TUnitFormSchema}) =>
      createUnit(courseId, unit),
    onSuccess: (data) => {
      // 단원 목록 갱신
      setSelectedUnitId(data.response.id);
      setIsEditing(true); // 새 단원 생성 후 편집 모드로 전환
      queryClient.invalidateQueries({
        queryKey: allUnitsQueryOptions(Number(id)).queryKey,
      });
      alert('새 단원이 성공적으로 생성되었습니다.');
    },
    onError: (error) => {
      console.error('단원 생성 실패', error);
      alert('단원 생성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 단원 생성 핸들러
  const onCreateUnit = (unit: TUnitFormSchema) => {
    addUnit({courseId: Number(id), unit});
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
          onCreateUnit={onCreateUnit}
        />
      </SurfaceCard>
    </div>
  );
};

export default CreateUnitPage;
