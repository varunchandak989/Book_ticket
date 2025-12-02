import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Partner from "./pages/Partner";
import SingleMovie from "./pages/singleMovie";
import BookShow from "./pages/BookShow";
import RoleBasedRoute from "./components/RoleBasedRoute";
import PaymentSuccess from './pages/PaymentSuccess'
import MyBookings from './pages/User/MyBookings'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["user"]}>
                  <Home />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/singlemovie/:id/"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["user"]}>
                  <SingleMovie />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookshow/:id"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["user"]}>
                  <BookShow />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["user"]}>
                  <PaymentSuccess />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["user"]}>
                  <MyBookings />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["admin"]}>
                  <Admin />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/partner"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["partner"]}>
                  <Partner />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
