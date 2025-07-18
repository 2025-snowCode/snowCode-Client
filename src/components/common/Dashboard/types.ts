interface Schedule {
  id: number;
  date: Date;
  remainingDays: number;
  assignments: Assignment[];
}

interface Assignment {
  id: number;
  course: string;
  section: string;
  assignment: string;
}

interface Course {
  id: number;
  year: number;
  semester: string;
  section: string;
  title: string;
  description: string;
  unitCount: number;
  assignmentCount: number;
}

export type {Course, Schedule, Assignment};
