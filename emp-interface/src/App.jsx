import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm'
import TollEmp from './components/TollEmp/TollEmp';

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
      { path: "/toll-emp", element: <TollEmp /> },
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
