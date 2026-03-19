import type {TDashboardCourse} from '@/entities/course/model/types';
import {formatCourseOptionLabel} from '@/shared/lib/course';
import {useMemo, useState} from 'react';

const ALL_COURSES_OPTION = '전체 강의' as const;

export const useCourseFilter = (courses: TDashboardCourse[]) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  // 강의 선택 드롭다운 메뉴 옵션
  const courseMaps = useMemo(() => {
    const labelToId = new Map<string, number>();
    const idToLabel = new Map<number, string>();

    courses.forEach((course) => {
      const label = formatCourseOptionLabel(
        course.title,
        course.year,
        course.semester,
        course.section
      );
      labelToId.set(label, course.id);
      idToLabel.set(course.id, label);
    });

    return {labelToId, idToLabel};
  }, [courses]);

  const courseOptions = useMemo(() => {
    return [ALL_COURSES_OPTION, ...Array.from(courseMaps.labelToId.keys())];
  }, [courseMaps.labelToId]);

  const handleCourseSelect = (value: string) => {
    if (value === ALL_COURSES_OPTION) {
      setSelectedCourseId(null);
      return;
    }

    const courseId = courseMaps.labelToId.get(value) ?? null;
    setSelectedCourseId(courseId);
  };

  const selectedCourseLabel = useMemo(() => {
    if (selectedCourseId === null) return ALL_COURSES_OPTION;
    return courseMaps.idToLabel.get(selectedCourseId) ?? ALL_COURSES_OPTION;
  }, [selectedCourseId, courseMaps]);

  return {courseOptions, handleCourseSelect, selectedCourseId, selectedCourseLabel};
};
