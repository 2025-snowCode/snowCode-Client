import {Navigate, Outlet, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {courseQueries} from '@/entities/course/api/courseQueries';
import {useUserStore} from '@/entities/auth/model/useUserStore';
import {ROUTES} from '@/shared/config/routes';

export default function CourseOwnershipGuard() {
  const {courseId} = useParams();
  const targetId = Number(courseId);
  const userType = useUserStore((state) => state.userType);

  const {data, isPending} = useQuery(courseQueries.getAllCourses());

  if (isPending) return null;

  const hasAccess = data?.courses.some((c) => c.id === targetId);

  if (!hasAccess) {
    return (
      <Navigate
        to={userType === 'admin' ? ROUTES.ADMIN.ROOT : ROUTES.STUDENT.ROOT}
        replace
      />
    );
  }

  return <Outlet />;
}
