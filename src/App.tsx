import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/common/Dashboard';
import ManageAssignments from './pages/admin/ManageAssignments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 영역 */}
        <Route path='/' element={<Layout />}>
          {/* 추가 페이지들 */}
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
          <Route path='assignments' element={<ManageAssignments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
