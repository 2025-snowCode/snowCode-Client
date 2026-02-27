import {UnitList} from './ui/UnitList';
import {UnitForm} from './ui/UnitForm';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {unitQueries} from '@/entities/unit/api/unitQueries';
import {useParams} from 'react-router-dom';
import {useState} from 'react';
import type {Mode} from './model/types';
import {unitMutations} from '@/entities/unit/api/unitMutations';
import type {TUnitFormSchema} from '@/entities/unit/model/types';
import {EmptyState} from '@/shared/ui/EmptyState';
import SurfaceCard from '@/shared/ui/SurfaceCard';
import useUnitStore from '@/entities/unit/model/useUnitStore';

const UnitEditorPage = () => {
  const {id} = useParams(); // 강의 ID
  const courseId = Number(id);

  const {
    resetStore,
    title: storedTitle,
    assignments: storedAssignments,
  } = useUnitStore();
  const {data} = useQuery(unitQueries.getUnitList(courseId));
  const initialMode =
    data === undefined ? null : data.unitCount === 0 ? 'creating' : 'editing';

  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  const hasOngoingCreation = storedTitle !== '' || storedAssignments.length > 0;
  const currentMode: Mode | null =
    activeMode ?? (hasOngoingCreation ? 'creating' : initialMode);
  const currentUnitId =
    currentMode === 'creating'
      ? null
      : (selectedUnitId ?? data?.firstUnitId ?? null);

  // 현재 단원 인덱스 계산
  const currentIndex = (() => {
    if (currentMode === 'creating') {
      return (data?.unitCount ?? 0) + 1; // 항상 마지막 + 1
    }
    const index = data?.unitList?.findIndex((u) => u.id === currentUnitId);
    return index !== undefined && index >= 0 ? index + 1 : 1;
  })();

  const {data: unitDetail} = useQuery(
    unitQueries.getUnitDetails(currentUnitId)
  );

  const queryClient = useQueryClient();
  const invalidateUnitList = () => {
    queryClient.invalidateQueries({
      queryKey: unitQueries.getUnitList(courseId).queryKey,
    });
  };

  // 단원 생성
  const {mutate: addUnit} = useMutation({
    ...unitMutations.createUnit,
    onSuccess: (data) => {
      // 단원 목록 갱신
      invalidateUnitList();
      setSelectedUnitId(data.response.id);
      setActiveMode('editing'); // 생성 후 편집 모드로 전환
      resetStore(); // 단원 폼 초기화
      alert('새 단원이 성공적으로 생성되었습니다.');
    },
    onError: (error) => {
      console.error('단원 생성 실패', error);
      alert('단원 생성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 단원 업데이트
  const {mutate: updateUnit} = useMutation({
    ...unitMutations.updateUnit,
    onSuccess: () => {
      invalidateUnitList();
      alert('단원이 성공적으로 업데이트되었습니다.');
    },
    onError: (error) => {
      console.error('단원 업데이트 실패', error);
      alert('단원 업데이트에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 단원 삭제
  const {mutate: deleteUnit} = useMutation({
    ...unitMutations.deleteUnit,
    onSuccess: () => {
      invalidateUnitList();
      setSelectedUnitId(null); // 선택된 단원 초기화
      setActiveMode('creating');
      alert('단원이 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('단원 삭제 실패', error);
      alert('단원 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 단원 선택 핸들러
  const onUnitClick = (id: number) => {
    setSelectedUnitId(id);
    setActiveMode('editing'); // 편집 모드로 전환
  };

  // 단원 추가 핸들러
  const onAddNewUnit = () => {
    setSelectedUnitId(null);
    setActiveMode('creating'); // 생성 모드로 전환
  };

  // 단원 생성 핸들러
  const onCreateUnit = (unitForm: TUnitFormSchema) => {
    addUnit({courseId, unitForm});
  };

  // 단원 업데이트 핸들러
  const onUpdateUnit = (unitId: number, unit: TUnitFormSchema) => {
    updateUnit({unitId, unit});
  };

  // 단원 삭제 핸들러
  const onDeleteUnit = (unitId: number) => {
    if (window.confirm('정말로 이 단원을 삭제하시겠습니까?')) {
      deleteUnit(unitId);
    }
  };

  // 강의 ID가 없는 경우 빈 상태 표시
  if (!id) {
    return <EmptyState>선택한 강의가 없습니다.</EmptyState>;
  }

  return (
    <div className='flex justify-center gap-4 p-6'>
      {/* 단원 목차 섹션 */}
      <SurfaceCard className='w-112.5 min-w-0' size='large'>
        <UnitList
          unitList={data?.unitList}
          onUnitClick={onUnitClick}
          selectedUnitId={currentUnitId}
          onAddNewUnit={onAddNewUnit}
        />
      </SurfaceCard>

      {/* 단원 폼 섹션 */}
      <SurfaceCard className='w-185 min-w-0' size='large'>
        <UnitForm
          unit={unitDetail}
          unitIndex={currentIndex}
          mode={currentMode}
          onCreateUnit={onCreateUnit}
          onUpdateUnit={onUpdateUnit}
          onDeleteUnit={onDeleteUnit}
        />
      </SurfaceCard>
    </div>
  );
};

export default UnitEditorPage;
