import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ExpenseChart from './ExpenseChart';

export default function VehicleDetails() {
  const { user_id, vehicle_no } = useParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

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

    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/vehicle-expenses/${vehicle_no}`);
        if (response.ok) {
          const data = await response.json();
          setExpenses(data);
        } else {
          throw new Error("Failed to fetch expense data");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVehicleDetails();
    fetchExpenses();
  }, [vehicle_no]);

  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );

  if (!vehicleData) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Vehicle Details</h1>
              <div className="row mb-4">
                <div className="col-md-6">
                  <h2 className="h4 mb-3">{vehicleData.vehicle_type}</h2>
                  <p className="lead">{vehicleData.vehicle_no}</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <p className="mb-1"><strong>Tag ID:</strong> {vehicleData.instagat_id}</p>
                  <p><strong>Tag Created:</strong> {new Date(vehicleData.tag_created).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title h5">Engine Details</h3>
                      <p className="card-text"><strong>Engine Number:</strong> {vehicleData.engine_no}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title h5">Chassis Details</h3>
                      <p className="card-text"><strong>Chassis Number:</strong> {vehicleData.chasis_no}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title h4 mb-4">Expense History</h2>
              <ExpenseChart expenses={expenses} />
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to={`/user-dashboard/${user_id}`} className="btn btn-primary">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
