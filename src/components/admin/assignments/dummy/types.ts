interface Assignment {
  id: number;
  title: string;
}

interface Course {
  id: number;
  title: string;
  year: number;
  semester: 'FIRST' | 'SECOND' | 'SUMMER' | 'WINTER';
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

export type {Assignment, Course, CoursesResponse};
