import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '@/shared/ui/Layout';
import LandingPage from '@/pages/common/LandingPage';
import UserIdInputPage from '@/pages/common/UserIdInputPage';
import Dashboard from '@/pages/dashboard/Dashboard';
import AssignmentSelectPage from '@/pages/select-assignment/AssignmentSelectPage';
import CourseOverviewPage from '@/pages/course-overview/CourseOverviewPage';
import AssignmentFormPage from '@/pages/admin/assignments/AssignmentFormPage';
import {CourseCreatePage} from '@/pages/admin/courses/CourseCreatePage';
import {CourseEditPage} from '@/pages/admin/courses/CourseEditPage';
import StudentManagementPage from '@/pages/admin/student/StudentManagementPage';
import StudentProfilePage from '@/pages/admin/student/StudentProfilePage';
import KakaoCallbackPage from '@/pages/common/KakaoCallbackPage';
import PrivateRoute from '@/widgets/private-route/ui/PrivateRoute';
import {useSyncUserRole} from '@/features/auth/sync-user-role/model/useSyncUserRole';
import UnitEditorPage from '@/pages/unit-editor/UnitEditorPage';
import AssignmentManagePage from '@/pages/manage-assignment/AssignmentManagePage';
import ChatPage from '@/pages/chat/ChatPage';
import AssignmentSubmitPage from '@/pages/submit-assignment/AssignmentSubmitPage';
import AssignmentSubmitLayout from '@/pages/submit-assignment/AssignmentSubmitLayout';

const AppRoutes = () => {
  useSyncUserRole();

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 공통 영역 */}
        <Route index element={<LandingPage />} />
        <Route path='userid' element={<UserIdInputPage />} />
        <Route path='auth/kakao/callback' element={<KakaoCallbackPage />} />

        {/* 학생 영역 */}
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route path='student'>
            <Route index element={<Dashboard />} />
            <Route path='courses/:id' element={<CourseOverviewPage />} />
          </Route>
        </Route>

        {/* 관리자 영역 */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path='admin'>
            <Route index element={<Dashboard />} />
            <Route
              path='assignments/manage'
              element={<AssignmentManagePage />}
            />
            <Route path='assignments/create' element={<AssignmentFormPage />} />
            <Route
              path='assignments/edit/:id'
              element={<AssignmentFormPage />}
            />
            <Route
              path='assignments/select'
              element={<AssignmentSelectPage />}
            />
            <Route path='courses/:id' element={<CourseOverviewPage />} />
            <Route path='courses/create' element={<CourseCreatePage />} />
            <Route path='courses/:id/edit' element={<CourseEditPage />} />
            <Route
              path='courses/:courseId/students'
              element={<StudentManagementPage />}
            />
            <Route
              path='courses/:courseId/students/:studentId'
              element={<StudentProfilePage />}
            />
            <Route path='units/:id' element={<UnitEditorPage />} />
            <Route path='chat' element={<ChatPage />} />
          </Route>
        </Route>
      </Route>

      {/* 과제 제출 페이지 */}
      <Route element={<AssignmentSubmitLayout />}>
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route
            path='admin/courses/:courseId/assignments/:assignmentId'
            element={<AssignmentSubmitPage />}
          />
        </Route>
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route
            path='student/courses/:courseId/assignments/:assignmentId'
            element={<AssignmentSubmitPage />}
          />
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
