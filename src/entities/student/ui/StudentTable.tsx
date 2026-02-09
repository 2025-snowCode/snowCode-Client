import {Checkbox} from '@/components/common/Checkbox';
import {ProgressIndicators} from '@/components/common/ProgressIndicators';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import type {Student} from '@/entities/student/model/types';

interface StudentTableProps {
  students: Student[];
}

export const StudentTable = ({students}: StudentTableProps) => {
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(
    new Set()
  );
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    setSelectedStudents(new Set());
    setSelectAll(false);
  }, [students]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedStudents(new Set(students.map((s) => s.id)));
    } else {
      setSelectedStudents(new Set());
    }
  };

  const handleSelectStudent = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedStudents);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedStudents(newSelected);
    setSelectAll(newSelected.size === students.length);
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
                checked={selectedStudents.has(student.id)}
                onChange={(checked) => handleSelectStudent(student.id, checked)}
                aria-label={`${student.name} 학생 선택`}
              />
            </td>
            <td className='pl-4 text-secondary-black align-middle'>
              {student.studentId}
            </td>
            <td className='pl-4 align-middle'>
              <Link
                to={`/admin/student/profile/:studentId`}
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
