import AssignmentList from './AssignmentList';
import type {UnitInfo} from './dummy/types';
import UnitHeader from './UnitHeader';

interface UnitProps extends UnitInfo {
  index: number;
}
const Unit = (unit: UnitProps) => {
  const openStatus = unit.isOpen === undefined ? true : unit.isOpen;
  return (
    <div>
      <div key={unit.id}>
        <UnitHeader
          index={unit.index + 1}
          title={unit.title}
          isOpen={openStatus}
          releaseDate={unit.releaseDate}
          dueDate={unit.dueDate}
        />
        <AssignmentList isOpen={openStatus} assignments={unit.assignments} />
      </div>
    </div>
  );
};

export default Unit;
