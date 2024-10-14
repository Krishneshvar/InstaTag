import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Contents from './Components/Contents/Contents';
import AboutUs from './Components/AboutUs/AboutUs';
import Login from './Components/AuthForms/Login';
import Register from './Components/AuthForms/Register';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import TollEmp from './Components/TollEmp/TollEmp';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <Contents /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {path: "/toll-emp" ,element: <TollEmp />} ,
      { path: "/user-dashboard", element: <UserDashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
