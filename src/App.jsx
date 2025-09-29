// src/App.jsx
import "./App.css";
import Homepage from "./Pages/HomePage/Homepage";
import MembersPage from "./Pages/Members/MembersPage";
import MembersArea from "./Pages/MembersArea/MembersArea";
import Root from "./Root/Root";
import { trackPageView } from "./utils/analytics"; // 👈 add this
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  useLocation,
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

// Wrap Root so we don’t have to edit your Root component file
function RootWithTracking() {
  return (
    <>
      <PageViewTracker />
      <Root />
    </>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootWithTracking />}>
        <Route index element={<Homepage />} />
        <Route path="homePage" element={<Homepage />} />

        {/* New branded routes */}
        <Route path="fitblueprint" element={<MembersPage />} />
        <Route path="fitblueprint/hub" element={<MembersArea />} />

        {/* Legacy redirects */}
        <Route path="membersPage" element={<Navigate to="/fitblueprint" replace />} />
        <Route path="membersArea" element={<Navigate to="/fitblueprint/hub" replace />} />
        <Route path="memberArea" element={<Navigate to="/fitblueprint/hub" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;


