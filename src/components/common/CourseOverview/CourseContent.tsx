import AssignmentList from './AssignmentList';
import type {UnitInfo} from './dummy/types';
import UnitHeader from './UnitHeader';

interface CourseContentProps {
  units: UnitInfo[];
}

const CourseContent = ({units}: CourseContentProps) => {
  return (
    <div className='w-full bg-white flex-1 rounded-b-[30px]'>
      {units.map((unit, index) => {
        return (
          <div key={unit.id}>
            <UnitHeader
              index={index + 1}
              title={unit.title}
              isOpen={unit.isOpen}
              releaseDate={unit.releaseDate}
              dueDate={unit.dueDate}
            />
            <AssignmentList
              isOpen={unit.isOpen}
              assignments={unit.assignments}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CourseContent;
