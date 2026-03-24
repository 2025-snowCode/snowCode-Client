import {useParams} from 'react-router-dom';
import SurfaceCard from '@/shared/ui/SurfaceCard';
import {StudentProfile} from '@/entities/student/ui/StudentProfile';
import {AssignmentProgressCard} from '@/entities/student/ui/AssignmentProgressCard';
import {useQuery} from '@tanstack/react-query';
import {studentQueries} from '@/entities/student/api/studentQueries';

export default function StudentProfilePage() {
  const {courseId, studentId} = useParams<{
    courseId: string;
    studentId: string;
  }>();

  const {data: student} = useQuery(
    studentQueries.getEnrollmentById(Number(courseId), Number(studentId))
  );

  if (!student) {
    return <p>학생 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className='relative left-1/2 -translate-x-1/2 w-fit flex items-center gap-6'>
      <StudentProfile name={student.name} studentId={student.studentId} />
      <SurfaceCard size='medium' className='w-184.25 min-w-0 shrink-0'>
        <AssignmentProgressCard student={student} />
      </SurfaceCard>
    </div>
  );
}
