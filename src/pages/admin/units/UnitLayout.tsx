import SurfaceCard from '@/shared/ui/SurfaceCard';
import {UnitList} from './ui/UnitList';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {useSuspenseQuery} from '@tanstack/react-query';
import {unitQueries} from '@/entities/unit/api/unitQueries';
import type {TUnitLayoutContext} from './model/types';

const UnitLayout = () => {
  const navigate = useNavigate();
  const {courseId} = useParams();
  const {data: units} = useSuspenseQuery(
    unitQueries.getUnitList(Number(courseId))
  );

  const onAddNewUnit = () => navigate('create');
  const onClickUnit = (unitId: number) => navigate(`edit/${unitId}`);

  return (
    <div className='flex justify-center gap-4 p-6'>
      {/* 단원 목차 섹션 */}
      <SurfaceCard className='w-112.5 min-w-0' size='large'>
        <UnitList
          unitList={units?.unitList}
          onAddNewUnit={onAddNewUnit}
          onClickUnit={onClickUnit}
        />
      </SurfaceCard>

      {/* 단원 폼 섹션 */}
      <SurfaceCard className='w-185 min-w-0' size='large'>
        <Outlet
          context={
            {
              unitList: units?.unitList ?? [],
              unitCount: units?.unitCount ?? 0,
            } satisfies TUnitLayoutContext
          }
        />
      </SurfaceCard>
    </div>
  );
};

export default UnitLayout;
