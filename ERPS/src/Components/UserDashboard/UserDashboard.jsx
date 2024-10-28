import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

export default function UserDashboard({ onLogout }) {
  const { user_id } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserVehicles = async () => {
      try {
        const response = await fetch(`http://192.168.43.148:3000/api/user-details/${user_id}`);
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
        } else {
          throw new Error("Failed to fetch vehicle data");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUserVehicles();
  }, [user_id]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }

  const handleChangePass = () => { navigate('/change-pass'); }

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!vehicles.length) return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;

  return (
    <div className="container-fluid dashboard-container">
      <div className="col-md-9 main-content">
        <section id="vehicles" className="d-flex flex-column justify-content-center align-items-center">
          <div className='flex-column justify-content-center align-items-center'>
            <h1 className="section-title p-1 vehicle-title">Your Vehicles</h1>
            <div className='controls d-flex justify-content-center align-items-center p-1'>
              <button className='control-btn'>
                <span className="material-symbols-outlined p-1" title='Add Vehicle'>add</span>
              </button>
              <button className='control-btn'>
                <span className="material-symbols-outlined p-1" title='Logout' onClick={logout}>logout</span>
              </button>
              <button className='control-btn'>
                <span class="material-symbols-outlined" title='Change Password' onClick={handleChangePass}>lock</span>
              </button>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            {
              vehicles.map(vehicle => (
                <div key={vehicle.vehicle_no} className="bgblue m-2">
                  <div className="vehicle-card">
                    <Link to={`/user-dashboard/${user_id}/${vehicle.vehicle_no}`} style={{ textDecoration: 'none' }}>
                      <h5 className="text-light">{vehicle.vehicle_type}</h5>
                      <p className="card-text text-light">{vehicle.vehicle_no}</p>
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
        </section>
      </div>
    </div>
  );
}
