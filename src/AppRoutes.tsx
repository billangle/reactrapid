// AppRoutes.tsx
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import { CheckLoggedInLocalStorage } from "./utils/auth";
import LoginLegalNotices from "./components/login-legal-notices/LoginLegalNotices";
import ScrollToTop from "./utils/ScrollToTop";
import { useAppSelector } from "./_store/hooks";
import { GovBanner } from "@trussworks/react-uswds";
import ReportRoutes from "./modules/reports/routes/ReportRoutes";
import InactiveLoggedOut from "./components/inactive-logged-out/InactiveLoggedOut";
import UnauthorizedAppLayout from "./components/unauthorized-app-layout/UnauthorizedAppLayout";
import NewUserRegistration from "./components/registration/RegisterNewUser/NewUserRegistration";
import UserRoutes from "./modules/users/routes/UserRoutes";
import EmploymentHistory from "./modules/employment-history/routes/EmploymentHistoryRoutes";

const ProtectedRoutes = () => {
  const auth = useAppSelector((state) => state.auth);
  const isLoggedIn = CheckLoggedInLocalStorage();
  if (auth.loading) {
    return <></>;
  } else {
    if (!auth.user || !isLoggedIn) {
      return (
        <>
          <Navigate to="/login" />
        </>
      );
    }
    return <Outlet />;
  }
};

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="inactive-logged-out" element={<InactiveLoggedOut />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/registration" element={<UnauthorizedAppLayout />}>
        <Route path="/registration">
          <Route index element={<NewUserRegistration />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<ReportRoutes />} path={"/report/*"} />
        <Route element={<UserRoutes />} path={"/users/*"} />
        <Route element={<EmploymentHistory />} path={"/employmenthistory/*"} />
      </Route>
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <>
      <GovBanner />

      <ScrollToTop />
      <Routes>
        <Route element={<PublicRoutes />} path="/*" />
      </Routes>
    </>
  );
};

export default AppRoutes;
