import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/app-layout/AppLayout';
import { useAppSelector } from '../../../_store/hooks';
import Dashboard from '../components/dashboard/Dashboard';
import { AuthUser } from '../../../_store/features/auth/authTypes';


const ReportRoutes = () => {
  const userDetails: AuthUser | null = useAppSelector(
    (state) => state.auth?.user,
  );
 
  return (
    <Routes>
    <Route element={<AppLayout />} path="*">
     <Route path="*" element={<Navigate to="/report/dashboard" />} />
      <Route element={<Dashboard />} path="dashboard" />
    </Route>
  </Routes>
  );
};

export default ReportRoutes;
