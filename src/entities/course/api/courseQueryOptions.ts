import {getAllCourses} from './courseApi';
import {queryOptions} from '@tanstack/react-query';

export default function courseQueryOptions() {
  return queryOptions({
    queryKey: ['courses'],
    queryFn: getAllCourses,
  });
}
