import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Contents from './Components/Contents/Contents';
import AboutUs from './Components/AboutUs/AboutUs';
import Login from './Components/AuthForms/Login';
import Register from './Components/AuthForms/Register';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import VehicleDetails from './Components/UserDashboard/VehicleDetails';
import TollDetails from './Components/TollDetails/TollDetails';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log("No token", token);
    return <Navigate to="/login" />;
  }
  console.log("Token exists", token);

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      { path: "/", element: <Contents /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/user-dashboard/:user_id",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-dashboard/:user_id/:vehicle_no",
        element: (
          <ProtectedRoute>
            <VehicleDetails />
          </ProtectedRoute>
        ),
      },
      { path: "/toll-details", element: <TollDetails /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
