import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Contents from './Components/Contents/Contents';
import AboutUs from './Components/AboutUs/AboutUs';
import Login from './Components/AuthForms/Login';
import Register from './Components/AuthForms/Register';
import UserDashboard from './Components/UserDashboard/UserDashboard'; // Ensure this is imported
import VehicleDetails from './Components/UserDashboard/VehicleDetails';
import TollDetails from './Components/TollDetails/TollDetails';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

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
      // {path: "/toll-emp", element: <TollEmp />},
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/user-dashboard/:user_id", element: <UserDashboard /> }, // Updated route
      { path: "/user-dashboard/:user_id/:vehicle_no", element: <VehicleDetails /> },
      { path: "/toll-details",element:<TollDetails />},
      { path: "/contact",element:<Contact /> }, 
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
