import SurfaceCard from '@/components/common/SurfaceCard';
import UnitFormEditor from './ui/UnitFormEditor';
import UnitList from './ui/UnitList';
import {allUnitsResponse, singleUnitResponse} from './mocks/response';

const CreateUnitPage = () => {
  const unitList = allUnitsResponse.response.units;
  const currentUnit = singleUnitResponse.response;

  return (
    <div className='flex justify-center gap-4 p-6'>
      {/* 단원 리스트 섹션 */}
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
