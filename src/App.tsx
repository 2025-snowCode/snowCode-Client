import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layout/Layout';
import LandingPage from './pages/common/LandingPage';
import UserIdInputPage from './pages/common/UserIdInputPage';
import Dashboard from './pages/common/Dashboard';
import AssignmentsPage from './pages/admin/AssignmentsPage';
import AssignmentSelectPage from './pages/admin/AssignmentSelectPage';
import UnitPage from './pages/admin/UnitPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 영역 */}
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='/userid' element={<UserIdInputPage />} />
        </Route>

        {/* 학생 전용 영역 */}
        <Route path='/student' element={<Layout />}>
          {/* 추가 페이지들 */}
          <Route index element={<Dashboard />} />
        </Route>

        {/* 관리자 전용 영역 */}
        <Route path='/admin' element={<Layout />}>
          {/* 추가 페이지들 */}
          <Route index element={<Dashboard />} />
          <Route path='assignments' element={<AssignmentsPage />} />
          <Route path='assignments/:id' element={<AssignmentSelectPage />} />
          <Route path='units' element={<UnitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
