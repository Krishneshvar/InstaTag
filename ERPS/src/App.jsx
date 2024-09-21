import './App.css';
import Contents from './Components/Contents/Contents';
import Navbar from './Components/Navbar/Navbar';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import AboutUs from './Components/AboutUs/AboutUs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<Contents />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        
      </Routes>
    </Router>
  );
}

export default App;
