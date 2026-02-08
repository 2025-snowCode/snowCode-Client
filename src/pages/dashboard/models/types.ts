import type {DashboardCourse, Schedule} from '@/models/course';

/**
 * 강의 목록 컴포넌트 props 타입
 */
export interface CourseListProps {
  courseList: DashboardCourse[];
}

// 스케쥴 할당 타입
type AssignmentType = Schedule['assignments'][number];

/**
 * 스케쥴 카드 컴포넌트 props 타입
 */
export interface ScheduleCardProps extends AssignmentType {
  remainingDays: number;
}
