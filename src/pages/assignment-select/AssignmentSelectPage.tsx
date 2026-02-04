import AssignmentPageLayout from './AssignmentPageLayout';
import {response} from './models/Response';
import AssignmentListContainer from './ui/AssignmentListContainer';
import {formatCourseOptionLabel} from '@/utils/course';
import {useEffect, useMemo, useState} from 'react';
import AssignmentItem from '@/components/common/AssignmentItem';

const ALL_COURSES_OPTION = '전체 강의' as const;

const AssignmentSelectPage = () => {
  const {courses} = response.response;
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [courseList, setCourseList] = useState(courses); // 표시할 강의 목록
  const [selectedAssignments, setSelectedAssignments] = useState<number[]>([]); // 선택된 문제 ID 목록

  // 강의 선택 드롭다운 메뉴 옵션
  const courseOptionMap = useMemo(() => {
    const map = new Map<string, number>();

    courses.forEach((course) => {
      const label = formatCourseOptionLabel(
        course.title,
        course.year,
        course.semester,
        course.section
      );
      map.set(label, course.id);
    });

    return map;
  }, [courses]);

  const courseOptions = useMemo(() => {
    return [ALL_COURSES_OPTION, ...Array.from(courseOptionMap.keys())];
  }, [courseOptionMap]);

  // 강의 선택 핸들러
  const handleCourseSelect = (value: string) => {
    if (value === ALL_COURSES_OPTION) {
      setSelectedCourseId(null);
      return;
    }

    const courseId = courseOptionMap.get(value) ?? null;
    setSelectedCourseId(courseId);
  };

  // 선택된 강의에 따라 문제 목록 필터링
  useEffect(() => {
    if (!selectedCourseId) {
      setCourseList(courses);
      return;
    }

    setCourseList(courses.filter((course) => course.id === selectedCourseId));
  }, [selectedCourseId, courses]);

  // 문제 목록
  const assignmentList = courseList.flatMap((course) => course.assignments);

  // 문제 선택 핸들러
  const handleAssignmentSelect = (assignmentId: number) => {
    setSelectedAssignments((prev) => {
      if (prev.includes(assignmentId)) {
        return prev.filter((id) => id !== assignmentId); // 선택 해제
      } else {
        return [...prev, assignmentId]; // 선택 추가
      }
    });
  };

  return (
    <AssignmentPageLayout
      title='문제 선택'
      courseOptions={courseOptions}
      onCourseSelect={handleCourseSelect}
      list={
        <AssignmentListContainer
          items={assignmentList}
          title={`${assignmentList.length}문제`}
          onSelect={handleAssignmentSelect}
          renderItem={(assignment) => (
            <AssignmentItem
              title={assignment.title}
              selected={selectedAssignments.includes(assignment.id)}
            />
          )}
        />
      }
      onCancel={() => {}}
      onConfirm={() => {}}
    />
  );
};

export default AssignmentSelectPage;
