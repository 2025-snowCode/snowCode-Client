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
  const {data: allUnits} = useSuspenseQuery(allUnitsQueryOptions(Number(id)));
  const {data: unit} = useQuery(unitQueryOptions(selectedUnitId));

  useEffect(() => {
    if (allUnits && allUnits.response.count !== 0 && selectedUnitId === null) {
      setSelectedUnitId(allUnits.response.units[0].id);
    }
  }, [allUnits, selectedUnitId, setSelectedUnitId]);

  return (
    <div className='flex justify-center gap-4 p-6'>
      {/* 단원 목차 섹션 */}
      <SurfaceCard className='w-112.5 min-w-0' size='large'>
        <UnitList
          unitList={allUnits?.response.units}
          onUnitClick={(id) => setSelectedUnitId(id)}
          selectedUnitId={selectedUnitId}
        />
      </SurfaceCard>

      {/* 단원 폼 섹션 */}
      <SurfaceCard className='w-185 min-w-0' size='large'>
        <UnitFormEditor unit={unit?.response} />
      </SurfaceCard>
    </div>
  );
};

export default CreateUnitPage;
