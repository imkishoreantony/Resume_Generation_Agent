import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import CreateResume from "./pages/CreateResume";
import ProtectedRoute from "./components/ProtectedRoute";
import GenerateResume from "./pages/GenerateResume";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ReviewResume from "./pages/ReviewResume";
import AssistResume from "./pages/AssistResume";
import JobMatch from "./pages/JobMatch";
import CoverLetter from "./pages/CoverLetter";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review/:id"
          element={
            <ProtectedRoute>
              <ReviewResume />
            </ProtectedRoute>
          }
        />

        <Route
    path="/generate/:id"
    element={
      <ProtectedRoute>
        <GenerateResume />
      </ProtectedRoute>
    }
  />
    <Route
    path="/create"
    element={
      <ProtectedRoute>
        <CreateResume />
      </ProtectedRoute>
    }
  />
  <Route
    path="/assist/:id"
    element={
      <ProtectedRoute>
        <AssistResume />
      </ProtectedRoute>
    }
  />
  <Route
    path="/cover-letter/:id"
    element={<CoverLetter />}
    />
    <Route path="/job-match/:id" element={<JobMatch />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;