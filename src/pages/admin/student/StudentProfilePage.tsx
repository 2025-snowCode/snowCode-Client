import {useParams} from 'react-router-dom';
import SurfaceCard from '@/components/common/SurfaceCard';
import {StudentProfile} from '@/entities/student/ui/StudentProfile';
import {AssignmentProgressCard} from '@/entities/student/ui/AssignmentProgressCard';
import mockCourseStudents from '@/entities/student/model/mock';

export default function StudentProfilePage() {
  const {studentId} = useParams<{studentId: string}>();
  const student = mockCourseStudents.response.students.find(
    (s) => s.studentId === studentId
  );

  if (!student) {
    return <p>학생 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className='relative left-1/2 -translate-x-1/2 w-fit flex items-center gap-6'>
      <StudentProfile name={student.name} studentId={student.studentId} />
      <SurfaceCard size='medium' className='w-[737px] min-w-0 shrink-0'>
        <AssignmentProgressCard student={student} />
      </SurfaceCard>
    </div>
  );
}
