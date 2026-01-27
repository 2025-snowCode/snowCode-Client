import SurfaceCard from '@/components/common/SurfaceCard';
import CourseSelector from './ui/CourseSelector';
import AssignmentPageLayout from './AssignmentPageLayout';
import SectionTitle from './ui/SectionTitle';
import {response} from './models/Response';
import ProblemListContainer from './ui/ProblemListContainer';
import ActionButtonGroup from './ui/ActionButtonGroup';
import {formatCourseTermWithSlash} from '@/utils/course';
import {useEffect, useState} from 'react';

const ProblemSelectPage = () => {
  const {courses} = response.response;
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null); // null이면 전체 강의 선택
  const [courseList, setCourseList] = useState(courses); // 표시할 강의 목록

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

  return (
    <SurfaceCard size='large' className='mx-auto'>
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
            <ProblemListContainer courseList={courseList} />
          </>
        }
        footer={<ActionButtonGroup />}
      />
    </SurfaceCard>
  );
};

export default ProblemSelectPage;
