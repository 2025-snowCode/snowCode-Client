import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layout/Layout';
import LandingPage from './pages/common/LandingPage';
import UserIdInputPage from './pages/common/UserIdInputPage';
import Dashboard from './pages/common/Dashboard';
import AssignmentsPage from './pages/admin/assignments/AssignmentsPage';
import AssignmentSelectPage from './pages/admin/assignments/AssignmentSelectPage';
import CourseOverviewPage from './pages/course-overview/CourseOverviewPage';
import AssignmentCreatePage from './pages/admin/assignments/AssignmentCreatePage';
import CourseCreatePage from './pages/admin/courses/CourseCreatePage';
import StudentManagementPage from './pages/admin/student/studentManagementPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 영역 */}
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='userid' element={<UserIdInputPage />} />
        </Route>

        {/* 학생 전용 영역 */}
        <Route path='/student' element={<Layout />}>
          {/* 추가 페이지들 */}
          <Route index element={<Dashboard />} />
          <Route path='course/:id' element={<CourseOverviewPage />} />
        </Route>

        {/* 관리자 전용 영역 */}
        <Route path='/admin' element={<Layout />}>
          {/* 추가 페이지들 */}
          <Route index element={<Dashboard />} />
          <Route path='assignments' element={<AssignmentsPage />} />
          <Route path='assignments/create' element={<AssignmentCreatePage />} />
          <Route path='assignments/:id' element={<AssignmentSelectPage />} />
          <Route path='course/:id' element={<CourseOverviewPage />} />
          <Route path='courses/create' element={<CourseCreatePage />} />
          <Route path='student' element={<StudentManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
