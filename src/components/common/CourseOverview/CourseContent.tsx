import type {UnitInfo} from './dummy/types';
import Unit from './Unit';

interface CourseContentProps {
  units: UnitInfo[];
}

const CourseContent = ({units}: CourseContentProps) => {
  return (
    <div className='w-full bg-white flex-1 rounded-b-[30px]'>
      {units.map((unit, index) => (
        <Unit key={unit.id} index={index} {...unit} />
      ))}
    </div>
  );
};

export default CourseContent;
