import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm'
import TollEmp from './components/TollEmp/TollEmp';
import ForgotPassword from './components/AuthForm/forgotPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <AuthForm /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/toll-emp/:empid", element: <TollEmp /> },
    ],
  },
]);

function App() {
  return (
    <div className="interface">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
