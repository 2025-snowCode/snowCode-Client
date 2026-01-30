import SurfaceCard from '@/components/common/SurfaceCard';
import CourseSelector from './ui/CourseSelector';
import AssignmentPageLayout from './AssignmentPageLayout';
import SectionTitle from './ui/SectionTitle';
import {response} from './models/Response';
import AssignmentListContainer from './ui/AssignmentListContainer';
import ActionButtonGroup from './ui/ActionButtonGroup';
import {formatCourseTermWithSlash} from '@/utils/course';
import {useEffect, useState} from 'react';
import ProblemItem from '@/components/common/AssignmentItem';

const AssignmentSelectPage = () => {
  const {courses} = response.response;
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [courseList, setCourseList] = useState(courses); // 표시할 강의 목록
  const [selectedAssignments, setSelectedAssignments] = useState<number[]>([]); // 선택된 문제 ID 목록

  const handleCourseSelect = (value: string) => {
    if (value === '전체 강의') {
      setSelectedCourseId(null);
      return;
    }

    const courseId =
      courses.find(
        (course) =>
          `${course.title} ${formatCourseTermWithSlash(
            course.year,
            course.semester,
            course.section
          )}` === value
      )?.id || null;

    setSelectedCourseId(courseId);
  };

  const handleAssignmentSelect = (assignmentId: number) => {
    setSelectedAssignments((prev) => {
      if (prev.includes(assignmentId)) {
        return prev.filter((id) => id !== assignmentId);
      } else {
        return [...prev, assignmentId];
      }
    });
  };

  useEffect(() => {
    if (!selectedCourseId) {
      setCourseList(courses);
      return;
    }

    // 선택된 강의에 해당하는 문제들만 필터링
    setCourseList(courses.filter((course) => course.id === selectedCourseId));
  }, [selectedCourseId]);

  // 강의 선택 옵션 생성
  const COURSE_OPTIONS = [
    '전체 강의',
    ...courses.map(
      (course) =>
        `${course.title} ${formatCourseTermWithSlash(course.year, course.semester, course.section)}`
    ),
  ];

  const assignmentList = courseList.flatMap((course) => course.assignments);

  return (
    <AssignmentPageLayout
      header={
        <>
          <SectionTitle title='문제 선택' />
          <CourseSelector
            options={COURSE_OPTIONS}
            onSelect={handleCourseSelect}
          />
        </>
      }
      list={
        <>
          <AssignmentListContainer
            items={assignmentList}
            title={`${assignmentList.length}문제`}
            onSelect={handleAssignmentSelect}
            renderItem={(assignment) => (
              <ProblemItem
                title={assignment.title}
                selected={selectedAssignments.includes(assignment.id)}
              />
            )}
          />
        </>
      }
      footer={<ActionButtonGroup />}
    />
  );
};

export default AssignmentSelectPage;
