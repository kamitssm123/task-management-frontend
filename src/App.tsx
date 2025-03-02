import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import "./App.style.css";
import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import ROUTES from "./constants/routes";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.HOME} />;
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      <div className="inner-container">
        <Router>
          <Header />
          <div className="page">
            <Routes>
              <Route path={ROUTES.HOME} element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Login />} />
              <Route
                path={ROUTES.DASHBOARD}
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.TASK_LIST}
                element={
                  <ProtectedRoute>
                    <TaskList />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME} />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
