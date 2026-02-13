import {queryOptions} from '@tanstack/react-query';
import {getAssignmentSchedules} from './assignmentApi';

export default function assignmentQueryOptions() {
  return queryOptions({
    queryKey: ['schedules'],
    queryFn: getAssignmentSchedules,
  });
}
