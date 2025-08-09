type SemesterCode = 'FIRST' | 'SECOND' | 'SUMMER' | 'WINTER';

interface Assignment {
  id: number;
  title: string;
}

interface Course {
  id: number;
  title: string;
  year: number;
  semester: SemesterCode;
  section: string;
  count: number;
  assignments: Assignment[];
}

interface CoursesResponse {
  success: boolean;
  response: {
    count: number;
    courses: Course[];
  };
}

export type {Assignment, Course, CoursesResponse, SemesterCode};
