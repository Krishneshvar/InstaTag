import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Use Link for navigation
import './UserDashboard.css';

function UserDashboard({ onLogout }) {
    const { user_id } = useParams();
    const [vehicles, setVehicles] = useState([]); // Store vehicles data
    const [error, setError] = useState(null);

    // Fetch user vehicles when the component mounts
    useEffect(() => {
        const fetchUserVehicles = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/user-details/${user_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setVehicles(data);  // Set vehicle data directly
                } else {
                    throw new Error("Failed to fetch vehicle data");
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUserVehicles();
    }, [user_id]);

    if (error) return <p>{error}</p>;
    if (!vehicles.length) return <p>Loading...</p>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>User Dashboard</h1>
            </header>

            {/* Vehicles List Section */}
            <div className="vehicles-list">
                <h2>Your Vehicles</h2>
                <ul>
                    {vehicles.map(vehicle => (
                        <li key={vehicle.vehicle_no}>
                            <Link to={`/user-dashboard/${user_id}/${vehicle.vehicle_no}`}>
                                {vehicle.vehicle_type} - {vehicle.vehicle_no}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Optional: Add a Logout Button */}
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default UserDashboard;
