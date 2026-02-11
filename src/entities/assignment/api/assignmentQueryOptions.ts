import {getAssignmentSchedules} from './assignmentApi';

export default function assignmentQueryOptions() {
  return {
    queryKey: ['schedules'],
    queryFn: getAssignmentSchedules,
  };
}
