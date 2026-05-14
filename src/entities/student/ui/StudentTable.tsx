import {Checkbox} from '@/shared/ui/checkbox/Checkbox';
import {ProgressIndicators} from '@/shared/ui/ProgressIndicators';
import {Link} from 'react-router-dom';
import type {Student} from '@/entities/student/model/types';

interface StudentTableProps {
  students: Student[];
  courseId: number;
  selectedIds: Set<number>;
  onSelectionChange: (newSelected: Set<number>) => void;
}

export const StudentTable = ({
  students,
  courseId,
  selectedIds,
  onSelectionChange,
}: StudentTableProps) => {
  const selectAll =
    students.length > 0 && selectedIds.size === students.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(new Set(students.map((s) => s.id)));
    } else {
      onSelectionChange(new Set());
    }
  };

  const handleSelectStudent = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    onSelectionChange(newSelected);
  };

  return (
    <table className='w-full'>
      <thead>
        <tr className='h-12.75 text-secondary-black font-medium text-base bg-gray'>
          <th className='w-12'>
            <Checkbox
              checked={selectAll}
              onChange={handleSelectAll}
              aria-label='전체 학생 선택'
            />
          </th>
          <th className='text-left pl-4'>학번</th>
          <th className='text-left pl-4'>이름</th>
          <th className='text-left pl-4'>점수</th>
          <th className='text-left pl-4'>진행 상황</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id} className='border-b border-stroke h-15'>
            <td className='text-center align-middle'>
              <Checkbox
                checked={selectedIds.has(student.id)}
                onChange={(checked) => handleSelectStudent(student.id, checked)}
                aria-label={`${student.name} 학생 선택`}
              />
            </td>
            <td className='pl-4 text-secondary-black align-middle'>
              {student.studentId}
            </td>
            <td className='pl-4 align-middle'>
              <Link
                to={`/admin/courses/${courseId}/students/${student.id}`}
                className='text-primary font-medium hover:underline'>
                {student.name}
              </Link>
            </td>
            <td className='pl-4 text-secondary-black align-middle'>
              {student.score}/{student.totalScore}
            </td>
            <td className='pl-4 align-middle'>
              <ProgressIndicators statuses={student.progress} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
