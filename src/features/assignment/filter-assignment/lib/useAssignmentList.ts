import {useQuery} from '@tanstack/react-query';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import type {Assignment} from '@/entities/assignment/model/types';

// 중복 제거
const unique = (list: Assignment[]) =>
  Array.from(new Map(list.map((a) => [a.id, a])).values());

export const useAssignmentList = (
  selectedCourseId: number | null
): Assignment[] => {
  const {data: allAssignments} = useQuery(
    assignmentQueries.getAllAssignments()
  );
  const {data: assignments} = useQuery(
    assignmentQueries.getAssignmentsByCourse(selectedCourseId ?? 0)
  );

  return unique(
    selectedCourseId ? (assignments ?? []) : (allAssignments ?? [])
  );
};
