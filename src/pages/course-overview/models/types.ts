import type {Assignment, CourseOverview, Unit} from '@/models/course';

/**
 * CourseHero 컴포넌트 props 타입 정의
 */
export interface CourseHeroProps {
  courseData: Omit<CourseOverview, 'units'>;
  assignmentCount: number;
  isActiveCourse: boolean;
}

/**
 * CourseInfo 컴포넌트 props 타입 정의
 */
export type CourseInfoProps = Pick<
  CourseHeroProps['courseData'],
  'title' | 'year' | 'semester' | 'section'
>;

/**
 * CourseStats 컴포넌트 props 타입 정의
 */
export interface CourseStatsProps
  extends Pick<CourseHeroProps['courseData'], 'unitCount' | 'studentCount'> {
  assignmentCount: CourseHeroProps['assignmentCount'];
  isAdmin: boolean;
}

/**
 * CourseContent 컴포넌트 props 타입 정의
 */
export interface CourseContentProps {
  units: CourseOverview['units'];
  isActiveCourse: boolean;
}

/**
 * UnitItem 컴포넌트 props 타입 정의
 */
export interface UnitProps extends Unit {
  index: number;
}

/**
 * UnitHeader 컴포넌트 props 타입 정의
 */
export type UnitHeaderProps = Omit<
  UnitProps,
  'id' | 'assignmentCount' | 'assignments'
>;

/**
 * AssignmentList 컴포넌트 props 타입 정의
 */
export interface AssignmentListProps {
  isOpen?: boolean;
  assignments: Assignment[];
}

/**
 * AssignmentItem 컴포넌트 props 타입 정의
 */
export interface AssignmentItemProps extends Assignment {
  index: number;
  isOpen?: boolean;
}
