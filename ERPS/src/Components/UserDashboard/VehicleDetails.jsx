import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function VehicleDetails() {
    const { user_id, vehicle_no } = useParams();
    const [vehicleData, setVehicleData] = useState(null);
    const [error, setError] = useState(null);

    // Fetch vehicle details when the component mounts
    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/vehicle-details/${vehicle_no}`);
                if (response.ok) {
                    const data = await response.json();
                    setVehicleData(data);
                } else {
                    throw new Error("Failed to fetch vehicle details");
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchVehicleDetails();
    }, [vehicle_no]);

    if (error) return <p>{error}</p>;
    if (!vehicleData) return <p>Loading...</p>;

    return (
        <div className="vehicle-details-container">
            <h1>Vehicle Details</h1>
            <h2>{vehicleData.vehicle_type} - {vehicleData.vehicle_no}</h2>
            <p><strong>Engine Number:</strong> {vehicleData.engine_no}</p>
            <p><strong>Chassis Number:</strong> {vehicleData.chasis_no}</p>
            <p><strong>Tag ID:</strong> {vehicleData.instagat_id}</p>
            <p><strong>Tag Created:</strong> {new Date(vehicleData.tag_created).toLocaleDateString()}</p>
            {/* Add any other relevant details */}
        </div>
    );
}

export default VehicleDetails;
