import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AuthForm from './components/AuthForm/AuthForm'
import Scanner from './components/Scanner/Scanner';

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
      { path: "/", element: <AuthForm /> },
      { path: "/scanner", element: <Scanner /> },
    ],
  },
]);

function App() {

  return (
    <>
    <div className="interface">
      <RouterProvider router={router} />;
    </div>
    </>
  )
}

export default App
