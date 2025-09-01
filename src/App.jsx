// src/App.jsx
import "./App.css";
import Homepage from "./Pages/HomePage/Homepage";
import MembersPage from "./Pages/Members/MembersPage";
import MembersArea from "./Pages/MembersArea/MembersArea";
import Root from "./Root/Root";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Homepage />} />
        <Route path="homePage" element={<Homepage />} />

        {/* New branded routes */}
        <Route path="fitblueprint" element={<MembersPage />} />
        <Route path="fitblueprint/hub" element={<MembersArea />} />

        {/* Legacy redirects (cover both spellings just in case) */}
        <Route path="membersPage" element={<Navigate to="/fitblueprint" replace />} />
        <Route path="membersArea" element={<Navigate to="/fitblueprint/hub" replace />} />
        <Route path="memberArea" element={<Navigate to="/fitblueprint/hub" replace />} />

        {/* Optional: catch-all */}
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

