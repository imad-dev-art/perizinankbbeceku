import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const PermitsPage = lazy(() => import("./components/dashboard/PermitsPage"));
const UsersPage = lazy(() => import("./components/dashboard/UsersPage"));
const SettingsPage = lazy(() => import("./components/dashboard/SettingsPage"));
const PermitApplicationForm = lazy(
  () => import("./components/dashboard/PermitApplicationForm"),
);
const PermitReviewPage = lazy(
  () => import("./components/dashboard/PermitReviewPage"),
);
const PermitApprovalPage = lazy(
  () => import("./components/dashboard/PermitApprovalPage"),
);
const PrintApprovalPage = lazy(
  () => import("./components/dashboard/PrintApprovalPage"),
);

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/permits" element={<PermitsPage />} />
          <Route
            path="/dashboard/permits/new"
            element={<PermitApplicationForm />}
          />
          <Route
            path="/dashboard/permits/review"
            element={<PermitReviewPage />}
          />
          <Route
            path="/dashboard/permits/approval"
            element={<PermitApprovalPage />}
          />
          <Route
            path="/dashboard/permits/print/:id"
            element={<PrintApprovalPage />}
          />
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
