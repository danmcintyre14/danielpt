// src/App.jsx
import "./App.css";
import Homepage from "./Pages/HomePage/Homepage";
import MembersPage from "./Pages/Members/MembersPage";
import MembersArea from "./Pages/MembersArea/MembersArea";
import Terms from "./Pages/Terms/Terms";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Footer from "./Components/Footer/Footer";
import Root from "./Root/Root";
import { trackPageView } from "./utils/analytics";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import { useEffect } from "react";

// Fires a GA page_view whenever the route changes
function PageViewTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
}

// Normal website layout
function RootWithTracking() {
  return (
    <>
      <PageViewTracker />
      <Root />
      <Footer />
    </>
  );
}

// Standalone layout for The Rebuild
// No website header or footer
function RebuildLayout() {
  return (
    <>
      <PageViewTracker />
      <Outlet />
    </>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Main website */}
        <Route path="/" element={<RootWithTracking />}>
          <Route index element={<Homepage />} />
          <Route path="homePage" element={<Homepage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
        </Route>

        {/* The Rebuild - standalone */}
        <Route element={<RebuildLayout />}>
          <Route path="/rebuild" element={<MembersPage />} />
          <Route path="/rebuild/hub" element={<MembersArea />} />

          {/* Old FitBlueprint URLs */}
          <Route
            path="/fitblueprint"
            element={<Navigate to="/rebuild" replace />}
          />
          <Route
            path="/fitblueprint/hub"
            element={<Navigate to="/rebuild/hub" replace />}
          />

          {/* Older legacy URLs */}
          <Route
            path="/membersPage"
            element={<Navigate to="/rebuild" replace />}
          />
          <Route
            path="/membersArea"
            element={<Navigate to="/rebuild/hub" replace />}
          />
          <Route
            path="/memberArea"
            element={<Navigate to="/rebuild/hub" replace />}
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;


