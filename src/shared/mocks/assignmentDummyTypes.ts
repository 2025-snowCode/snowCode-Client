type SemesterCode = 'FIRST' | 'SECOND' | 'SUMMER' | 'WINTER';
type SubmissionStatus = 'NOT_SUBMITTED' | 'CORRECT' | 'INCORRECT';

interface Assignment {
  id: number;
  title: string;
  submittedStatus?: SubmissionStatus;
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

export type {
  Assignment,
  Course,
  CoursesResponse,
  SemesterCode,
  SubmissionStatus,
};
