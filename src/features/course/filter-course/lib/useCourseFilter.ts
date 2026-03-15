import type {TDashboardCourse} from '@/entities/course/model/schemas';
import {formatCourseOptionLabel} from '@/shared/lib/course';
import {useMemo, useState} from 'react';

const ALL_COURSES_OPTION = '전체 강의' as const;

export const useCourseFilter = (courses: TDashboardCourse[]) => {
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

  const handleCourseSelect = (value: string) => {
    if (value === ALL_COURSES_OPTION) {
      setSelectedCourseId(null);
      return;
    }

    const courseId = courseOptionMap.get(value) ?? null;
    setSelectedCourseId(courseId);
  };

  const selectedCourseLabel = useMemo(() => {
    if (selectedCourseId === null) return ALL_COURSES_OPTION;
    for (const [key, value] of courseOptionMap.entries()) {
      if (value === selectedCourseId) return key;
    }
    return ALL_COURSES_OPTION;
  }, [selectedCourseId, courseOptionMap]);

  return {courseOptions, handleCourseSelect, selectedCourseId, selectedCourseLabel};
};
