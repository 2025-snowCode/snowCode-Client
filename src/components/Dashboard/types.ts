interface Schedule {
  id: number;
  count: number;
  date: string;
  assignments: Assignment[];
}

interface Assignment {
  id: number;
  class_no: string;
  course_name: string;
  prob_name: string;
}

interface Course {
  id: number;
  courseName: string;
  courseYear: number;
  courseSem: string;
  classNum: string;
  courseDescription: string;
  moduleNum: number;
  probNum: number;
}

export type {Course, Schedule, Assignment};
