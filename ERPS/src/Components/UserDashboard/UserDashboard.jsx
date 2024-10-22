import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDashboard.css';

export default function UserDashboard({ onLogout }) {
  const { user_id } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserVehicles = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user-details/${user_id}`);
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

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!vehicles.length) return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;

  return (
    <div className="container-fluid dashboard-container flex-column">
      <div className="row">
        <div className="col-md-9 main-content">
          <section id="vehicles" className="mb-5 justify-content-center align-items-center">
            <h3 className="section-title">Your Vehicles</h3>
            <div className="row">
            {
                vehicles.map(vehicle => (
                    <div key={vehicle.vehicle_no} className="col-md-4 mb-3">
                    <div className="card vehicle-card">
                        <div className="card-body">
                            <h5 className="card-title">{vehicle.vehicle_type}</h5>
                            <p className="card-text">{vehicle.vehicle_no}</p>
                            <Link to={`/user-dashboard/${user_id}/${vehicle.vehicle_no}`} className="btn btn-primary">View Details</Link>
                        </div>
                    </div>
                    </div>
                ))
            }
            </div>
            <div className='justify-content-center align-items-center'>
              <button className='btn btn-danger'>Logout</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
