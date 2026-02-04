import type {DashboardCourse} from '@/models/course';
import {formatCourseOptionLabel} from '@/utils/course';
import {useMemo, useState} from 'react';

const ALL_COURSES_OPTION = '전체 강의' as const;

export const useCourseFilter = (courses: DashboardCourse[]) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

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

  return {courseOptions, handleCourseSelect, selectedCourseId};
};
