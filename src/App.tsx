import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Layout from './layout/Layout';
import LandingPage from './pages/common/LandingPage';
import UserIdInputPage from './pages/common/UserIdInputPage';
import Dashboard from './pages/dashboard/Dashboard';
import AssignmentSelectPage from './pages/select-assignment/AssignmentSelectPage';
import CourseOverviewPage from './pages/course-overview/CourseOverviewPage';
import AssignmentCreatePage from './pages/admin/assignments/AssignmentCreatePage';
import CourseCreatePage from './pages/admin/courses/CourseCreatePage';
import StudentManagementPage from './pages/admin/student/StudentManagementPage';
import StudentProfilePage from './pages/admin/student/StudentProfilePage';
import KakaoCallbackPage from './pages/common/KakaoCallbackPage';
import PrivateRoute from '@/widgets/private-route/ui/PrivateRoute';
import {useEffect} from 'react';
import {useUserStore} from '@/entities/auth/model/useUserStore';

const AppRoutes = () => {
  const {pathname} = useLocation();
  const {setUserType} = useUserStore();

  useEffect(() => {
    const userType = pathname.startsWith('/admin')
      ? 'admin'
      : pathname.startsWith('/student')
        ? 'student'
        : 'guest';
    setUserType(userType);
  }, [pathname, setUserType]);

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 공통 영역 */}
        <Route index element={<LandingPage />} />
        <Route path='userid' element={<UserIdInputPage />} />
        <Route path='auth/kakao/callback' element={<KakaoCallbackPage />} />

        {/* 인증 필요 영역 */}
        <Route element={<PrivateRoute />}>
          {/* 학생 영역 */}
          <Route path='student'>
            <Route index element={<Dashboard />} />
            <Route path='courses/:id' element={<CourseOverviewPage />} />
          </Route>

          {/* 관리자 영역 */}
          <Route path='admin'>
            <Route index element={<Dashboard />} />
            {/* <Route path='assignments' element={<AssignmentsPage />} /> */}
            <Route
              path='assignments/create'
              element={<AssignmentCreatePage />}
            />
            <Route path='assignments/:id' element={<AssignmentSelectPage />} />
            <Route path='courses/:id' element={<CourseOverviewPage />} />
            <Route path='courses/create' element={<CourseCreatePage />} />
            <Route path='student' element={<StudentManagementPage />} />
            <Route
              path='student/profile/:studentId'
              element={<StudentProfilePage />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
