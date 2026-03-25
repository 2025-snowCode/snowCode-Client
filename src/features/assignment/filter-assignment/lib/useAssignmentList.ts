import {useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import type {TAssignment} from '@/entities/assignment/model/schemas';

// 중복 제거
const unique = (list: TAssignment[]) =>
  Array.from(new Map(list.map((a) => [a.id, a])).values());

export const useAssignmentList = (selectedCourseId: number): TAssignment[] => {
  const {data: allAssignments} = useSuspenseQuery(
    assignmentQueries.getAllAssignments()
  );

  const {data: assignments} = useQuery({
    ...assignmentQueries.getAssignmentsByCourse(selectedCourseId),
    enabled: !!selectedCourseId,
  });

  return unique(
    selectedCourseId ? (assignments ?? []) : (allAssignments ?? [])
  );
};
