import SurfaceCard from '@/components/common/SurfaceCard';
import UnitFormEditor from './ui/UnitFormEditor';
import UnitList from './ui/UnitList';
import {allUnitsResponse, singleUnitResponse} from './mocks/response';
import {useQuery} from '@tanstack/react-query';
import {allUnitsQueryOptions} from '@/entities/unit/api/unitQueryOptions';
import {useParams} from 'react-router-dom';
import {useState} from 'react';

const CreateUnitPage = () => {
  const unitList = allUnitsResponse.response.units;
  const currentUnit = singleUnitResponse.response;
  const {id} = useParams();
  // const {currentUnitId, setCurrentUnitId} = useState<number | null>(null);
  const {data: allUnits} = useQuery(allUnitsQueryOptions(Number(id)));

  console.log('allUnits', allUnits);

  return (
    <div className='flex justify-center gap-4 p-6'>
      {/* 단원 목차 섹션 */}
      <SurfaceCard className='w-112.5 min-w-0' size='large'>
        <UnitList unitList={unitList} />
      </SurfaceCard>

      {/* 단원 폼 섹션 */}
      <SurfaceCard className='w-185 min-w-0' size='large'>
        <UnitFormEditor unit={currentUnit} />
      </SurfaceCard>
    </div>
  );
};

export default CreateUnitPage;
