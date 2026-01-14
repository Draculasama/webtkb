import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Import router
import { adminRoutes } from "./router/adminRoutes";
import { TimetableGridPage } from "./client/pages/TimetableGridPage";

import { Login } from "./modules/auth/components/Login";
import {
  AuthProvider,
  useAuthContext,
} from "./modules/auth/context/AuthContext";
import { MainLayout } from "./admin/pages/AdminPages";

import "./App.css";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const { isAuthenticated, user } = useAuthContext();
  const routerFutureConfig = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  } as any;
  
  return (
    <Router future={routerFutureConfig}>
      <Routes>
        {/* Client Routes */}
          <Route path="/" element={<TimetableGridPage  />} />
    
     


      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
